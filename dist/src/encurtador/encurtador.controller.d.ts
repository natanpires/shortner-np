import { EncurtadorService } from './encurtador.service';
import { CreateDto } from './dto/create.dto';
import { ShowDto } from './dto/show.dto';
export declare class EncurtadorController {
    private readonly service;
    constructor(service: EncurtadorService);
    create(dto: CreateDto): Promise<ShowDto>;
    get(code: any): Promise<ShowDto>;
}
