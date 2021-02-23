import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../config/db.config';
import { EncurtadorModule } from '../src/encurtador/encurtador.module';

let code = '';

describe('Encurtador (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [EncurtadorModule, TypeOrmModule.forRoot(typeOrmConfig)],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('SERVER TEST', () => {
    it('returns a 404 when the content-type is not specified', async (done) => {
      await request(app.getHttpServer()).post('/').expect(404);
      done();
    });

    it('returns a 404 when the content-type is not specified', async (done) => {
      await request(app.getHttpServer()).get('/').expect(404);
      done();
    });
  });

  describe('POST /encurtador', () => {
    it('returns a 400 error when there is an empty payload', async (done) => {
      try {
        const { text } = await request(app.getHttpServer())
          .post('/encurtador')
          .send();

        expect(JSON.parse(text)).toHaveProperty(['statusCode', 'message']);
        done();
      } catch (e) {
        console.log(e);
        done();
      }
    });

    it('returns a 400 when the payload is invalid', async (done) => {
      try {
        const { text } = await request(app.getHttpServer())
          .post('/encurtador')
          .send({ longUrl: null });

        expect(Object.keys(JSON.parse(text))).toHaveProperty([
          'statusCode',
          'message',
        ]);
        done();
      } catch (e) {
        console.log(e);
        done();
      }
    });

    it('returns a 400 when the payload cannot be parsed', async (done) => {
      await request(app.getHttpServer())
        .post('/encurtador')
        .set('Content-Type', 'application/json')
        .send('{')
        .expect(400);
      done();
    });

    it('creates a new short link when one does not already exist', async (done) => {
      const { text } = await request(app.getHttpServer())
        .post('/encurtador')
        .set('Content-Type', 'application/json')
        .send({ longUrl: 'http://google.com' })
        .expect(201);

      const data = JSON.parse(text);

      code = data.newUrl.slice(data.newUrl.length - 6);
      expect(data.url).toEqual('http://google.com');
      expect(data.newUrl).toMatch(/^http:\/\/localhost:8081\/[\w\d]{6}$/);
      done();
    });

    it('returns an existing short link', async (done) => {
      await request(app.getHttpServer())
        .post('/encurtador')
        .set('Content-Type', 'application/json')
        .send({ longUrl: 'http://google.com' })
        .expect(201)
        .then(({ text }) => {
          expect(JSON.parse(text)).toHaveProperty(['url']);
        });
      done();
    });

    it('is case insensitive when returning an existing link', async (done) => {
      await request(app.getHttpServer())
        .post('/encurtador')
        .set('Content-Type', 'application/json')
        .send({ longUrl: 'http://google.com' })
        .expect(201)
        .then(({ text }) => {
          expect(JSON.parse(text)).toHaveProperty(['url']);
        });
      done();
    });
  });

  describe('GET /:code', () => {
    it('sends a permanent redirect when the code is found', async (done) => {
      await request(app.getHttpServer())
        .get(`/${code}`)
        .expect('Location', 'http://google.com');
      done();
    });
  });
});
