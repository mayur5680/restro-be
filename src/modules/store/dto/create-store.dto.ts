import {
  IsOptional,
  IsString,
  IsNumber,
  IsDecimal,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStoreDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty()
  posStoreId?: number;

  @IsOptional()
  @ApiProperty()
  @IsNumber()
  oldStoreId?: number;

  @IsString()
  @ApiProperty()
  name: string;

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

  @IsString()
  @ApiProperty()
  postCode: string;

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

  @IsNumber()
  @ApiProperty()
  displayOrder: number;

  @IsBoolean()
  @ApiProperty()
  isActive: boolean;

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
  createdBy?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  updatedBy?: number;
}
