import { Controller, Get, UseGuards } from '@nestjs/common';
import { AclGuard } from '@modules/auth/AclGuard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { exceptionWrapper } from 'src/shared';
import { User } from '@modules/auth/UserDecorator';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';

import { UpdateResto365RestaurantDto } from '@modules/resto365-restaurant/dto/update-resto365-restaurant.dto';
import { Resto365RestaurantTempService } from './resto365-restaurant-temp.service';

@Controller('resto365-restaurant-temp')
export class Resto365RestaurantTempController {
  constructor(
    private readonly restaurantTempService: Resto365RestaurantTempService,
  ) {}

  @Get()
  @UseGuards(AclGuard)
  @ApiOperation({ summary: 'Sync temp restaurants to main restaurants' })
  @ApiResponse({
    status: 200,
    description: 'Synced',
    type: [UpdateResto365RestaurantDto],
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async syncTempRestaurantToRestaurant(
    @User() user: Resto365User,
  ): Promise<UpdateResto365RestaurantDto[]> {
    try {
      if (user.roleId !== 1) {
        throw new Error('Unauthorized, this action is only allowed for admin');
      }
      return await this.restaurantTempService.syncTempRestaurantToRestaurant();
    } catch (error) {
      throw exceptionWrapper(error);
    }
  }
}
