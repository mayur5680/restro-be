import {
  ValidationError,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';

export class CustomValidationPipe extends ValidationPipe {
  constructor() {
    super({
      exceptionFactory: (errors: ValidationError[]) => {
        const errorMessages = {};
        errors.forEach((error) => {
          errorMessages[error.property] = Object.values(error.constraints);
        });
        return new BadRequestException({
          errors: errorMessages,
          error: 'Bad Request',
          statusCode: 400,
        });
      },
    });
  }
}
