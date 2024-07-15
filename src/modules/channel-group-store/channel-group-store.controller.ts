import {
  Controller,
  Get,
  Query,
  Param,
  Body,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ChannelGroupStoreService } from './channel-group-store.service';
import { ChannelGroupStore } from './entities/channel-group-store.entity';
import { UpdateChannelGroupStoreDto } from './dto/update-channel-group-store.dto';
import { GygLog } from 'src/shared';
import { Loglevel } from 'src/context';
import { Acl } from '@modules/auth/AclDecorator';
import { AclGuard } from '@modules/auth/AclGuard';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CorrelationId } from '@modules/resto365-audit/CorrelationIdDecorator';

@Controller('channel-group-stores')
export class ChannelGroupStoreController {
  logger: GygLog;
  constructor(
    private readonly channelGroupStoreService: ChannelGroupStoreService,
  ) {
    this.logger = new GygLog(ChannelGroupStoreController.name);
  }

  @Get()
  @Acl('read:restaurant')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: 'Get all ChannelGroupStores' })
  @ApiQuery({
    name: 'Optional storeId and channelId',
    type: 'number',
    description: 'StoreId and ChannelId',
  })
  @ApiResponse({ status: 200, description: 'OK', type: [ChannelGroupStore] })
  @ApiResponse({ status: 404, description: 'ChannelGroupStore Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll(
    @Query('storeId') storeId?: number,
    @Query('channelId') channelId?: number,
    @CorrelationId() corelationId?: string,
  ): Promise<ChannelGroupStore[]> {
    const actionName = 'findAll';
    if (storeId && channelId) {
      // Handle query with both storeId and channelId
      this.logger.writeLog(
        actionName,
        'Both storeId and channelId provided',
        corelationId,
        Loglevel.DEBUG,
      );
      return this.channelGroupStoreService.findAllByStoreIdAndChannelId(
        storeId,
        channelId,
      );
    } else if (storeId) {
      // Handle query with only storeId
      this.logger.writeLog(
        actionName,
        'Only storeId provided',
        corelationId,
        Loglevel.DEBUG,
      );
      return this.channelGroupStoreService.findAllByStoreId(storeId);
    } else if (channelId) {
      // Handle query with only channelId
      this.logger.writeLog(
        actionName,
        'Only channelId provided',
        corelationId,
        Loglevel.DEBUG,
      );
      return this.channelGroupStoreService.findAllByChannelId(channelId);
    } else {
      // Handle query with no filters
      this.logger.writeLog(
        actionName,
        'No filters provided',
        corelationId,
        Loglevel.DEBUG,
      );
      return this.channelGroupStoreService.findAll();
    }
  }

  @Get(':id')
  @Acl('read:restaurant')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: 'Get channelGroupStore by Id' })
  @ApiQuery({
    name: 'id',
    type: 'number',
    description: 'ChannelGroupStore ID',
  })
  @ApiResponse({ status: 200, description: 'OK', type: [ChannelGroupStore] })
  @ApiResponse({ status: 404, description: 'ChannelGroupStore Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findOne(
    @Param('id') id: number,
    @CorrelationId() corelationId: string,
  ): Promise<ChannelGroupStore> {
    const actionName = 'findOne';
    this.logger.writeLog(
      actionName,
      'Get channelGroupStore by Id',
      corelationId,
      Loglevel.DEBUG,
    );
    return this.channelGroupStoreService.findOne(id);
  }

  @Put(':id') // Use the HTTP verb PUT for updates
  @Acl('update:restaurant')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: 'Update an existing ChannelGroupStore' })
  @ApiResponse({ status: 200, description: 'OK', type: ChannelGroupStore })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async update(
    @Param('id') id: number,
    @Body() updateDto: UpdateChannelGroupStoreDto,
    @CorrelationId() corelationId: string,
  ): Promise<ChannelGroupStore> {
    const actionName = 'update';
    this.logger.writeLog(
      actionName,
      'Update an existing ChannelGroupStore',
      corelationId,
      Loglevel.DEBUG,
    );
    return this.channelGroupStoreService.update(id, updateDto);
  }
}
