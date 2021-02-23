import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Encurtador } from './encurtador.entity';
import { EncurtadorService } from './encurtador.service';
import { EncurtadorController } from './encurtador.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Encurtador])],
  providers: [EncurtadorService],
  controllers: [EncurtadorController],
})
export class EncurtadorModule {}
