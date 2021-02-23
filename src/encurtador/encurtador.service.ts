import ShortUniqueId from 'short-unique-id';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Encurtador } from './encurtador.entity';
import { UrlHasher } from './helper';
import { CreateDto } from './dto/create.dto';
import { ShowDto } from './dto/show.dto';

@Injectable()
export class EncurtadorService {
  constructor(
    @InjectRepository(Encurtador)
    private readonly repo: Repository<Encurtador>,
  ) {}

  async create(dto: CreateDto): Promise<ShowDto> {
    const hasher = new UrlHasher(dto.longUrl);
    const existing = await this.repo.findOne({ urlHash: hasher.hash });

    if (existing) {
      if (new Date() > existing.expiresAt) {
        await this.repo.delete({ code: existing.code });
      } else {
        const ret = new ShowDto();
        ret.url = existing.url;
        ret.newUrl = `${process.env.API_URL}/${existing.code}`;
        return ret;
      }
    }

    const link = this.repo.create({
      url: dto.longUrl,
      urlHash: hasher.hash,
      code: new ShortUniqueId().randomUUID(6),
    });
    await this.repo.save(link);

    const obj = new ShowDto();
    obj.url = link.url;
    obj.newUrl = `${process.env.API_URL}/${link.code}`;
    return obj;
  }

  async find(code: string): Promise<ShowDto> {
    const existing = await this.repo.findOne({ code });
    if (existing) {
      const ret = new ShowDto();
      ret.url = existing.url;
      return ret;
    }
    throw new HttpException('Shortened url not found.', HttpStatus.NOT_FOUND);
  }
}
