import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';
import { CouponType } from '../types';

export class CreateCouponDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  code: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  percentage: number;

  @ApiProperty()
  productId: number;

  @ApiProperty()
  minValue: number;

  @ApiProperty()
  enableNotification: boolean;

  @ApiProperty()
  @IsDateString()
  issueDate: string;

  @ApiProperty()
  @IsDateString()
  expiryDate: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  oneof: boolean;

  @ApiProperty()
  loyaltyPoints: number;

  @ApiProperty()
  posPlu: number;

  @ApiProperty()
  defaultPrice: number;

  @ApiProperty()
  image: string;

  @ApiProperty()
  link: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  couponType: CouponType;

  @ApiProperty()
  priceDescription: string;

  @ApiProperty()
  offerDescription: string;

  @ApiProperty()
  intraTitle: string;

  @ApiProperty()
  stepText: string;

  @ApiProperty()
  webImage: string;

  @ApiProperty()
  validityPeriod: number;

  @ApiProperty()
  validityPeriodType: string;

  @ApiProperty()
  dashboardImageLink: string;

  @ApiProperty()
  dashboardWebImageLink: string;

  @ApiProperty()
  isMultipart: boolean;

  @ApiProperty()
  taskReferencePosPlu: number;

  @ApiProperty()
  rewardTypeId: number;
}
