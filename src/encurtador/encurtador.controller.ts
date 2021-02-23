import { Get, Header, Param, Redirect } from '@nestjs/common';
import { Controller, Post, Body } from '@nestjs/common';
import { EncurtadorService } from './encurtador.service';
import { CreateDto } from './dto/create.dto';
import { ShowDto } from './dto/show.dto';

@Controller()
export class EncurtadorController {
  constructor(private readonly service: EncurtadorService) {}

  @Post('/encurtador')
  @Header('Content-Type', 'application/json')
  async create(@Body() dto: CreateDto): Promise<ShowDto> {
    return this.service.create(dto);
  }

  @Get(':code')
  @Redirect()
  async get(@Param() params): Promise<ShowDto> {
    return this.service.find(params.code);
  }
}
