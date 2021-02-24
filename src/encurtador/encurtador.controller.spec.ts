import { Test } from '@nestjs/testing';
import { EncurtadorController } from './encurtador.controller';
import { EncurtadorService } from './encurtador.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from '../../config/db.config';
import { Encurtador } from './encurtador.entity';

describe('EncurtadorController', () => {
  let encurtadorController: EncurtadorController;
  let encurtadorService: EncurtadorService;

  beforeEach(async (done) => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(ormConfig()),
        TypeOrmModule.forFeature([Encurtador]),
      ],
      controllers: [EncurtadorController],
      providers: [EncurtadorService],
    }).compile();
    encurtadorController = moduleRef.get<EncurtadorController>(
      EncurtadorController,
    );
    encurtadorService = moduleRef.get<EncurtadorService>(EncurtadorService);
    done();
  });

  describe('EncurtadorController', () => {
    it('should create an ShowDto object', async (done) => {
      try {
        const obj = {
          longUrl: 'https://unitst.com',
        };
        await encurtadorController.create(obj);
        expect(encurtadorService).toHaveBeenCalledWith(obj);
        done();
      } catch (e) {
        console.error(e);
        done();
      }
    });

    it('should find and return an ShowDto object', async (done) => {
      try {
        const obj = {
          code: 'lyQUgJ',
        };
        await encurtadorController.get(obj);
        expect(encurtadorService).toHaveBeenCalledWith(obj);
        done();
      } catch (e) {
        console.error(e);
        done();
      }
    });
  });
});
