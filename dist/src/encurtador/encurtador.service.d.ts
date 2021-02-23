import { Repository } from 'typeorm';
import { Encurtador } from './encurtador.entity';
import { CreateDto } from './dto/create.dto';
import { ShowDto } from './dto/show.dto';
export declare class EncurtadorService {
    private readonly repo;
    constructor(repo: Repository<Encurtador>);
    create(dto: CreateDto): Promise<ShowDto>;
    find(code: string): Promise<ShowDto>;
}
