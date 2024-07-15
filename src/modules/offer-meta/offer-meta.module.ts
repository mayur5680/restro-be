import { Module } from '@nestjs/common';
import { OfferMetaService } from './offer-meta.service';
import { OfferMetaController } from './offer-meta.controller';
import { OfferMeta } from './entities/offer-meta.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfferMetaSection } from '@modules/offer-meta/entities/offer-meta-section.entity';
import { Offer } from '@modules/offer/entities/offer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OfferMeta, Offer, OfferMetaSection])],
  controllers: [OfferMetaController],
  providers: [OfferMetaService],
  exports: [OfferMetaService],
})
export class OfferMetaModule {}
