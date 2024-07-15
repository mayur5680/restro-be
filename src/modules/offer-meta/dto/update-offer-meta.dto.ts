import { PartialType } from '@nestjs/swagger';
import { CreateOfferMetaDto } from './create-offer-meta.dto';

export class UpdateOfferMetaDto extends PartialType(CreateOfferMetaDto) {}
