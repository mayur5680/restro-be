import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Resto365RestaurantLicenceService } from './resto365-restaurant-licence.service';
import { Resto365RestaurantLicenceController } from './resto365-restaurant-licence.controller';
import { Resto365RestaurantLicence } from './entities/resto365-restaurant-licence.entity';
import { Resto365RestaurantModule } from '@modules/resto365-restaurant/resto365-restaurant.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Resto365RestaurantLicence], 'r365'),
    Resto365RestaurantModule,
  ],
  controllers: [Resto365RestaurantLicenceController],
  providers: [Resto365RestaurantLicenceService],
})
export class Resto365RestaurantLicenceModule {}
