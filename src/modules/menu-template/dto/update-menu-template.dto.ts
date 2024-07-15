import { PartialType } from '@nestjs/swagger';
import { CreateMenuTemplateDto } from './create-menu-template.dto';

export class UpdateMenuTemplateDto extends PartialType(CreateMenuTemplateDto) {}
