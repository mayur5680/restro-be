import { Module } from '@nestjs/common';
import { OfferAttributeService } from './offer-attribute.service';
import { OfferAttributeController } from './offer-attribute.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfferAttributes } from './entities/offer-attributes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OfferAttributes])],
  controllers: [OfferAttributeController],
  providers: [OfferAttributeService],
})
export class OfferAttributeModule {}
