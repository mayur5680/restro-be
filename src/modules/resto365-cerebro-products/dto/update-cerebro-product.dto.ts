import { PartialType } from '@nestjs/swagger';
import { CreateResto365CerebroProductDto } from './create-cerebro-product.dto';

export class UpdateCerebroProductDto extends PartialType(
  CreateResto365CerebroProductDto,
) {}
