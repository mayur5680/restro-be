import { PartialType } from '@nestjs/swagger';
import { CreateOfferAttributeDto } from './create-offer-attribute.dto';

export class UpdateOfferAttributeDto extends PartialType(
  CreateOfferAttributeDto,
) {}
