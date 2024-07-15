import { PartialType } from '@nestjs/swagger';
import { CreateMerchandiseInventoryDto } from './create-merchandise-inventory.dto';

export class UpdateMerchandiseInventoryDto extends PartialType(
  CreateMerchandiseInventoryDto,
) {}
