import { PartialType } from '@nestjs/swagger';
import { CreateMenuContainerProductDto } from './create-menu-container-product.dto';

export class UpdateMenuContainerProductDto extends PartialType(
  CreateMenuContainerProductDto,
) {}
