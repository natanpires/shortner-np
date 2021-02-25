import { Test } from '@nestjs/testing';
import { EncurtadorService } from './encurtador.service';
import { Encurtador } from './encurtador.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ShowDto } from './dto/show.dto';

describe('EncurtadorService', () => {
  let service: EncurtadorService;

  const mockRepository = {
    create: jest.fn().mockReturnValue(<Encurtador>{
      url: 'http://test.com',
      code: 'jyQUgf',
    }),
    findOne: jest.fn().mockReturnValue(<Encurtador>{
      code: 'jyQUgf',
      url: 'http://test.com',
    }),
    save: jest.fn(),
    remove: jest.fn(),
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

    it('should create an ShowDto object', () => {
      const result = new ShowDto();
      result.newUrl = 'localhost:8081/jyQUgf';
      result.url = 'http://test.com';

      const data = service.create({
        longUrl: 'http://test.com',
      });
      expect(data).resolves.toStrictEqual(result);
    });

    it('should find and return an ShowDto object', () => {
      const result = new ShowDto();
      result.url = 'http://test.com';

      const data = service.find('jyQUgf');
      expect(data).resolves.toStrictEqual(result);
    });
  });
});
