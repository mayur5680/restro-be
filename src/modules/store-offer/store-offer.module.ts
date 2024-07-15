import { Module } from '@nestjs/common';
import { StoreOfferService } from './store-offer.service';
import { StoreOfferController } from './store-offer.controller';
import { StoreOffer } from './entities/store-offer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([StoreOffer])],
  controllers: [StoreOfferController],
  providers: [StoreOfferService],
})
export class StoreOfferModule {}
