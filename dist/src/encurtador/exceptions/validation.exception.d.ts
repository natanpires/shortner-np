import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';
export declare class ValidationException extends BadRequestException {
    constructor(errors: ValidationError[]);
}
