import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Encurtador } from './encurtador.entity';
import { EncurtadorService } from './encurtador.service';
import { EncurtadorController } from './encurtador.controller';
import { EncurtadorMiddleware } from './encurtador.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Encurtador])],
  providers: [EncurtadorService],
  controllers: [EncurtadorController],
})
export class EncurtadorModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(EncurtadorMiddleware).forRoutes(EncurtadorController);
  }
}
