import { Test, TestingModule } from '@nestjs/testing';
import { Encurtador } from './encurtador.entity';
import { EncurtadorController } from './encurtador.controller';
import { EncurtadorService } from './encurtador.service';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';

describe('AppController', () => {
  let appController: EncurtadorController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([Encurtador])],
      controllers: [EncurtadorController],
      providers: [
        EncurtadorService,
        {
          provide: getRepositoryToken(Encurtador),
          useValue: Encurtador,
        },
      ],
    }).compile();

    appController = app.get<EncurtadorController>(EncurtadorController);
  });

  describe('root', async () => {
    it('Should create an shortened url.', async () => {
      const data = await appController.create({
        longUrl: 'http://wisereducacao.com',
      });
      expect(data).toHaveProperty('url', 'newUrl');
    });

    it('Should return an url.', async () => {
      const data = await appController.get({
        code: 'ldh46X',
      });
      expect(data).toHaveProperty('url');
    });
  });
});
