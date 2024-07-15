import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

export const exceptionWrapper = (error: unknown): void => {
  if (error instanceof NotFoundException) {
    throw new NotFoundException(error.message); // Handle NotFoundException
  } else if (error instanceof BadRequestException) {
    throw new BadRequestException(error.message); // Handle BadRequestException
  } else if (error instanceof ConflictException) {
    throw new ConflictException(error.message);
  } else {
    const e = error as Error;
    throw new InternalServerErrorException(e.message); // throw unknow error
  }
};
