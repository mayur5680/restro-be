import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseDatePipe implements PipeTransform {
  transform(value: (string | Date) | (() => string | Date) | undefined | null) {
    if (!value) throw new BadRequestException('Invalid date');
    if (typeof value === 'function') {
      value = value();
    }
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      throw new BadRequestException('Invalid date');
    }
    return date;
  }
}
