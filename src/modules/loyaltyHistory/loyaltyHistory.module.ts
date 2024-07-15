import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoyaltyHistory } from './loyaltyHistory.entity';
import { LoyaltyHistoryController } from './loyaltyHistory.controller';
import { LoyaltyHistoryService } from './loyaltyHistory.service';

@Module({
  imports: [TypeOrmModule.forFeature([LoyaltyHistory])],
  providers: [LoyaltyHistoryService],
  controllers: [LoyaltyHistoryController],
})
export class LoyaltyHistoryModule {}
