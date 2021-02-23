import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EncurtadorModule } from './encurtador/encurtador.module';
import typeOrmConfig from '../config/db.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig()), EncurtadorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
