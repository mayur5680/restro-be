import { IsOptional, IsString, IsNumber, IsDecimal } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMenuContainerOverrideDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty()
  groupId?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  channelId?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  storeId?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  menuTemplateId?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  menuContainerPosPlu?: number;

  @IsOptional()
  @IsDecimal({ decimal_digits: '2' })
  @ApiProperty()
  price?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  posMenuId?: number;

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
  image?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  status?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  imageTop?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  imageAngle?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  createdAt?: Date;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  createdBy?: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  updatedAt?: Date;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  updatedBy?: number;
}
