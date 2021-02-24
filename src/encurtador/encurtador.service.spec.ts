import { Test } from '@nestjs/testing';
import { EncurtadorService } from './encurtador.service';
import { Encurtador } from './encurtador.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('EncurtadorController', () => {
  let service: EncurtadorService;

  const mockRepository = {
    create: jest.fn().mockReturnValue({
      url: 'http://wisereducacao.com',
      newUrl: 'localhost:8081/ZTafrj',
    }),
    find: jest.fn().mockReturnValue({
      url: 'http://teste.com',
    }),
  };

  beforeEach(async (done) => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        EncurtadorService,
        {
          provide: getRepositoryToken(Encurtador),
          useValue: mockRepository,
        },
      ],
    }).compile();
    service = moduleRef.get<EncurtadorService>(EncurtadorService);
    done();
  });

  describe('EncurtadorService', () => {
    it('Should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should create an ShowDto object', async (done) => {
      try {
        const obj = {
          longUrl: 'http://wisereducacao.com',
        };
        const data = service.create(obj);
        expect(data).resolves.toBe({
          url: 'http://wisereducacao.com',
          newUrl: 'localhost:8081/ZTafrj',
        });
        done();
      } catch (e) {
        console.error(e);
        done();
      }
    });

    it('should find and return an ShowDto object', async (done) => {
      try {
        const data = service.find('lyQUgJ');
        expect(data).resolves.toBe({
          url: 'http://teste.com',
        });
        done();
      } catch (e) {
        console.error(e);
        done();
      }
    });
  });
});
