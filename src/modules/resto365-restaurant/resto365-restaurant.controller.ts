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
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { Resto365Restaurant } from './entities/resto365-restaurant.entity';
import { CreateResto365RestaurantDto } from './dto/create-resto365-restaurant.dto';
import { Resto365RestaurantService } from './resto365-restaurant.service';
import { StoreService } from '@modules/store/store.service';
import { CombineRestaurantAndStoreResponseDto } from './dto/combine-restaurant-and-store-response.dto';
import { Acl } from '@modules/auth/AclDecorator';
import { AclGuard } from '@modules/auth/AclGuard';
import { User } from '@modules/auth/UserDecorator';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';
import { UpdateResto365RestaurantDto } from './dto/update-resto365-restaurant.dto';
import isEmpty from 'lodash/isEmpty';
import { UUID } from 'crypto';
import { CorrelationId } from '@modules/resto365-audit/CorrelationIdDecorator';
import { EntitySource } from '@modules/resto365-audit/entities/resto365-audit.entity';
import { AuditableResponse } from '@modules/resto365-audit/types';
import { GygLog, exceptionWrapper } from 'src/shared';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Loglevel } from 'src/context';
import { Audit } from '@modules/resto365-audit/AuditDecorator';
import { Resto365NotificationService } from '@modules/resto365-notification/resto365-notification.service';
@Audit('Restaurant')
@Controller('restaurants')
export class Resto365RestaurantController {
  logger: GygLog;
  constructor(
    private readonly restaurantService: Resto365RestaurantService,
    private readonly storeService: StoreService,
    private readonly notificationService: Resto365NotificationService,
  ) {
    this.logger = new GygLog(Resto365RestaurantController.name);
  }

  @Post()
  @Acl('create:restaurant')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: 'Create a restaurant' })
  @ApiResponse({
    status: 201,
    description: 'Created',
    type: Resto365Restaurant,
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(
    @User() user: Resto365User,
    @Body() createRestaurantDto: CreateResto365RestaurantDto,
    @CorrelationId() correlationId: UUID,
  ): Promise<AuditableResponse<Resto365Restaurant>> {
    try {
      this.logger.writeLog(
        'Create Restaurant',
        `Creating restaurant with name: ${createRestaurantDto.restaurantName} and bhyveId: ${createRestaurantDto.bhyveId}`,
        correlationId,
        Loglevel.DEBUG,
      );
      const result = this.restaurantService.create(
        createRestaurantDto,
        user,
        {
          _metadata: {
            auditUser: user,
            correlationId: correlationId,
          },
        },
        correlationId,
      );
      this.logger.writeLog(
        'Create Restaurant',
        `Restaurant with name: ${createRestaurantDto.restaurantName} and bhyveId: ${createRestaurantDto.bhyveId} created successfully`,
        correlationId,
        Loglevel.DEBUG,
      );
      return {
        data: await result,
        _metadata: {
          entitySource: EntitySource.Restaurant,
          entitySourceId: (await result).id,
          description: `Restaurant created with name: ${createRestaurantDto.restaurantName} and bhyveId: ${createRestaurantDto.bhyveId}`,
        },
      };
    } catch (error) {
      throw exceptionWrapper(error);
    }
  }

  @Get('/states')
  async findAllStates() {
    return this.restaurantService.findAllStates();
  }

  @Get('/price-tiers')
  async findAllpriceTiers() {
    return this.restaurantService.findAllpriceTiers();
  }

  @Get()
  @Acl('read:restaurant')
  @UseGuards(AclGuard)
  async findFilteredOrAll(
    @User() user: Resto365User,
    // TODO: We should use restoIds instead of bhyveIds
    @Query('bhyveId') bhyveId?: string,
  ): Promise<CombineRestaurantAndStoreResponseDto[]> {
    if (bhyveId) {
      const restaurant: Resto365Restaurant =
        await this.restaurantService.findOneByBhyveId(bhyveId);
      this.checkUserAssignedRestaurant(user, restaurant.id);
      const store = await this.storeService.findById(+restaurant.bhyveId);
      return [
        {
          ...restaurant,
          store,
        } as unknown as CombineRestaurantAndStoreResponseDto,
      ];
    } else {
      let restaurants: Resto365Restaurant[];
      if (!(restaurants = await this.getUserRestaurants(user))) {
        restaurants = await this.restaurantService.findAll();
      }
      const restaurantsWithStores = await Promise.all(
        restaurants.map(async (restaurant) => {
          const store = await this.storeService.findById(+restaurant.bhyveId);
          return {
            ...restaurant,
            store,
          } as unknown as CombineRestaurantAndStoreResponseDto;
        }),
      );
      return restaurantsWithStores;
    }
  }

  @Get(':id')
  @Acl('read:restaurant')
  @UseGuards(AclGuard)
  async findOneById(
    @Param('id') id: string,
    @User() user: Resto365User,
  ): Promise<CombineRestaurantAndStoreResponseDto> {
    this.checkUserAssignedRestaurant(user, +id);
    const restaurant = await this.restaurantService.findOne(+id);
    const store = await this.storeService.findById(+restaurant.bhyveId);
    return {
      ...restaurant,
      store,
    } as unknown as CombineRestaurantAndStoreResponseDto;
  }

  @Patch(':id')
  @Acl('update:restaurant')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: 'Update a restaurant' })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: Resto365Restaurant,
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updateRestaurant(
    @Param('id') id: number,
    @Body() updateRestaurantDto: UpdateResto365RestaurantDto,
    @User() user: Resto365User,
    @CorrelationId() correlationId: UUID,
  ): Promise<AuditableResponse<Resto365Restaurant>> {
    this.checkUserAssignedRestaurant(user, +id);
    try {
      this.logger.writeLog(
        'Update Restaurant',
        `Updating restaurant with id: ${id}`,
        correlationId,
        Loglevel.DEBUG,
      );
      const updatedRestaurant = await this.restaurantService.update(
        id,
        updateRestaurantDto,
        user,
        { _metadata: { auditUser: user, correlationId: correlationId } },
        correlationId,
      );
      this.logger.writeLog(
        'Update Restaurant',
        `Restaurant with id: ${id} updated successfully`,
        correlationId,
        Loglevel.DEBUG,
      );

      return {
        data: updatedRestaurant,
        _metadata: {
          entitySource: EntitySource.Restaurant,
          entitySourceId: id,
          description: `Restaurant updated`, // TODO
        },
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.writeLog(
          'Update Restaurant',
          error.message,
          correlationId,
          Loglevel.ERROR,
        );
        throw new NotFoundException(error.message); // Handle NotFoundException
      } else if (error instanceof BadRequestException) {
        this.logger.writeLog(
          'Update Restaurant',
          error.message,
          correlationId,
          Loglevel.ERROR,
        );
        throw new BadRequestException(error.message); // Handle BadRequestException
      } else {
        this.logger.writeLog(
          'Update Restaurant',
          error.message,
          correlationId,
          Loglevel.ERROR,
        );
        exceptionWrapper(error);
      }
    }
  }

  private getUserRestaurants(user: Resto365User) {
    if (!isEmpty(user.restaurants)) {
      return this.restaurantService.findByIds(
        user.restaurants.map((r) => r.id),
      );
    } else {
      return undefined;
    }
  }

  /**
   * Check if the user is assigned to the restaurant, if not throw a ForbiddenException
   * @param user
   * @param restaurantId
   * @throws ForbiddenException
   */
  private checkUserAssignedRestaurant(
    user: Resto365User,
    restaurantId: number,
  ) {
    if (
      !isEmpty(user.restaurants) &&
      !user.restaurants.some((r) => r.id === restaurantId)
    ) {
      throw new ForbiddenException(
        `The user is not assigned to restaurant ${restaurantId}`,
      );
    }
  }
}
