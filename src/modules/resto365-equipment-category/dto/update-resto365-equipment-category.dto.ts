import { PartialType } from '@nestjs/swagger';
import { CreateResto365EquipmentCategoryDto } from './create-resto365-equipment-category.dto';

export class UpdateResto365EquipmentCategoryDto extends PartialType(
  CreateResto365EquipmentCategoryDto,
) {}
