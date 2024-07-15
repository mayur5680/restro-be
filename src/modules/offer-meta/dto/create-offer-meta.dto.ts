import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, IsUrl } from 'class-validator';

export class CreateOfferMetaDto {
  @ApiProperty()
  @IsNotEmpty()
  subTitle: string;

  @ApiProperty()
  alwaysShow: boolean;

  @ApiProperty()
  @IsNotEmpty()
  callToActionText: string;

  @ApiProperty()
  @IsNotEmpty()
  callToActionlink: string;

  @ApiProperty()
  @IsUrl()
  webImage: string;

  @ApiProperty()
  @IsUrl()
  dashboardImageUrl: string;

  @ApiProperty()
  @IsUrl()
  dashboardWebImageUrl: string;

  @ApiProperty()
  tocTitle: string;

  @ApiProperty()
  @IsUrl()
  tocUrl: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  brazePromotionId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  offerId: string;

  // Offer Meat Section fields
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;
}
