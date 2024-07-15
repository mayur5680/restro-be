import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  Query,
} from '@nestjs/common';
import { Acl } from '@modules/auth/AclDecorator';
import { AclGuard } from '@modules/auth/AclGuard';
import { User } from '@modules/auth/UserDecorator';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';
import { UUID } from 'crypto';
import { CorrelationId } from '@modules/resto365-audit/CorrelationIdDecorator';
import { GygLog, exceptionWrapper } from 'src/shared';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Loglevel } from 'src/context';
import { EntitySource } from '@modules/resto365-audit/entities/resto365-audit.entity';
import { AuditableResponse } from '@modules/resto365-audit/types';
import { Audit } from '@modules/resto365-audit/AuditDecorator';

import { Resto365EquipmentService } from './resto365-equipment.service';
import { CreateResto365EquipmentDto } from './dto/create-resto365-equipment.dto';
import { UpdateResto365EquipmentDto } from './dto/update-resto365-equipment.dto';
import {
  Brand,
  Warranty,
  Resto365Equipment,
} from './entities/resto365-equipment.entity';

@Audit('Restaurant/Equipment')
@Controller('resto365-equipments')
export class Resto365EquipmentController {
  logger: GygLog;
  constructor(private readonly equipmentService: Resto365EquipmentService) {
    this.logger = new GygLog(Resto365EquipmentController.name);
  }

  @Get()
  @ApiOperation({ summary: 'Get all equipment' })
  @ApiResponse({ status: 200, description: 'Return all equipment' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @UseGuards(AclGuard)
  @Acl('read:equipment')
  async findAll(
    @CorrelationId() correlationId: UUID,
    @User() user: Resto365User,
    @Query('restaurantId') restaurantId?: number,
  ): Promise<Resto365Equipment[]> {
    try {
      if (restaurantId) {
        this.logger.writeLog(
          'Equipment/s found',
          `Equipment/s found by restaurant ID: ${restaurantId} requested by user: ${user.id}`,
          correlationId,
          Loglevel.INFO,
        );
        return this.equipmentService.searchEquipmentByRestaurantId(
          restaurantId,
        );
      }
      const result = await this.equipmentService.findAll();
      this.logger.writeLog(
        'Equipment/s found',
        `Equipment/s found requested by user: ${user.id}`,
        correlationId,
        Loglevel.INFO,
      );
      return result || []; // Return an empty array if no equipment is found
    } catch (error) {
      this.logger.writeLog(
        'Internal Server Error',
        `Internal Server Error while fetching equipment/s requested by user: ${user.id}`,
        correlationId,
        Loglevel.ERROR,
      );
      throw exceptionWrapper(error);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get equipment by ID' })
  @ApiQuery({ name: 'id', type: Number, required: true })
  @ApiResponse({ status: 200, description: 'Return equipment by ID' })
  @ApiResponse({ status: 404, description: 'Equipment not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @UseGuards(AclGuard)
  @Acl('read:equipment')
  async findOne(
    @Param('id') id: number,
    @CorrelationId() correlationId: string,
    @User() user: Resto365User,
  ): Promise<Resto365Equipment> {
    try {
      const equipment = await this.equipmentService.findOne(id);
      this.logger.writeLog(
        'Equipment found',
        `Equipment found by ID: ${id} requested by user: ${user.id}`,
        correlationId,
        Loglevel.INFO,
      );
      return equipment;
    } catch (error) {
      this.logger.writeLog(
        'Internal Server Error',
        `Internal Server Error while fetching equipment by ID: ${id} requested by user: ${user.id}`,
        correlationId,
        Loglevel.ERROR,
      );
      throw exceptionWrapper(error);
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create equipment' })
  @ApiResponse({ status: 201, description: 'Equipment created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @UseGuards(AclGuard)
  @Acl('create:equipment')
  async create(
    @Body() createEquipmentDto: CreateResto365EquipmentDto,
    @CorrelationId() correlationId: UUID,
    @User() user: Resto365User,
  ): Promise<AuditableResponse<Resto365Equipment>> {
    try {
      const result = await this.equipmentService.create(
        createEquipmentDto,
        user,
        {
          _metadata: {
            auditUser: user,
            correlationId: correlationId,
          },
        },
      );
      this.logger.writeLog(
        'Equipment created',
        `Equipment created with ID: ${result.id} requested by user: ${user.id}`,
        correlationId,
        Loglevel.INFO,
      );
      return {
        data: result,
        _metadata: {
          entitySource: EntitySource.Restaurant,
          entitySourceId: result.restaurantId,
          description: 'Equipment created successfully',
        },
      };
    } catch (error) {
      this.logger.writeLog(
        'Internal Server Error',
        `Internal Server Error while creating equipment requested by user: ${user.id}`,
        correlationId,
        Loglevel.ERROR,
      );
      throw exceptionWrapper(error);
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update equipment by ID' })
  @ApiQuery({ name: 'id', type: Number, required: true })
  @ApiResponse({ status: 200, description: 'Equipment updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @UseGuards(AclGuard)
  @Acl('update:equipment')
  async update(
    @Param('id') id: number,
    @Body() updateEquipmentDto: UpdateResto365EquipmentDto,
    @CorrelationId() correlationId: UUID,
    @User() user: Resto365User,
  ): Promise<AuditableResponse<Resto365Equipment>> {
    try {
      const result = await this.equipmentService.update(
        id,
        updateEquipmentDto,
        user,
        {
          _metadata: {
            auditUser: user,
            correlationId: correlationId,
          },
        },
      );
      this.logger.writeLog(
        'Equipment updated',
        `Equipment updated with ID: ${id} requested by user: ${user.id}`,
        correlationId,
        Loglevel.INFO,
      );
      return {
        data: result,
        _metadata: {
          entitySource: EntitySource.Restaurant,
          entitySourceId: result.restaurantId,
          description: 'Equipment updated successfully',
        },
      };
    } catch (error) {
      this.logger.writeLog(
        'Internal Server Error',
        `Internal Server Error while updating equipment by ID: ${id} requested by user: ${user.id}`,
        correlationId,
        Loglevel.ERROR,
      );
      throw exceptionWrapper(error);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete equipment by ID' })
  @ApiQuery({ name: 'id', type: Number, required: true })
  @ApiResponse({ status: 200, description: 'Equipment deleted successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @UseGuards(AclGuard)
  @Acl('delete:equipment')
  async remove(
    @Param('id') id: number,
    @CorrelationId() correlationId: UUID,
    @User() user: Resto365User,
  ): Promise<AuditableResponse<string>> {
    try {
      const equipment = await this.equipmentService.findOne(id);
      await this.equipmentService.remove(id);
      this.logger.writeLog(
        'Equipment deleted',
        `Equipment deleted with ID: ${id} requested by user: ${user.id}`,
        correlationId,
        Loglevel.INFO,
      );
      return {
        data: `Equipment with ID ${id} deleted successfully`,
        _metadata: {
          entitySource: EntitySource.Restaurant,
          entitySourceId: equipment.restaurantId,
          description: 'Equipment deleted successfully',
        },
      };
    } catch (error) {
      this.logger.writeLog(
        'Internal Server Error',
        `Internal Server Error while deleting equipment by ID: ${id} requested by user: ${user.id}`,
        correlationId,
        Loglevel.ERROR,
      );
      throw exceptionWrapper(error);
    }
  }

  @Get('brands/brand')
  @ApiOperation({ summary: 'Get equipment brand list' })
  @ApiResponse({ status: 200, description: 'Return equipment brand list' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async getBrands(): Promise<string[]> {
    const brands: string[] = Object.values(Brand);
    return brands;
  }

  @Get('warranties/warranty')
  @ApiOperation({ summary: 'Get equipment warranty list' })
  @ApiResponse({ status: 200, description: 'Return equipment warranty list' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async getWarranties(): Promise<string[]> {
    const warranties: string[] = Object.values(Warranty);
    return warranties;
  }
}
