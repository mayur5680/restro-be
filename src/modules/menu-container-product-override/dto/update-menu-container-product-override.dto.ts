import { PartialType } from '@nestjs/swagger';
import { CreateMenuContainerProductOverrideDto } from './create-menu-container-product-override.dto';

export class UpdateMenuContainerProductOverrideDto extends PartialType(
  CreateMenuContainerProductOverrideDto,
) {}
