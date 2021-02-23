import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response, NextFunction } from 'express';
import { Repository } from 'typeorm';
import { Encurtador } from './encurtador.entity';

@Injectable()
export class EncurtadorMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(Encurtador)
    private readonly repo: Repository<Encurtador>,
  ) {}

  async use(req: Request, _res: Response, next: NextFunction) {
    if (req.body.longUrl && req.body.longUrl.length < 1) {
      throw new HttpException('Request body invalid.', HttpStatus.BAD_REQUEST);
    }
    const existing = await this.repo.findOne({ code: req.params?.code });
    if (existing && new Date() > existing?.expiresAt) {
      await this.repo.delete({ code: existing.code });
      throw new HttpException('Shortened url expired.', HttpStatus.NOT_FOUND);
    }
    next();
  }
}
