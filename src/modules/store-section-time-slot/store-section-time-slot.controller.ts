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

import { StoreSectionTimeSlotService } from './store-section-time-slot.service';
import { CreateStoreSectionTimeSlotDto } from './dto/create-store-section-time-slot.dto';
import { StoreSectionTimeSlot } from './entities/store-section-time-slot.entity';
import { UpdateStoreSectionTimeSlotDto } from './dto/update-store-section-time-slot.dto';

import { Resto365RestaurantService } from '@modules/resto365-restaurant/resto365-restaurant.service';

@Audit('Restaurant/PermanentTradingHours')
@Controller('store-section-time-slots')
export class StoreSectionTimeSlotController {
  logger: GygLog;
  constructor(
    private readonly storeSectionTimeSlotService: StoreSectionTimeSlotService,
    private readonly resto365RestaurantService: Resto365RestaurantService,
  ) {
    this.logger = new GygLog(StoreSectionTimeSlotController.name);
  }

  @Post()
  @Acl('create:restaurant')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: 'Create StoreSectionTimeSlot' })
  @ApiResponse({
    status: 201,
    description: 'Created',
    type: [StoreSectionTimeSlot],
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(
    @Body() createStoreSectionTimeSlotDto: CreateStoreSectionTimeSlotDto[],
    @User() user: Resto365User,
    @CorrelationId() correlationId: UUID,
  ): Promise<AuditableResponse<StoreSectionTimeSlot[]>> {
    try {
      const restaurant = await this.resto365RestaurantService.findOneByBhyveId(
        createStoreSectionTimeSlotDto[0].storeId.toString(),
      );
      const storeSectionTimeSlots =
        await this.storeSectionTimeSlotService.create(
          createStoreSectionTimeSlotDto,
          user,
          {
            _metadata: {
              auditUser: user,
              correlationId,
            },
          },
        );

      this.logger.writeLog(
        'Create StoreSectionTimeSlot',
        `Create StoreSectionTimeSlot by user ${user.id}`,
        correlationId,
        Loglevel.INFO,
      );
      return {
        data: storeSectionTimeSlots,
        _metadata: {
          entitySource: EntitySource.Restaurant,
          entitySourceId: restaurant.id,
          description: 'StoreSectionTimeSlot created successfully',
        },
      };
    } catch (error) {
      this.logger.writeLog(
        'Create StoreSectionTimeSlot',
        `Create StoreSectionTimeSlot by user ${user.id}`,
        correlationId,
        Loglevel.ERROR,
      );
      exceptionWrapper(error);
    }
  }

  @Get()
  @Acl('read:restaurant')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: 'Get all StoreSectionTimeSlot' })
  @ApiResponse({ status: 200, description: 'OK', type: [StoreSectionTimeSlot] })
  @ApiResponse({ status: 404, description: 'StoreSectionTimeSlot Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll(
    @Query('stores') stores: number[],
    @Query('sections') sections: number[],
    @Query('dayOfWeeks') dayOfWeeks: number[],
    @CorrelationId() correlationId: UUID,
  ): Promise<StoreSectionTimeSlot[]> {
    try {
      this.logger.writeLog(
        'Get all StoreSectionTimeSlot',
        `Get all StoreSectionTimeSlot for stores: ${stores}, sections: ${sections}, dayOfWeeks: ${dayOfWeeks}`,
        correlationId,
        Loglevel.INFO,
      );
      const storeSectionTimeSlots =
        this.storeSectionTimeSlotService.findAllWithOverrides({
          stores,
          sections,
          dayOfWeeks,
        });
      this.logger.writeLog(
        'Get all StoreSectionTimeSlot',
        `Get all StoreSectionTimeSlot for stores: ${stores}, sections: ${sections}, dayOfWeeks: ${dayOfWeeks}`,
        correlationId,
        Loglevel.INFO,
      );
      return storeSectionTimeSlots;
    } catch (error) {
      this.logger.writeLog(
        'Get all StoreSectionTimeSlot',
        `Get all StoreSectionTimeSlot for stores: ${stores}, sections: ${sections}, dayOfWeeks: ${dayOfWeeks}`,
        correlationId,
        Loglevel.ERROR,
      );
      exceptionWrapper(error);
    }
  }

  @Get(':id')
  @Acl('read:restaurant')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: 'Get StoreSectionTimeSlot' })
  @ApiResponse({ status: 200, description: 'OK', type: StoreSectionTimeSlot })
  @ApiResponse({ status: 404, description: 'StoreSectionTimeSlot Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findOne(
    @Param('id') id: number,
    @CorrelationId() correlationId: UUID,
  ): Promise<StoreSectionTimeSlot> {
    try {
      this.logger.writeLog(
        'findOne',
        `Get StoreSectionTimeSlot with id ${id}`,
        correlationId,
        Loglevel.INFO,
      );
      const storeSectionTimeSlot =
        await this.storeSectionTimeSlotService.findOneWithOverrides(id);

      if (!storeSectionTimeSlot) {
        this.logger.writeLog(
          'No StoreSectionTimeSlot found',
          `No StoreSectionTimeSlot found with id ${id}`,
          correlationId,
          Loglevel.ERROR,
        );
        throw new Error(`StoreSectionTimeSlot with id ${id} not found`);
      }
      this.logger.writeLog(
        'findOne',
        `Get StoreSectionTimeSlot with id ${id}`,
        correlationId,
        Loglevel.INFO,
      );
      return storeSectionTimeSlot;
    } catch (error) {
      this.logger.writeLog(
        'findOne',
        `Get StoreSectionTimeSlot with id ${id}`,
        correlationId,
        Loglevel.ERROR,
      );
      exceptionWrapper(error);
    }
  }

  @Patch(':id')
  @Acl('update:restaurant')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: 'Update StoreSectionTimeSlot' })
  @ApiResponse({ status: 200, description: 'OK', type: StoreSectionTimeSlot })
  @ApiResponse({ status: 404, description: 'StoreSectionTimeSlot Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 409, description: 'Conflict' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async update(
    @Param('id') id: number,
    @Body() updateStoreSectionTimeSlotDto: UpdateStoreSectionTimeSlotDto,
    @User() user: Resto365User,
    @CorrelationId() correlationId: UUID,
  ): Promise<AuditableResponse<StoreSectionTimeSlot>> {
    // Trading hours are typically updated in bulk
    // we should consider adding a bulk update endpoint similar to create
    // - haritha.
    try {
      this.logger.writeLog(
        'update',
        `Start Update StoreSectionTimeSlot with id ${id} by user ${user.id}`,
        correlationId,
        Loglevel.INFO,
      );
      const storeSectionTimeSlot =
        await this.storeSectionTimeSlotService.update(
          id,
          updateStoreSectionTimeSlotDto,
          user,
          {
            _metadata: {
              auditUser: user,
              correlationId,
            },
          },
        );
      this.logger.writeLog(
        'update',
        `End Update StoreSectionTimeSlot with id ${id} by user ${user.id}`,
        correlationId,
        Loglevel.INFO,
      );
      const bhyveId = this.storeSectionTimeSlotService
        .findOneWithOverrides(id)
        .then((storeSectionTimeSlot) => storeSectionTimeSlot.storeId);
      const restaurant = await this.resto365RestaurantService.findOneByBhyveId(
        (await bhyveId).toString(),
      );

      return {
        data: storeSectionTimeSlot,
        _metadata: {
          entitySource: EntitySource.Restaurant,
          entitySourceId: restaurant.id,
          description: 'StoreSectionTimeSlot updated successfully',
        },
      };
    } catch (error) {
      this.logger.writeLog(
        'Unsuccessful update',
        `Unsuccessfull Update StoreSectionTimeSlot with id ${id} by user ${user.id} due to error: ${error}`,
        correlationId,
        Loglevel.ERROR,
      );
      exceptionWrapper(error);
    }
  }

  @Delete(':id')
  @Acl('delete:restaurant')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: 'Delete StoreSectionTimeSlot' })
  @ApiResponse({ status: 200, description: 'OK', type: StoreSectionTimeSlot })
  @ApiResponse({ status: 404, description: 'StoreSectionTimeSlot Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async remove(
    @Param('id') id: number,
    @User() user: Resto365User,
    @CorrelationId() correlationId: UUID,
  ): Promise<AuditableResponse<string>> {
    try {
      this.logger.writeLog(
        'remove',
        `Delete StoreSectionTimeSlot with id ${id} by user ${user.id}`,
        correlationId,
        Loglevel.INFO,
      );
      const bhyveId = this.storeSectionTimeSlotService
        .findOneWithOverrides(id)
        .then((storeSectionTimeSlot) => storeSectionTimeSlot.storeId);
      const restaurant = await this.resto365RestaurantService.findOneByBhyveId(
        (await bhyveId).toString(),
      );
      await this.storeSectionTimeSlotService.remove(id);
      this.logger.writeLog(
        'remove',
        `Delete StoreSectionTimeSlot with id ${id} by user ${user.id}`,
        correlationId,
        Loglevel.INFO,
      );
      return {
        data: `StoreSectionTimeSlot with id ${id} deleted successfully`,
        _metadata: {
          entitySource: EntitySource.Restaurant,
          entitySourceId: restaurant.id,
          description: 'StoreSectionTimeSlot deleted successfully',
        },
      };
    } catch (error) {
      this.logger.writeLog(
        'remove',
        `Delete StoreSectionTimeSlot with id ${id} by user ${user.id}`,
        correlationId,
        Loglevel.ERROR,
      );
      exceptionWrapper(error);
    }
  }
}
