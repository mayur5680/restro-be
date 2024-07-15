// Import necessary modules
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ChannelGroupService } from './channel-group.service';
import { CreateChannelGroupDto } from './dto/create-channel-group.dto';

@Controller('channel-group')
export class ChannelGroupController {
  constructor(private readonly channelGroupService: ChannelGroupService) {}

  @Post()
  create(@Body() createChannelGroupDto: CreateChannelGroupDto) {
    return this.channelGroupService.create(createChannelGroupDto);
  }

  @Get()
  findAll() {
    return this.channelGroupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.channelGroupService.findOne(+id);
  }

  @Get('by-channel/:channelId')
  findAllByChannelId(@Param('channelId') channelId: string) {
    return this.channelGroupService.findAllByChannelId(+channelId);
  }

  @Get('by-group/:groupId')
  findAllByGroupId(@Param('groupId') groupId: string) {
    return this.channelGroupService.findAllByGroupId(+groupId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateChannelGroupDto: Partial<CreateChannelGroupDto>,
  ) {
    return this.channelGroupService.update(+id, updateChannelGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.channelGroupService.remove(+id);
  }
}
