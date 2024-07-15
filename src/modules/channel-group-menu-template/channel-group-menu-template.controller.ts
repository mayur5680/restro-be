import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Patch,
  Delete,
} from '@nestjs/common';
import { ChannelGroupMenuTemplateService } from './channel-group-menu-template.service';
import { CreateChannelGroupMenuTemplateDto } from './dto/create-channel-group-menu-template.dto';
import { ChannelGroupMenuTemplate } from './entities/channel-group-menu-template.entity';

@Controller('channel-group-menu-templates')
export class ChannelGroupMenuTemplateController {
  constructor(
    private readonly channelGroupMenuTemplateService: ChannelGroupMenuTemplateService,
  ) {}

  @Post()
  create(
    @Body() createDto: CreateChannelGroupMenuTemplateDto,
  ): Promise<ChannelGroupMenuTemplate> {
    return this.channelGroupMenuTemplateService.create(createDto);
  }

  @Get()
  findAll() {
    return this.channelGroupMenuTemplateService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number): Promise<ChannelGroupMenuTemplate> {
    return this.channelGroupMenuTemplateService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateDto: Partial<CreateChannelGroupMenuTemplateDto>,
  ): Promise<ChannelGroupMenuTemplate> {
    return this.channelGroupMenuTemplateService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.channelGroupMenuTemplateService.remove(id);
  }
}
