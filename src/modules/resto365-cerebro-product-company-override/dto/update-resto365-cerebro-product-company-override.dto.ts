import { PartialType } from '@nestjs/swagger';
import { CreateResto365CerebroProductCompanyOverrideDto } from './create-resto365-cerebro-product-company-override.dto';

export class UpdateResto365CerebroProductCompanyOverrideDto extends PartialType(
  CreateResto365CerebroProductCompanyOverrideDto,
) {}
