import { IsOptional, IsNumber, IsString, IsDecimal } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuContainerProductOverrideDto {
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
  menuContainerProductPosPlu?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  parentMenuContainerProductPosPlu?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  menuContainerProductId?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  posMenuId?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  menuContainerPosPlu?: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  description?: string;

  @IsOptional()
  @IsDecimal({ decimal_digits: '2' })
  @ApiProperty()
  price?: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  status?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  productType?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  partType?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  actionType?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  image?: string;

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
  kilojoules?: string;
}
