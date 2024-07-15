import { PartialType } from '@nestjs/swagger';
import { CreateChannelGroupMenuTemplateDto } from './create-channel-group-menu-template.dto';

export class UpdateChannelGroupMenuTemplateDto extends PartialType(
  CreateChannelGroupMenuTemplateDto,
) {}
