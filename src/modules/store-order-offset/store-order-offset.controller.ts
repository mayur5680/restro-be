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
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Loglevel } from 'src/context';
import { EntitySource } from '@modules/resto365-audit/entities/resto365-audit.entity';
import { AuditableResponse } from '@modules/resto365-audit/types';
import { Audit } from '@modules/resto365-audit/AuditDecorator';

import { StoreOrderOffsetService } from './store-order-offset.service';
import { StoreOrderOffset } from './entities/store-order-offset.entity';
import { CreateStoreOrderOffsetDto } from './dto/create-store-order-offset.dto';
import { UpdateStoreOrderOffsetDto } from './dto/update-store-order-offset.dto';
import { Resto365RestaurantService } from '@modules/resto365-restaurant/resto365-restaurant.service';

@Audit('Restaurant/PermanentOrderOffset')
@Controller('store-order-offsets')
export class StoreOrderOffsetController {
  logger: GygLog;
  constructor(
    private readonly storeOrderOffsetService: StoreOrderOffsetService,
    private readonly resto365RestaurantService: Resto365RestaurantService,
  ) {
    this.logger = new GygLog(StoreOrderOffsetController.name);
  }

  @Get()
  @Acl('read:restaurant')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: 'Get all StoreOrderOffset' })
  @ApiResponse({ status: 200, description: 'OK', type: [StoreOrderOffset] })
  @ApiResponse({ status: 404, description: 'StoreOrderOffset Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async findAll(
    @Query('stores') stores: number[],
    @User() user: Resto365User,
    @CorrelationId() correlationId: UUID,
  ): Promise<StoreOrderOffset[]> {
    try {
      this.logger.writeLog(
        `Finding all StoreOrderOffset`,
        `Finding all StoreOrderOffset for stores ${stores} requested by ${user.id}`,
        correlationId,
        Loglevel.INFO,
      );
      const result = await this.storeOrderOffsetService.findAllWithOverrides(
        { stores },
        user,
        correlationId,
      );
      this.logger.writeLog(
        `Found all StoreOrderOffset`,
        `Found all StoreOrderOffset for stores ${stores} requested by ${user.id}`,
        correlationId,
        Loglevel.INFO,
      );
      return result;
    } catch (error) {
      this.logger.writeLog(
        `Error finding all StoreOrderOffset`,
        `Error finding all StoreOrderOffset for stores ${stores} requested by ${user.id}`,
        correlationId,
        Loglevel.ERROR,
      );
      throw exceptionWrapper(error);
    }
  }

  @Get(':id')
  @Acl('read:restaurant')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: 'Get a StoreOrderOffset' })
  @ApiResponse({ status: 200, description: 'OK', type: StoreOrderOffset })
  @ApiResponse({ status: 404, description: 'StoreOrderOffset Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async findOne(
    @Param('id') id: number,
    @User() user: Resto365User,
    @CorrelationId() correlationId: UUID,
  ): Promise<StoreOrderOffset> {
    try {
      this.logger.writeLog(
        `Finding StoreOrderOffset`,
        `Finding StoreOrderOffset with id: ${id} requested by ${user.id}`,
        correlationId,
        Loglevel.INFO,
      );
      const result = await this.storeOrderOffsetService.findOne(
        id,
        user,
        correlationId,
      );
      this.logger.writeLog(
        `Found StoreOrderOffset`,
        `Found StoreOrderOffset with id: ${id} requested by ${user.id}`,
        correlationId,
        Loglevel.INFO,
      );
      return result;
    } catch (error) {
      this.logger.writeLog(
        `Error finding StoreOrderOffset`,
        `Error finding StoreOrderOffset with id: ${id} requested by ${user.id}`,
        correlationId,
        Loglevel.ERROR,
      );
      throw exceptionWrapper(error);
    }
  }

  @Post()
  @Acl('create:restaurant')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: 'Create a StoreOrderOffset' })
  @ApiResponse({ status: 200, description: 'OK', type: StoreOrderOffset })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(
    @Body() data: CreateStoreOrderOffsetDto,
    @User() user: Resto365User,
    @CorrelationId() correlationId: UUID,
  ): Promise<AuditableResponse<StoreOrderOffset>> {
    try {
      const restaurant = await this.resto365RestaurantService.findOneByBhyveId(
        data.storeId.toString(),
      );
      this.logger.writeLog(
        `Creating StoreOrderOffset`,
        `Creating StoreOrderOffset requested by ${user.id}`,
        correlationId,
        Loglevel.INFO,
      );
      const result = await this.storeOrderOffsetService.create(
        data,
        user,
        correlationId,
        {
          _metadata: {
            auditUser: user,
            correlationId,
          },
        },
      );
      this.logger.writeLog(
        `Created StoreOrderOffset`,
        `Created StoreOrderOffset requested by ${user.id}`,
        correlationId,
        Loglevel.INFO,
      );
      return {
        data: result,
        _metadata: {
          entitySource: EntitySource.Restaurant,
          entitySourceId: restaurant.id,
          description: `Created Permanent Order Offset`,
        },
      };
    } catch (error) {
      this.logger.writeLog(
        `Error creating StoreOrderOffset`,
        `Error creating StoreOrderOffset requested by ${user.id}`,
        correlationId,
        Loglevel.ERROR,
      );
      throw exceptionWrapper(error);
    }
  }

  @Patch(':id')
  @Acl('update:restaurant')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: 'Update a StoreOrderOffset' })
  @ApiResponse({ status: 200, description: 'OK', type: StoreOrderOffset })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async update(
    @Param('id') id: number,
    @Body() data: UpdateStoreOrderOffsetDto,
    @User() user: Resto365User,
    @CorrelationId() correlationId: UUID,
  ): Promise<AuditableResponse<StoreOrderOffset>> {
    try {
      const restaurant = await this.resto365RestaurantService.findOneByBhyveId(
        (
          await this.storeOrderOffsetService.findOne(id, user, correlationId)
        ).storeId.toString(),
      );
      this.logger.writeLog(
        `Updating StoreOrderOffset`,
        `Updating StoreOrderOffset with id: ${id} requested by ${user.id}`,
        correlationId,
        Loglevel.INFO,
      );
      const result = await this.storeOrderOffsetService.update(
        id,
        data,
        user,
        correlationId,
        {
          _metadata: {
            auditUser: user,
            correlationId,
          },
        },
      );
      this.logger.writeLog(
        `Updated StoreOrderOffset`,
        `Updated StoreOrderOffset with id: ${id} requested by ${user.id}`,
        correlationId,
        Loglevel.INFO,
      );
      return {
        data: result,
        _metadata: {
          entitySource: EntitySource.Restaurant,
          entitySourceId: restaurant.id,
          description: `Updated StoreOrderOffset`,
        },
      };
    } catch (error) {
      this.logger.writeLog(
        `Error updating StoreOrderOffset`,
        `Error updating StoreOrderOffset with id: ${id} requested by ${user.id}`,
        correlationId,
        Loglevel.ERROR,
      );
      throw exceptionWrapper(error);
    }
  }

  @Delete(':id')
  @Acl('delete:restaurant')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: 'Delete a StoreOrderOffset' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async delete(
    @Param('id') id: number,
    @User() user: Resto365User,
    @CorrelationId() correlationId: UUID,
  ): Promise<AuditableResponse<string>> {
    try {
      this.logger.writeLog(
        `Deleting StoreOrderOffset`,
        `Deleting StoreOrderOffset with id: ${id} requested by ${user.id}`,
        correlationId,
        Loglevel.INFO,
      );
      const bhyveId = this.storeOrderOffsetService
        .findOne(id, user, correlationId)
        .then((storeSectionTimeSlot) => storeSectionTimeSlot.storeId);
      const restaurant = await this.resto365RestaurantService.findOneByBhyveId(
        (await bhyveId).toString(),
      );
      await this.storeOrderOffsetService.delete(id, user, correlationId);
      this.logger.writeLog(
        `Deleted StoreOrderOffset`,
        `Deleted StoreOrderOffset with id: ${id} requested by ${user.id}`,
        correlationId,
        Loglevel.INFO,
      );
      return {
        data: `Deleted StoreOrderOffset with id: ${id}`,
        _metadata: {
          entitySource: EntitySource.Restaurant,
          entitySourceId: restaurant.id,
          description: `Deleted StoreOrderOffset with id: ${id}`,
        },
      };
    } catch (error) {
      this.logger.writeLog(
        `Error deleting StoreOrderOffset`,
        `Error deleting StoreOrderOffset with id: ${id} requested by ${user.id}`,
        correlationId,
        Loglevel.ERROR,
      );
      throw exceptionWrapper(error);
    }
  }
}
