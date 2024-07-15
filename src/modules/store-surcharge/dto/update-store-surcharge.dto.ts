import { PartialType } from '@nestjs/swagger';
import { CreateStoreSurchargeDto } from './create-store-surcharge.dto';

export class UpdateStoreSurchargeDto extends PartialType(
  CreateStoreSurchargeDto,
) {}
