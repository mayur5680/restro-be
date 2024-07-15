import { PipeTransform, BadRequestException } from '@nestjs/common';

export class ParseNonEmptyStringPipe implements PipeTransform {
  transform(value: string): string {
    if (!value || typeof value !== 'string' || value.trim() === '') {
      throw new BadRequestException(
        'The query parameter must be a non-empty string.',
      );
    }
    return value.trim();
  }
}
