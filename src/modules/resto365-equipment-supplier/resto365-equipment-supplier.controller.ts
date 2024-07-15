import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { Acl } from '@modules/auth/AclDecorator';
import { AclGuard } from '@modules/auth/AclGuard';
import { User } from '@modules/auth/UserDecorator';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';
import { UUID } from 'crypto';
import { CorrelationId } from '@modules/resto365-audit/CorrelationIdDecorator';
import { GygLog, exceptionWrapper } from 'src/shared';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { Resto365EquipmentSupplierService } from './resto365-equipment-supplier.service';
import { CreateResto365EquipmentSupplierDto } from './dto/create-resto365-equipment-supplier.dto';
import { Resto365EquipmentSupplier } from './entities/resto365-equipment-supplier.entity';

@Controller('resto365-equipment-suppliers')
export class Resto365EquipmentSupplierController {
  logger: GygLog;
  constructor(
    private readonly equipmentSupplierService: Resto365EquipmentSupplierService,
  ) {
    this.logger = new GygLog('Resto365EquipmentSupplierController');
  }

  @Get()
  @ApiOperation({ summary: 'Get all equipment supliers' })
  @ApiResponse({ status: 200, description: 'Return all equipment suppliers' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @UseGuards(AclGuard)
  @Acl('read:equipment')
  async findAll(): Promise<Resto365EquipmentSupplier[]> {
    try {
      return await this.equipmentSupplierService.findAll();
    } catch (error) {
      throw exceptionWrapper(error);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get equipment supplier by id' })
  @ApiResponse({ status: 200, description: 'Return equipment supplier by id' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @UseGuards(AclGuard)
  @Acl('read:equipment')
  async findOne(@Param('id') id: number): Promise<Resto365EquipmentSupplier> {
    try {
      return await this.equipmentSupplierService.findOne(id);
    } catch (error) {
      throw exceptionWrapper(error);
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create equipment supplier' })
  @ApiResponse({
    status: 201,
    description: 'Return created equipment supplier',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @UseGuards(AclGuard)
  @Acl('create:equipment')
  async create(
    @Body() createEquipmentSupplierDto: CreateResto365EquipmentSupplierDto,
    @User() user: Resto365User,
    @CorrelationId() correlationId: UUID,
  ): Promise<Resto365EquipmentSupplier> {
    try {
      return await this.equipmentSupplierService.create(
        createEquipmentSupplierDto,
        user,
        {
          _metadata: {
            auditUser: user,
            correlationId: correlationId,
          },
        },
      );
    } catch (error) {
      throw exceptionWrapper(error);
    }
  }
}
