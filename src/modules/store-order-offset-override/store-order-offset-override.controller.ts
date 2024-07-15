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
  NotFoundException,
} from '@nestjs/common';
import { Acl } from '@modules/auth/AclDecorator';
import { AclGuard } from '@modules/auth/AclGuard';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';
import { UUID } from 'crypto';
import { CorrelationId } from '@modules/resto365-audit/CorrelationIdDecorator';
import { GygLog, exceptionWrapper } from 'src/shared';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Loglevel } from 'src/context';
import { EntitySource } from '@modules/resto365-audit/entities/resto365-audit.entity';
import { AuditableResponse } from '@modules/resto365-audit/types';
import { Audit } from '@modules/resto365-audit/AuditDecorator';

import { StoreOrderOffsetOverrideService } from './store-order-offset-override.service';
import { StoreOrderOffsetOverride } from './entities/store-order-offset-override.entity';
import { CreateStoreOrderOffsetOverrideDto } from './dto/create-store-order-offset-override.dto';
import { UpdateStoreOrderOffsetOverrideDto } from './dto/update-store-order-offset-override.dto';

import { Resto365RestaurantService } from '@modules/resto365-restaurant/resto365-restaurant.service';

@Audit('Restaurant/TemporaryOrderOffset')
@Controller('store-order-offset-overrides')
export class StoreOrderOffsetOverrideController {
  logger: GygLog;
  constructor(
    private readonly storeOrderOffsetOverrideService: StoreOrderOffsetOverrideService,
    private readonly resto365RestaurantService: Resto365RestaurantService,
  ) {
    this.logger = new GygLog(StoreOrderOffsetOverrideController.name);
  }

  @Post()
  @Acl('create:restaurant')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: 'Create Store Order Offset Override' })
  @ApiResponse({
    status: 201,
    description:
      'The Store Order Offset Override has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async create(
    @Body()
    createStoreOrderOffsetOverrideDto: CreateStoreOrderOffsetOverrideDto[],
    @Body() user: Resto365User,
    @CorrelationId() correlationId: UUID,
  ): Promise<AuditableResponse<StoreOrderOffsetOverride[]>> {
    try {
      const storeOrderOffsetOverrides = await Promise.all(
        createStoreOrderOffsetOverrideDto.map(async (dto) => {
          const id =
            await this.storeOrderOffsetOverrideService.generateUniqueId();
          return {
            ...dto,
            id,
            createdBy: user.id,
            updatedBy: user.id,
            _metadata: {
              auditUser: user,
              correlationId,
            },
          };
        }),
      );

      const result = await this.storeOrderOffsetOverrideService.create(
        storeOrderOffsetOverrides,
        user,
        { _metadata: { auditUser: user, correlationId } },
      );

      const restaurant = await this.resto365RestaurantService.findOneByBhyveId(
        createStoreOrderOffsetOverrideDto[0].storeId.toString(),
      );

      if (!result) {
        this.logger.writeLog(
          'Failed to create Store Order Offset Override',
          `Failed to create Store Order Offset Override for restaurant ${restaurant.restaurantName}`,
          correlationId,
          Loglevel.ERROR,
        );
        throw new NotFoundException(
          `Failed to create Store Order Offset Override for restaurant ${restaurant.restaurantName}`,
        );
      }

      this.logger.writeLog(
        'Store Order Offset Override created successfully',
        `Store Order Offset Override created successfully for restaurant ${restaurant.restaurantName}`,
        correlationId,
        Loglevel.INFO,
      );

      return {
        data: result,
        _metadata: {
          entitySource: EntitySource.Restaurant,
          entitySourceId: restaurant.id,
          description: `Created Temporary Order Offset`,
        },
      };
    } catch (error) {
      this.logger.writeLog(
        'Failed to create Store Order Offset Override',
        error.message,
        correlationId,
        Loglevel.ERROR,
      );
      throw exceptionWrapper(error);
    }
  }

  @Get()
  @Acl('read:restaurant')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: 'Find all Store Order Offset Overrides' })
  @ApiResponse({
    status: 200,
    description:
      'All Store Order Offset Overrides have been successfully found.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async findAllByStoreIdAndDayOfWeek(
    @Query('store') store: number,
    @Query('daysOfWeek') daysOfWeek?: number[],
  ): Promise<StoreOrderOffsetOverride[]> {
    try {
      return this.storeOrderOffsetOverrideService.findAllByStoreIdAndDayOfWeek({
        store: store,
        daysOfWeek: daysOfWeek,
      });
    } catch (error) {
      this.logger.writeLog(
        'Failed to find Store Order Offset Overrides',
        error.message,
        '',
        Loglevel.ERROR,
      );
      throw exceptionWrapper(error);
    }
  }

  @Get(':id')
  @Acl('read:restaurant')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: 'Find a Store Order Offset Override' })
  @ApiResponse({
    status: 200,
    description: 'The Store Order Offset Override has been successfully found.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async findOne(@Param('id') id: string): Promise<StoreOrderOffsetOverride> {
    try {
      return this.storeOrderOffsetOverrideService.findOne(id);
    } catch (error) {
      this.logger.writeLog(
        'Failed to find Store Order Offset Override',
        error.message,
        '',
        Loglevel.ERROR,
      );
      throw exceptionWrapper(error);
    }
  }

  @Patch(':id')
  @Acl('update:restaurant')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: 'Update a Store Order Offset Override' })
  @ApiResponse({
    status: 200,
    description:
      'The Store Order Offset Override has been successfully updated.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async update(
    @Param('id') id: string,
    updateStoreOrderOffsetOverrideDto: UpdateStoreOrderOffsetOverrideDto,
    @Body() user: Resto365User,
    @CorrelationId() correlationId: UUID,
  ): Promise<AuditableResponse<StoreOrderOffsetOverride>> {
    try {
      const restaurant = await this.resto365RestaurantService.findOneByBhyveId(
        (
          await this.storeOrderOffsetOverrideService.findOne(id)
        ).storeId.toString(),
      );
      const result = await this.storeOrderOffsetOverrideService.update(
        id,
        updateStoreOrderOffsetOverrideDto,
        user,
        {
          _metadata: {
            auditUser: user,
            correlationId,
          },
        },
      );
      if (!result) {
        this.logger.writeLog(
          'Failed to update Store Order Offset Override',
          `Failed to update Store Order Offset Override for restaurant ${restaurant.restaurantName}`,
          correlationId,
          Loglevel.ERROR,
        );
        throw new NotFoundException(
          `Failed to update Store Order Offset Override for restaurant ${restaurant.restaurantName}`,
        );
      }
      this.logger.writeLog(
        'Store Order Offset Override updated successfully',
        `Store Order Offset Override updated successfully for restaurant ${restaurant.restaurantName}`,
        correlationId,
        Loglevel.INFO,
      );
      return {
        data: await result,
        _metadata: {
          entitySource: EntitySource.Restaurant,
          entitySourceId: restaurant.id,
          description: `Updated Teporary Order Offset`,
        },
      };
    } catch (error) {
      this.logger.writeLog(
        'Failed to update Store Order Offset Override',
        error.message,
        correlationId,
        Loglevel.ERROR,
      );
      throw exceptionWrapper(error);
    }
  }

  @Delete(':id')
  @Acl('delete:restaurant')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: 'Delete a Store Order Offset Override' })
  @ApiResponse({
    status: 200,
    description:
      'The Store Order Offset Override has been successfully deleted.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async remove(
    @Param('id') id: string,
    @Body() user: Resto365User,
    @CorrelationId() correlationId: UUID,
  ): Promise<AuditableResponse<string>> {
    try {
      const restaurant = await this.resto365RestaurantService.findOneByBhyveId(
        (
          await this.storeOrderOffsetOverrideService.findOne(id)
        ).storeId.toString(),
      );
      const result = this.storeOrderOffsetOverrideService.remove(id);
      if (!result) {
        this.logger.writeLog(
          'Failed to delete Store Order Offset Override',
          `Failed to delete Store Order Offset Override for restaurant ${restaurant.restaurantName}`,
          correlationId,
          Loglevel.ERROR,
        );
        throw new NotFoundException(
          `Failed to delete Store Order Offset Override for restaurant ${restaurant.restaurantName}`,
        );
      }
      this.logger.writeLog(
        'Store Order Offset Override deleted successfully',
        `Store Order Offset Override deleted successfully for restaurant ${restaurant.restaurantName}`,
        correlationId,
        Loglevel.INFO,
      );
      return {
        data: `Deleted Teporary Order Offset with id: ${id}`,
        _metadata: {
          entitySource: EntitySource.Restaurant,
          entitySourceId: restaurant.id,
          description: `Deleted Teporary Order Offset with id: ${id}`,
        },
      };
    } catch (error) {
      this.logger.writeLog(
        'Failed to delete Store Order Offset Override',
        error.message,
        correlationId,
        Loglevel.ERROR,
      );
      throw exceptionWrapper(error);
    }
  }
}
