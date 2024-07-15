import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { StoreChannelService } from './store-channel.service';
import { CreateStoreChannelDto } from './dto/create-store-channel.dto';
import { UpdateStoreChannelDto } from './dto/update-store-channel.dto';
import { StoreChannel } from './entities/store-channel.entity';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('store-channels')
export class StoreChannelController {
  constructor(private readonly storeChannelService: StoreChannelService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Store Channel' })
  @ApiResponse({ status: 201, description: 'Created', type: StoreChannel })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async create(
    @Body() createStoreChannelDto: CreateStoreChannelDto,
  ): Promise<StoreChannel> {
    return this.storeChannelService.create(createStoreChannelDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Store Channels' })
  @ApiResponse({ status: 200, description: 'OK', type: [StoreChannel] })
  async findAll(): Promise<StoreChannel[]> {
    return this.storeChannelService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a Store Channel by ID' })
  @ApiResponse({ status: 200, description: 'OK', type: StoreChannel })
  @ApiResponse({ status: 404, description: 'Not Found' })
  async findOne(@Param('id') id: number): Promise<StoreChannel> {
    return this.storeChannelService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a Store Channel by ID' })
  @ApiResponse({ status: 200, description: 'OK', type: StoreChannel })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  async update(
    @Param('id') id: number,
    @Body() updateStoreChannelDto: UpdateStoreChannelDto,
  ): Promise<StoreChannel> {
    return this.storeChannelService.update(id, updateStoreChannelDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Store Channel by ID' })
  @ApiResponse({ status: 204, description: 'No Content' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.storeChannelService.remove(id);
  }

  @Get('by-store/:storeId')
  @ApiOperation({ summary: 'Get all Store Channels by Store ID' })
  @ApiResponse({ status: 200, description: 'OK', type: [StoreChannel] })
  async findAllByStoreId(
    @Param('storeId') storeId: number,
  ): Promise<StoreChannel[]> {
    return this.storeChannelService.findAllByStoreId(storeId);
  }

  @Patch('upsert/:storeId/:channelId/:isActive')
  @ApiOperation({ summary: 'Upsert a Store Channel' })
  @ApiResponse({ status: 200, description: 'OK', type: StoreChannel })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async upsert(
    @Param('storeId') storeId: number,
    @Param('channelId') channelId: number,
    @Param('isActive') isActive: boolean,
    @Body() createdBy: number,
    @Body() updatedBy: number,
  ): Promise<StoreChannel> {
    return this.storeChannelService.upsert(
      storeId,
      channelId,
      isActive,
      createdBy,
      updatedBy,
    );
  }
}
