import { ApiProperty } from '@nestjs/swagger';
import { OfferType, TriggerType, UserType } from '../types';
import { IsArray, IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { OfferAttributes } from '@modules/offer-attribute/entities/offer-attributes.entity';

export class CreateOfferDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  masterCouponId?: string;

  @ApiProperty({ required: false })
  hook?: string;

  @ApiProperty({ enum: OfferType, required: false })
  @IsString()
  @IsNotEmpty()
  offerType: OfferType;

  @ApiProperty({ enum: UserType, required: false })
  @IsString()
  @IsNotEmpty()
  userType: UserType;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsNotEmpty()
  endDate: string;

  @ApiProperty({ enum: TriggerType, required: false })
  triggerType: TriggerType;

  @ApiProperty({ required: false })
  oneOff: boolean;

  @ApiProperty({ required: false })
  priority: number;

  @ApiProperty({ required: false })
  rewardTypeId: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  offerAttributes: Partial<OfferAttributes>;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsArray()
  offerStores: number[];
}
