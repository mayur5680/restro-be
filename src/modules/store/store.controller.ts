import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { GygQueryOptions } from '@modules/offer/types';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store } from './entities/store.entity';
import { AuditParams } from 'src/shared/audit-logs.types';
import { Audit } from '@modules/resto365-audit/AuditDecorator';

@Audit('Restaurant')
@Controller('stores')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Find a store by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Store ID' })
  @ApiResponse({ status: 200, description: 'OK', type: Store })
  @ApiResponse({ status: 404, description: 'Not Found' })
  public async findById(@Param('id') id: number) {
    return this.storeService.findById(id);
  }

  @Get()
  @ApiQuery({ name: 'skip', type: Number })
  @ApiQuery({ name: 'take', type: Number })
  @ApiResponse({ status: 200, description: 'OK', type: Store, isArray: true })
  public async findAll(@Query() query: GygQueryOptions) {
    return this.storeService.findAll(query);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new store' })
  @ApiBody({ type: CreateStoreDto, description: 'Data to create a store' })
  @ApiResponse({ status: 201, description: 'Created', type: Store })
  public async create(@Body() createStoreDto: CreateStoreDto) {
    return this.storeService.create(createStoreDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a store by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Store ID' })
  @ApiBody({ type: UpdateStoreDto, description: 'Update data for the store' })
  @ApiResponse({ status: 200, description: 'OK', type: Store })
  @ApiResponse({ status: 404, description: 'Not Found' })
  public async update(
    @Param('id') id: number,
    @Body() updateStoreDto: UpdateStoreDto,
  ) {
    const updatedStore = await this.storeService.update(
      id,
      updateStoreDto,
      {} as AuditParams,
    );
    return updatedStore;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Hard delete a store by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Store ID' })
  @ApiResponse({ status: 200, description: 'OK', type: Store })
  @ApiResponse({ status: 404, description: 'Not Found' })
  public async hardDelete(@Param('id') id: number) {
    const updatedStore = await this.storeService.remove(id);
    return updatedStore;
  }
}
