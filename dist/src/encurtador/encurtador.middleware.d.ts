import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Repository } from 'typeorm';
import { Encurtador } from './encurtador.entity';
export declare class EncurtadorMiddleware implements NestMiddleware {
    private readonly repo;
    constructor(repo: Repository<Encurtador>);
    use(req: Request, _res: Response, next: NextFunction): Promise<void>;
}
