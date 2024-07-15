import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Resto365RestaurantTempService } from './resto365-restaurant-temp.service';
import { Resto365RestaurantTempController } from './resto365-restaurant-temp.controller';
import { TempRestaurant } from './entities/resto365-restaurant-temp.entity';
import { Resto365RestaurantModule } from '../resto365-restaurant/resto365-restaurant.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TempRestaurant], 'r365'),
    Resto365RestaurantModule,
  ],
  controllers: [Resto365RestaurantTempController],
  providers: [Resto365RestaurantTempService],
})
export class Resto365RestaurantTempModule {}
