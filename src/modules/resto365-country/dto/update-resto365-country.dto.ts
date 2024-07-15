import { PartialType } from '@nestjs/mapped-types';
import { CreateResto365CountryDto } from './create-resto365-country.dto';

export class UpdateResto365CountryDto extends PartialType(
  CreateResto365CountryDto,
) {}
