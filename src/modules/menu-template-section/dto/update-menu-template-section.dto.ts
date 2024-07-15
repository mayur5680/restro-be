import { PartialType } from '@nestjs/swagger';
import { CreateMenuTemplateSectionDto } from './create-menu-template-section.dto';

export class UpdateMenuTemplateSectionDto extends PartialType(
  CreateMenuTemplateSectionDto,
) {}
