import {
  IsOptional,
  IsString,
  IsNumber,
  IsDecimal,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStoreDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty()
  posStoreId?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  oldStoreId?: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  description?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  timeZone?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  address1?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  address2?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  city?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  postCode?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  country?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  state?: string;

  @IsOptional()
  @IsDecimal({ decimal_digits: '8' })
  @ApiProperty()
  longitude?: number;

  @IsOptional()
  @IsDecimal({ decimal_digits: '8' })
  @ApiProperty()
  latitude?: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  orderLink?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  cateringLink?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  phone?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  email?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  storeAlertEmail?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  displayOrder?: number;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  isActive?: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  isTest?: boolean;

  @IsOptional()
  @IsString()
  @ApiProperty()
  inActiveReason?: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  isFoodCourt?: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  hasBreakfast?: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  hasCoffee?: boolean;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  maxOrderValue?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  minOrderValue?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  orderAlertValueThreshold?: number;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  syncLoyaltyDollars?: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  syncLoyaltyPoints?: boolean;

  @IsOptional()
  @IsString()
  @ApiProperty()
  googlePlaceId?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  gst?: number;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  isGstIncluded?: boolean;

  @IsOptional()
  @IsString()
  @ApiProperty()
  taxOfficeCode?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  brandSiteRestaurantLink?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  fax?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  orderingId?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  orderingName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  campaignMonitorCode?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  primaryMarketingArea?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  trafficVolume?: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  additionalDetails?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  storeGroup?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  longDescription?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  formattedStoreName?: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  disableStoreOrder?: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  isPermanentlyClosed?: boolean;

  @IsOptional()
  @IsString()
  @ApiProperty()
  pickupInstruction?: string;
}
