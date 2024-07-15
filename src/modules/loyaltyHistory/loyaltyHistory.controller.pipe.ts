import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

type QueryParams = {
  userId?: string;
  posMemberId?: string;
  cardNumber?: string;
};

@Injectable()
export class FindAllQueryParamPipe implements PipeTransform {
  private allowedParams: Array<keyof QueryParams> = [
    'userId',
    'posMemberId',
    'cardNumber',
  ];

  transform(value: QueryParams) {
    const queryKeys = Object.keys(value) as Array<keyof QueryParams>;
    const filteredKeys = queryKeys.filter((key) =>
      this.allowedParams.includes(key),
    );

    const activeQueryParams = filteredKeys.filter((key) => value[key]);
    if (activeQueryParams.length > 1) {
      throw new BadRequestException(
        'Only one query parameter allowed at a time',
      );
    }

    if (queryKeys.length > filteredKeys.length) {
      throw new BadRequestException('Invalid query parameter(s) provided');
    }

    return value;
  }
}
