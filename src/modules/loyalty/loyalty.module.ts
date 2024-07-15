import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Loyalty } from './loyalty.entity';
import { LoyaltyService } from './loyalty.service';
import { LoyaltyController } from './loyalty.controlller';
@Module({
  imports: [TypeOrmModule.forFeature([Loyalty])],
  providers: [LoyaltyService],
  controllers: [LoyaltyController],
})
export class LoyaltyModule {}
