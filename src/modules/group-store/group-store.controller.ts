import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GroupStoreService } from './group-store.service';
import { GroupStore } from './entities/group-store.entity';
import { CreateGroupStoreDto } from './dto/create-group-store.dto';
import { UpdateGroupStoreDto } from './dto/update-group-store.dto';
import { GygLog } from 'src/shared';
import { Loglevel } from 'src/context';
import { CorrelationId } from '@modules/resto365-audit/CorrelationIdDecorator';

@Controller('group-stores')
export class GroupStoreController {
  logger: GygLog;
  constructor(private readonly groupStoreService: GroupStoreService) {
    this.logger = new GygLog(GroupStoreController.name);
  }

  @Get()
  @ApiOperation({ summary: 'Get all GroupStores' })
  @ApiResponse({ status: 200, description: 'OK', type: [GroupStore] })
  @ApiResponse({ status: 404, description: 'GroupStore Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll(
    @Query('storeId') storeId?: number,
    @CorrelationId() corelationId?: string,
  ): Promise<GroupStore[]> {
    if (storeId) {
      // Handle query with only storeId
      this.logger.writeLog(
        'findAll',
        `Get All Group Stores for storeId ${storeId}`,
        corelationId,
        Loglevel.DEBUG,
      );
      return this.groupStoreService.findAllByStoreId(storeId);
    } else {
      this.logger.writeLog(
        'findAll',
        'Get all GroupStores',
        corelationId,
        Loglevel.DEBUG,
      );
      return this.groupStoreService.findAll();
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single GroupStore by ID' })
  @ApiResponse({ status: 200, description: 'OK', type: GroupStore })
  @ApiResponse({ status: 404, description: 'GroupStore Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findOne(@Param('id') id: number): Promise<GroupStore> {
    return this.groupStoreService.findOne(id);
  }

  @Get(':storeId')
  @ApiOperation({ summary: 'Get a single GroupStore by Store ID' })
  @ApiResponse({ status: 200, description: 'OK', type: GroupStore })
  @ApiResponse({ status: 404, description: 'GroupStore Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findByStoreId(@Param('storeId') storeId: number): Promise<GroupStore> {
    return this.groupStoreService.findByStoreId(storeId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a GroupStore' })
  @ApiResponse({ status: 201, description: 'Created', type: GroupStore })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(
    @Body() createGroupStoreDto: CreateGroupStoreDto,
  ): Promise<GroupStore> {
    return this.groupStoreService.create(createGroupStoreDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a GroupStore by ID' })
  @ApiResponse({ status: 200, description: 'OK', type: GroupStore })
  @ApiResponse({ status: 404, description: 'GroupStore Not Found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  update(
    @Param('id') id: number,
    @Body() updateGroupStoreDto: UpdateGroupStoreDto,
  ): Promise<GroupStore> {
    return this.groupStoreService.update(id, updateGroupStoreDto);
  }
}
