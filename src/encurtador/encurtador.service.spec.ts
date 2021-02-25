import { Test } from '@nestjs/testing';
import { EncurtadorService } from './encurtador.service';
import { Encurtador } from './encurtador.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ShowDto } from './dto/show.dto';

describe('EncurtadorService', () => {
  let service: EncurtadorService;

  const mockRepository = {
    create: jest.fn().mockReturnValue({
      url: 'http://wisereducacao.com',
      newUrl: 'localhost:8081/undefined',
    }),
    findOne: jest.fn().mockReturnValue({
      url: 'http://wisereducacao.com',
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

  describe('Service', () => {
    it('Should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should create an ShowDto object', async (done) => {
      const result = new ShowDto();
      result.newUrl = 'localhost:8081/undefined';
      result.url = 'http://wisereducacao.com';

      const data = service.create({
        longUrl: 'http://wisereducacao.com',
      });
      expect(data).resolves.toStrictEqual(result);
      done();
    });

    it('should find and return an ShowDto object', async (done) => {
      const result = new ShowDto();
      result.url = 'http://wisereducacao.com';

      const data = service.find('lyQUgJ');
      expect(data).resolves.toStrictEqual(result);
      done();
    });
  });
});
