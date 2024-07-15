import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  Patch,
  NotFoundException,
  Delete,
} from '@nestjs/common';
import { Acl } from '@modules/auth/AclDecorator';
import { AclGuard } from '@modules/auth/AclGuard';
import { User } from '@modules/auth/UserDecorator';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';
import isEmpty from 'lodash/isEmpty';
import { UUID } from 'crypto';
import { CorrelationId } from '@modules/resto365-audit/CorrelationIdDecorator';
import { EntitySource } from '@modules/resto365-audit/entities/resto365-audit.entity';
import { AuditableResponse } from '@modules/resto365-audit/types';
import { GygLog, exceptionWrapper } from 'src/shared';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Loglevel } from 'src/context';
import { Audit } from '@modules/resto365-audit/AuditDecorator';
import { Resto365RestaurantLicenceService } from './resto365-restaurant-licence.service';
import {
  LicenceType,
  Resto365RestaurantLicence,
} from './entities/resto365-restaurant-licence.entity';
import { CreateResto365RestaurantLicenceDto } from './dto/create-resto365-restaurant-licence.dto';
import { UpdateResto365RestaurantLicenceDto } from './dto/update-resto365-restaurant-licence.dto';

@Audit('Restaurant/Licence')
@Controller('resto365-restaurant-licences')
export class Resto365RestaurantLicenceController {
  logger: GygLog;
  constructor(
    private readonly licenceService: Resto365RestaurantLicenceService,
  ) {
    this.logger = new GygLog(Resto365RestaurantLicenceController.name);
  }

  @Get()
  @Acl('read:restaurant-licence')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: 'Get all restaurant licences' })
  @ApiQuery({
    name: 'restaurantId',
    type: 'number',
    description: 'Filter by restaurant ID',
    required: false,
  })
  @ApiQuery({
    name: 'licenceNumber',
    type: 'string',
    description: 'Filter by licence number',
    required: false,
  })
  @ApiResponse({ status: 200, description: 'Returns all restaurant licences' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Restaurant licences not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll(
    @User() user: Resto365User,
    @CorrelationId() correlationId: UUID,
    @Query('restaurantId') restaurantId?: number,
    @Query('licenceNumber') licenceNumber?: string,
  ): Promise<Resto365RestaurantLicence[]> {
    try {
      this.logger.writeLog(
        `Finding all restaurant licences`,
        `Finding all restaurant licences requested by ${user.id}`,
        correlationId,
        Loglevel.INFO,
      );
      const result = await this.licenceService.findAll(
        user,
        correlationId,
        restaurantId,
        licenceNumber,
      );
      if (isEmpty(result)) {
        throw new NotFoundException('Restaurant licences not found');
      }
      return result;
    } catch (error) {
      this.logger.writeLog(
        `Error finding all restaurant licences`,
        `Error finding all restaurant licences requested by ${user.id}`,
        correlationId,
        Loglevel.ERROR,
      );
      throw exceptionWrapper(error);
    }
  }

  @Get(':id')
  @Acl('read:restaurant-licence')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: 'Get restaurant licence by ID' })
  @ApiQuery({
    name: 'licenceNumber',
    type: 'string',
    description: 'Filter by licence number',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Returns the restaurant licence' })
  @ApiResponse({ status: 404, description: 'Restaurant licence not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findOne(
    @Param('id') id: number,
    @User() user: Resto365User,
    @CorrelationId() correlationId: UUID,
    @Query('licenceNumber') licenceNumber?: string,
  ): Promise<Resto365RestaurantLicence> {
    try {
      this.logger.writeLog(
        `Finding restaurant licence by ID`,
        `Finding restaurant licence by ID ${id} requested by ${user.id}`,
        correlationId,
        Loglevel.INFO,
      );
      const result = await this.licenceService.findOne(
        id,
        user,
        correlationId,
        licenceNumber,
      );
      if (!result) {
        throw new NotFoundException(
          `Restaurant licence with ID ${id} not found`,
        );
      }
      return result;
    } catch (error) {
      this.logger.writeLog(
        `Error finding restaurant licence by ID`,
        `Error finding restaurant licence by ID ${id} requested by ${user.id}`,
        correlationId,
        Loglevel.ERROR,
      );
      throw exceptionWrapper(error);
    }
  }

  @Post()
  @Acl('create:restaurant-licence')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: 'Create a new restaurant licence' })
  @ApiResponse({
    status: 201,
    description: 'Returns the created restaurant licence',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(
    @Body() createDto: CreateResto365RestaurantLicenceDto,
    @User() user: Resto365User,
    @CorrelationId() correlationId: UUID,
  ): Promise<AuditableResponse<Resto365RestaurantLicence>> {
    try {
      this.logger.writeLog(
        `Creating restaurant licence`,
        `Creating restaurant licence requested by ${user.id}`,
        correlationId,
        Loglevel.INFO,
      );
      const result = await this.licenceService.create(
        createDto,
        user,
        correlationId,
        {
          _metadata: {
            auditUser: user,
            correlationId: correlationId,
          },
        },
      );
      return {
        data: result,
        _metadata: {
          entitySource: EntitySource.Restaurant,
          entitySourceId: result.restaurantId,
          description: `Restaurant licence ${result.licenceNumber} created`,
        },
      };
    } catch (error) {
      this.logger.writeLog(
        `Error creating restaurant licence`,
        `Error creating restaurant licence requested by ${user.id}`,
        correlationId,
        Loglevel.ERROR,
      );
      throw exceptionWrapper(error);
    }
  }

  @Patch(':id')
  @Acl('update:restaurant-licence')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: 'Update a restaurant licence' })
  @ApiResponse({
    status: 200,
    description: 'Returns the updated restaurant licence',
  })
  @ApiResponse({ status: 404, description: 'Restaurant licence not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async update(
    @Param('id') id: number,
    @Body() updateDto: UpdateResto365RestaurantLicenceDto,
    @User() user: Resto365User,
    @CorrelationId() correlationId: UUID,
  ): Promise<AuditableResponse<Resto365RestaurantLicence>> {
    try {
      this.logger.writeLog(
        `Updating restaurant licence`,
        `Updating restaurant licence with ID ${id} requested by ${user.id}`,
        correlationId,
        Loglevel.INFO,
      );
      const result = await this.licenceService.update(
        id,
        updateDto,
        user,
        correlationId,
        {
          _metadata: {
            auditUser: user,
            correlationId: correlationId,
          },
        },
      );
      if (!result) {
        throw new NotFoundException(
          `Restaurant licence with ID ${id} not found`,
        );
      }
      return {
        data: result,
        _metadata: {
          entitySource: EntitySource.Restaurant,
          entitySourceId: result.restaurantId,
          description: `Restaurant licence ${result.licenceName} updated`,
        },
      };
    } catch (error) {
      this.logger.writeLog(
        `Error updating restaurant licence`,
        `Error updating restaurant licence with ID ${id} requested by ${user.id}`,
        correlationId,
        Loglevel.ERROR,
      );
      throw exceptionWrapper(error);
    }
  }

  @Delete(':id')
  @Acl('delete:restaurant-licence')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: 'Delete a restaurant licence' })
  @ApiResponse({
    status: 204,
    description: 'Restaurant licence successfully deleted',
  })
  @ApiResponse({ status: 404, description: 'Restaurant licence not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async remove(
    @Param('id') id: number,
    @User() user: Resto365User,
    @CorrelationId() correlationId: UUID,
  ): Promise<AuditableResponse<string>> {
    try {
      const restaurantLicence = await this.licenceService.findOne(
        id,
        user,
        correlationId,
      );
      this.logger.writeLog(
        `Deleting restaurant licence`,
        `Deleting restaurant licence with ID ${id} requested by ${user.id}`,
        correlationId,
        Loglevel.INFO,
      );
      await this.licenceService.remove(id, user, correlationId, {
        _metadata: {
          auditUser: user,
          correlationId: correlationId,
        },
      });

      return {
        data: `Restaurant licence with ID ${id} deleted successfully`,
        _metadata: {
          entitySource: EntitySource.Restaurant,
          entitySourceId: restaurantLicence.restaurantId,
          description: `Restaurant licence with ID ${id} deleted successfully`,
        },
      };
    } catch (error) {
      this.logger.writeLog(
        `Error deleting restaurant licence`,
        `Error deleting restaurant licence with ID ${id} requested by ${user.id}`,
        correlationId,
        Loglevel.ERROR,
      );
      throw exceptionWrapper(error);
    }
  }

  @Get('listLicenceTypes/licenceTypes')
  @ApiOperation({ summary: 'Get all licence types' })
  @ApiResponse({ status: 200, description: 'Returns all licence types' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getLicenceType(): Promise<string[]> {
    // Extracting enum values from the FaqCategory enum
    const licenceTypes: string[] = Object.values(LicenceType);
    return licenceTypes;
  }
}
