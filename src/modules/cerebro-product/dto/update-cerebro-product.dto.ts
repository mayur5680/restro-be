import { PartialType } from '@nestjs/swagger';
import { CreateCerebroProductDto } from './create-cerebro-product.dto';

export class UpdateCerebroProductDto extends PartialType(
  CreateCerebroProductDto,
) {}
