import { Module } from '@nestjs/common';
import { OfferService } from './offer.service';
import { OfferController } from './offer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { Reward } from '../reward/entities/reward.entity';
import { Merchandise } from '../merchandise/entities/merchandise.entity';
import { Product } from '@modules/product/entities/product.entity';
import { StoreOffer } from '@modules/store-offer/entities/store-offer.entity';
import { OfferAttributes } from '@modules/offer-attribute/entities/offer-attributes.entity';
import { Store } from '@modules/store/entities/store.entity';
import { OfferMetaModule } from '@modules/offer-meta/offer-meta.module';
import { OfferMetaService } from '@modules/offer-meta/offer-meta.service';
import { OfferMeta } from '@modules/offer-meta/entities/offer-meta.entity';
import { OfferMetaSection } from '@modules/offer-meta/entities/offer-meta-section.entity';

@Module({
  imports: [
    OfferMetaModule,
    TypeOrmModule.forFeature([
      Offer,
      OfferAttributes,
      Reward,
      Merchandise,
      Product,
      Store,
      StoreOffer,
      OfferMeta,
      OfferMetaSection,
    ]),
  ],
  controllers: [OfferController],
  providers: [OfferService, OfferMetaService],
})
export class OfferModule {}
