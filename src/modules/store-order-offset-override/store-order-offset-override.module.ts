import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StoreOrderOffsetOverrideService } from './store-order-offset-override.service';
import { StoreOrderOffsetOverrideController } from './store-order-offset-override.controller';
import { StoreOrderOffsetOverride } from './entities/store-order-offset-override.entity';
import { Resto365RestaurantModule } from '@modules/resto365-restaurant/resto365-restaurant.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([StoreOrderOffsetOverride]),
    Resto365RestaurantModule,
  ],
  controllers: [StoreOrderOffsetOverrideController],
  providers: [StoreOrderOffsetOverrideService],
  exports: [StoreOrderOffsetOverrideService],
})
export class StoreOrderOffsetOverrideModule {}
