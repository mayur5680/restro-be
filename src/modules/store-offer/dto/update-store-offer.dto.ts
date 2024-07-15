import { PartialType } from '@nestjs/swagger';
import { CreateStoreOfferDto } from './create-store-offer.dto';

export class UpdateStoreOfferDto extends PartialType(CreateStoreOfferDto) {}
