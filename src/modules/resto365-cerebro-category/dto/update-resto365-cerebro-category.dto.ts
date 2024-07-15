import { PartialType } from '@nestjs/swagger';
import { CreateResto365CerebroCategoryDto } from './create-resto365-cerebro-category.dto';

export class UpdateResto365CerebroCategoryDto extends PartialType(
  CreateResto365CerebroCategoryDto,
) {}
