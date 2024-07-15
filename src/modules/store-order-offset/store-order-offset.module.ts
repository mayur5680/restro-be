import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StoreOrderOffsetService } from './store-order-offset.service';
import { StoreOrderOffsetController } from './store-order-offset.controller';
import { StoreOrderOffset } from './entities/store-order-offset.entity';
import { Resto365RestaurantModule } from '@modules/resto365-restaurant/resto365-restaurant.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([StoreOrderOffset]),
    forwardRef(() => Resto365RestaurantModule),
  ],
  controllers: [StoreOrderOffsetController],
  providers: [StoreOrderOffsetService],
  exports: [StoreOrderOffsetService],
})
export class StoreOrderOffsetModule {}
