import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StoreSectionTimeSlotOverrideService } from './store-section-time-slot-override.service';
import { StoreSectionTimeSlotOverrideController } from './store-section-time-slot-override.controller';
import { StoreSectionTimeSlotOverride } from './entities/store-section-time-slot-override.entity';

import { StoreSectionTimeSlotModule } from '@modules/store-section-time-slot/store-section-time-slot.module';
import { Resto365RestaurantModule } from '@modules/resto365-restaurant/resto365-restaurant.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([StoreSectionTimeSlotOverride]),
    StoreSectionTimeSlotModule,
    Resto365RestaurantModule,
  ],
  controllers: [StoreSectionTimeSlotOverrideController],
  providers: [StoreSectionTimeSlotOverrideService],
})
export class StoreSectionTimeSlotOverrideModule {}
