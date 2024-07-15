import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
  Query,
  NotFoundException,
} from '@nestjs/common';
import moment from 'moment';
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

import { StoreSectionTimeSlotOverrideService } from './store-section-time-slot-override.service';
import { CreateStoreSectionTimeSlotOverrideDto } from './dto/create-store-section-time-slot-override.dto';
import { StoreSectionTimeSlotOverride } from './entities/store-section-time-slot-override.entity';

import { StoreSectionTimeSlotService } from '@modules/store-section-time-slot/store-section-time-slot.service';
import { Resto365RestaurantService } from '@modules/resto365-restaurant/resto365-restaurant.service';

@Audit('Restaurant/TemporaryTradingHours')
@Controller('store-section-time-slot-overrides')
export class StoreSectionTimeSlotOverrideController {
  logger: GygLog;
  constructor(
    private readonly storeSectionTimeSlotOverrideService: StoreSectionTimeSlotOverrideService,
    private readonly resto365RestaurantService: Resto365RestaurantService,
    private readonly storeSectionTimeSlotService: StoreSectionTimeSlotService,
  ) {
    this.logger = new GygLog(StoreSectionTimeSlotOverrideController.name);
  }

  @Get(':id')
  @Acl('read:restaurant')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: 'Get store section time slot override by id' })
  @ApiResponse({
    status: 200,
    description: 'Store section time slot override found',
    type: StoreSectionTimeSlotOverride,
  })
  @ApiResponse({
    status: 404,
    description: 'Store section time slot override not found',
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async findOne(
    @Param('id') id: string,
    @CorrelationId() correlationId: UUID,
  ): Promise<StoreSectionTimeSlotOverride> {
    try {
      const result = this.storeSectionTimeSlotOverrideService.findOne(+id);
      if (!result) {
        this.logger.writeLog(
          'StoreSectionTimeSlotOverride not found',
          `StoreSectionTimeSlotOverride with id ${id} not found`,
          correlationId,
          Loglevel.ERROR,
        );
        throw new NotFoundException(
          `StoreSectionTimeSlotOverride with id ${id} not found`,
        );
      }
      this.logger.writeLog(
        'StoreSectionTimeSlotOverride found',
        `StoreSectionTimeSlotOverride with id ${id} successfully found`,
        correlationId,
        Loglevel.INFO,
      );
      return result;
    } catch (error) {
      this.logger.writeLog(
        'Error while fetching StoreSectionTimeSlotOverride',
        error,
        correlationId,
        Loglevel.ERROR,
      );
      throw error;
    }
  }

  @Get('/store/:storeId')
  @Acl('read:restaurant')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: 'Get store section time slot overrides' })
  @ApiResponse({
    status: 200,
    description: 'Store section time slot overrides found',
    type: StoreSectionTimeSlotOverride,
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async findByStoreId(
    @Param('storeId') storeId: number,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('month') month: string,
    @User() user: Resto365User,
    @CorrelationId() correlationId: UUID,
  ): Promise<StoreSectionTimeSlotOverride[]> {
    const actionName = 'timeslot overrides by storeId';
    try {
      this.logger.writeLog(
        actionName,
        {
          storeId: storeId,
          startDate: startDate,
          endDate: endDate,
          month: month,
        },
        correlationId,
      );

      const restaurant =
        await this.resto365RestaurantService.findRestaurant(storeId);

      let startDayDateTime = new Date();
      let endDayDateTime = new Date();

      if (startDate && endDate) {
        startDayDateTime = moment(startDate, 'DD-MM-YYYY')
          .startOf('day')
          .toDate();

        endDayDateTime = moment(endDate, 'DD-MM-YYYY').endOf('day').toDate();
      }

      if (month) {
        startDayDateTime = moment({ month: Number(month) - 1 })
          .startOf('month')
          .toDate();

        endDayDateTime = moment({ month: Number(month) - 1 })
          .endOf('month')
          .toDate();
      }
      const overrideTimeSlot =
        await this.storeSectionTimeSlotOverrideService.findOverrideByStoreId(
          Number(restaurant.bhyveId),
          startDayDateTime,
          endDayDateTime,
        );

      this.logger.writeExitLog(
        actionName,
        { storeId },
        overrideTimeSlot,
        correlationId,
      );

      return overrideTimeSlot;
    } catch (error) {
      this.logger.writeExitLog(
        actionName,
        { storeId },
        error,
        correlationId,
        Loglevel.ERROR,
      );
      exceptionWrapper(error);
    }
  }

  @Get()
  @Acl('read:restaurant')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: 'Get store section time slot overrides' })
  @ApiResponse({
    status: 200,
    description: 'Store section time slot overrides found',
    type: StoreSectionTimeSlotOverride,
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async findAll(
    @Query('storeSectionTimeSlotId') storeSectionTimeSlotId: string,
    @User() user: Resto365User,
    @CorrelationId() correlationId: UUID,
  ): Promise<StoreSectionTimeSlotOverride[]> {
    try {
      const result =
        this.storeSectionTimeSlotOverrideService.findAllByStoreSectionTimeSlotId(
          +storeSectionTimeSlotId,
        );
      if (!result) {
        this.logger.writeLog(
          'StoreSectionTimeSlotOverrides not found',
          `StoreSectionTimeSlotOverrides with storeSectionTimeSlotId ${storeSectionTimeSlotId} not found`,
          correlationId,
          Loglevel.ERROR,
        );
        throw new NotFoundException(
          `StoreSectionTimeSlotOverrides with storeSectionTimeSlotId ${storeSectionTimeSlotId} not found`,
        );
      }
      this.logger.writeLog(
        'StoreSectionTimeSlotOverrides found',
        `StoreSectionTimeSlotOverrides with storeSectionTimeSlotId ${storeSectionTimeSlotId} successfully found`,
        correlationId,
        Loglevel.INFO,
      );
      return result;
    } catch (error) {
      this.logger.writeLog(
        'Error while fetching StoreSectionTimeSlotOverrides',
        error,
        correlationId,
        Loglevel.ERROR,
      );
      throw error;
    }
  }

  @Post()
  @Acl('create:restaurant')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: 'Create store section time slot overrides' })
  @ApiResponse({
    status: 201,
    description: 'Store section time slot overrides created',
    type: [StoreSectionTimeSlotOverride],
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(
    @Body()
    createStoreSectionTimeSlotOverrideDto: CreateStoreSectionTimeSlotOverrideDto[],
    @User() user: Resto365User,
    @CorrelationId() correlationId: UUID,
  ): Promise<AuditableResponse<StoreSectionTimeSlotOverride[]>> {
    try {
      const storeSectionTimeSlotOverrides =
        await this.storeSectionTimeSlotOverrideService.create(
          createStoreSectionTimeSlotOverrideDto,
          user,
          {
            _metadata: {
              auditUser: user,
              correlationId,
            },
          },
        );
      this.logger.writeLog(
        'StoreSectionTimeSlotOverrides created',
        `StoreSectionTimeSlotOverrides successfully created`,
        correlationId,
        Loglevel.INFO,
      );
      const storeSectionTimeSlot =
        await this.storeSectionTimeSlotService.findByIds(
          createStoreSectionTimeSlotOverrideDto.map(
            (storeSectionTimeSlotOverride) =>
              storeSectionTimeSlotOverride.storeSectionTimeSlotId,
          ),
        );
      const restaurant = await this.resto365RestaurantService.findOneByBhyveId(
        storeSectionTimeSlot[0].storeId.toString(),
      );
      return {
        data: storeSectionTimeSlotOverrides,
        _metadata: {
          entitySource: EntitySource.Restaurant,
          entitySourceId: restaurant.id,
          description: `StoreSectionTimeSlotOverrides created successfully for storeSectionTimeSlotId ${storeSectionTimeSlotOverrides[0].storeSectionTimeSlotId} by user ${user.id} with detail ${storeSectionTimeSlotOverrides}`,
        },
      };
    } catch (error) {
      this.logger.writeLog(
        'Error while creating StoreSectionTimeSlotOverrides',
        error,
        correlationId,
        Loglevel.ERROR,
      );
      throw exceptionWrapper(error);
    }
  }

  @Get(':ids')
  @Acl('read:restaurant')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: 'Get store section time slot overrides by ids' })
  @ApiResponse({
    status: 200,
    description: 'Store section time slot overrides found',
    type: StoreSectionTimeSlotOverride,
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async findByIds(
    @Param('ids') ids: string,
    @User() user: Resto365User,
    @CorrelationId() correlationId: UUID,
  ): Promise<StoreSectionTimeSlotOverride[]> {
    try {
      const result = this.storeSectionTimeSlotOverrideService.findByIds(
        ids.split(',').map(Number),
      );
      if (!result) {
        this.logger.writeLog(
          'StoreSectionTimeSlotOverrides not found',
          `StoreSectionTimeSlotOverrides with ids ${ids} not found`,
          correlationId,
          Loglevel.ERROR,
        );
        throw new NotFoundException(
          `StoreSectionTimeSlotOverrides with ids ${ids} not found`,
        );
      }
      this.logger.writeLog(
        'StoreSectionTimeSlotOverrides found',
        `StoreSectionTimeSlotOverrides with ids ${ids} successfully found`,
        correlationId,
        Loglevel.INFO,
      );
      return result;
    } catch (error) {
      this.logger.writeLog(
        'Error while fetching StoreSectionTimeSlotOverrides',
        error,
        correlationId,
        Loglevel.ERROR,
      );
      throw error;
    }
  }

  @Delete(':id')
  @Acl('delete:restaurant')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: 'Delete store section time slot override by id' })
  @ApiResponse({
    status: 200,
    description: 'Store section time slot override deleted',
    type: StoreSectionTimeSlotOverride,
  })
  @ApiResponse({
    status: 404,
    description: 'Store section time slot override not found',
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async remove(
    @Param('id') id: string,
    @User() user: Resto365User,
    @CorrelationId() correlationId: UUID,
  ): Promise<AuditableResponse<string>> {
    try {
      const storeSectionTimeSlotOverride =
        await this.storeSectionTimeSlotOverrideService.findOne(+id);
      const storeSectionTimeSlot =
        await this.storeSectionTimeSlotService.findByIds([
          storeSectionTimeSlotOverride.storeSectionTimeSlotId,
        ]);
      const restaurant = await this.resto365RestaurantService.findOneByBhyveId(
        storeSectionTimeSlot[0].storeId.toString(),
      );
      const result = this.storeSectionTimeSlotOverrideService.remove(+id);
      if (!result) {
        this.logger.writeLog(
          'StoreSectionTimeSlotOverride not deleted',
          `StoreSectionTimeSlotOverride with id ${id} not deleted`,
          correlationId,
          Loglevel.ERROR,
        );
        throw new NotFoundException(
          `StoreSectionTimeSlotOverride with id ${id} not deleted`,
        );
      }
      this.logger.writeLog(
        'StoreSectionTimeSlotOverride deleted',
        `StoreSectionTimeSlotOverride with id ${id} successfully deleted`,
        correlationId,
        Loglevel.INFO,
      );
      return {
        data: 'StoreSectionTimeSlotOverride deleted successfully',
        _metadata: {
          entitySource: EntitySource.Restaurant,
          entitySourceId: restaurant.id,
          description: `StoreSectionTimeSlotOverride with id ${id} deleted successfully for store ${restaurant.id} by user ${user.id} with detail ${storeSectionTimeSlotOverride}`,
        },
      };
    } catch (error) {
      this.logger.writeLog(
        'Error while deleting StoreSectionTimeSlotOverride',
        error,
        correlationId,
        Loglevel.ERROR,
      );
      throw error;
    }
  }
}
