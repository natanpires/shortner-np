/* istanbul ignore file */
import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export class ValidationException extends BadRequestException {
  constructor(errors: ValidationError[]) {
    let messages = {};

    if (errors.length > 0) {
      messages = errors.reduce(
        (mapped, error) => {
          mapped.errors[error.property] = Object.values(error.constraints);

          return mapped;
        },
        { errors: {} },
      );
    }

    super(messages);
  }
}
