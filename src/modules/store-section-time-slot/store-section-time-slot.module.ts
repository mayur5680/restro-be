import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreSectionTimeSlotService } from './store-section-time-slot.service';
import { StoreSectionTimeSlotController } from './store-section-time-slot.controller';
import { StoreSectionTimeSlot } from './entities/store-section-time-slot.entity';
import { StoreSectionTimeSlotOverride } from '@modules/store-section-time-slot-override/entities/store-section-time-slot-override.entity';
import { StoreSectionTimeSlotOverrideService } from '@modules/store-section-time-slot-override/store-section-time-slot-override.service';
import { Resto365RestaurantModule } from '@modules/resto365-restaurant/resto365-restaurant.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StoreSectionTimeSlot,
      StoreSectionTimeSlotOverride,
    ]),
    Resto365RestaurantModule,
  ],
  controllers: [StoreSectionTimeSlotController],
  providers: [StoreSectionTimeSlotService, StoreSectionTimeSlotOverrideService],
  exports: [StoreSectionTimeSlotService],
})
export class StoreSectionTimeSlotModule {}
