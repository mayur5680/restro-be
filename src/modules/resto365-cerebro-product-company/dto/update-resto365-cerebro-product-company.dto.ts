import { PartialType } from '@nestjs/swagger';
import { CreateResto365CerebroProductCompanyDto } from './create-resto365-cerebro-product-company.dto';

export class UpdateResto365CerebroProductCompanyDto extends PartialType(
  CreateResto365CerebroProductCompanyDto,
) {}
