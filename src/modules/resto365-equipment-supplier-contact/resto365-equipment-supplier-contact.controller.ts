import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseGuards,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { Acl } from '@modules/auth/AclDecorator';
import { AclGuard } from '@modules/auth/AclGuard';
import { User } from '@modules/auth/UserDecorator';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';
import { UUID } from 'crypto';
import { CorrelationId } from '@modules/resto365-audit/CorrelationIdDecorator';
import { GygLog, exceptionWrapper } from 'src/shared';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { Resto365EquipmentSupplierContactService } from './resto365-equipment-supplier-contact.service';
import { CreateResto365EquipmentSupplierContactDto } from './dto/create-resto365-equipment-supplier-contact.dto';
import { UpdateResto365EquipmentSupplierContactDto } from './dto/update-resto365-equipment-supplier-contact.dto';
import { Resto365EquipmentSupplierContact } from './entities/resto365-equipment-supplier-contact.entity';

@Controller('resto365-equipment-supplier-contacts')
export class Resto365EquipmentSupplierContactController {
  logger: GygLog;
  constructor(
    private readonly equipmentSupplierContactService: Resto365EquipmentSupplierContactService,
  ) {
    this.logger = new GygLog('Resto365EquipmentSupplierContactController');
  }

  @Get()
  @ApiOperation({ summary: 'Get all equipment suplier Contacts' })
  @ApiResponse({
    status: 200,
    description: 'Return all equipment supplier Contacts',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @UseGuards(AclGuard)
  @Acl('read:equipment')
  async findAll(
    @Query('supplierIds') supplierIds?: number[],
  ): Promise<Resto365EquipmentSupplierContact[]> {
    try {
      if (supplierIds) {
        return await this.equipmentSupplierContactService.findAllBySupplierIds(
          supplierIds,
        );
      }
      return await this.equipmentSupplierContactService.findAll();
    } catch (error) {
      throw exceptionWrapper(error);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get equipment supplier contact by id' })
  @ApiResponse({
    status: 200,
    description: 'Return equipment supplier contact by id',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @UseGuards(AclGuard)
  @Acl('read:equipment')
  async findOne(
    @Param('id') id: number,
  ): Promise<Resto365EquipmentSupplierContact> {
    try {
      return await this.equipmentSupplierContactService.findOne(id);
    } catch (error) {
      throw exceptionWrapper(error);
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create equipment supplier contact' })
  @ApiResponse({
    status: 201,
    description: 'Return created equipment supplier contact',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @UseGuards(AclGuard)
  @Acl('create:equipment')
  async create(
    @Body()
    createEquipmentSupplierContactDto: CreateResto365EquipmentSupplierContactDto,
    @User() user: Resto365User,
    @CorrelationId() correlationId: UUID,
  ): Promise<Resto365EquipmentSupplierContact> {
    try {
      return await this.equipmentSupplierContactService.create(
        createEquipmentSupplierContactDto,
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

  @Patch(':id')
  @ApiOperation({ summary: 'Update equipment supplier contact by id' })
  @ApiResponse({
    status: 200,
    description: 'Return updated equipment supplier contact',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @UseGuards(AclGuard)
  @Acl('update:equipment')
  async update(
    @Param('id') id: number,
    @Body()
    updateEquipmentSupplierContactDto: UpdateResto365EquipmentSupplierContactDto,
    @User() user: Resto365User,
    @CorrelationId() correlationId: UUID,
  ): Promise<Resto365EquipmentSupplierContact> {
    try {
      return await this.equipmentSupplierContactService.update(
        id,
        updateEquipmentSupplierContactDto,
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

  @Delete(':id')
  @ApiOperation({ summary: 'Delete equipment supplier contact by id' })
  @ApiResponse({
    status: 200,
    description: 'Return deleted equipment supplier contact',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @UseGuards(AclGuard)
  @Acl('delete:equipment')
  async remove(@Param('id') id: number): Promise<void> {
    try {
      return await this.equipmentSupplierContactService.remove(id);
    } catch (error) {
      throw exceptionWrapper(error);
    }
  }
}
