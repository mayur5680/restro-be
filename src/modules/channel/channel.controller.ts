import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Channel } from 'diagnostics_channel';
import { exceptionWrapper } from 'src/shared';
import { Acl } from '@modules/auth/AclDecorator';
import { AclGuard } from '@modules/auth/AclGuard';
import { Resto365RestaurantService } from '@modules/resto365-restaurant/resto365-restaurant.service';

@Controller('channels')
export class ChannelController {
  constructor(
    private readonly channelService: ChannelService,
    private readonly resto365RestaurantService: Resto365RestaurantService,
  ) {}

  @Get(':id')
  @Acl('read:menu')
  @UseGuards(AclGuard)
  async findOne(@Param('id') id: string) {
    try {
      const channelId = parseInt(id, 10);
      const channel = await this.channelService.findOne(channelId);
      return channel;
    } catch (error) {
      exceptionWrapper(error);
    }
  }

  @Get('/store/:storeId')
  @Acl('read:menu')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: 'Get channels by storeId' })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: [Channel],
  })
  async finalAllByStoreId(@Param('storeId') storeId: number) {
    try {
      const restaurant =
        await this.resto365RestaurantService.findRestaurant(storeId);
      const bhyveId = Number(restaurant.bhyveId);

      const channel = await this.channelService.findByStoreId(bhyveId);
      return channel;
    } catch (error) {
      exceptionWrapper(error);
    }
  }

  @Get()
  @Acl('read:menu')
  @UseGuards(AclGuard)
  async findAll() {
    try {
      const channels = await this.channelService.findAll();
      return channels;
    } catch (error) {
      exceptionWrapper(error);
    }
  }
}
