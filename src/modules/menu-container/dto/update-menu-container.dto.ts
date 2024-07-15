import {
  IsOptional,
  IsNumber,
  IsBoolean,
  IsString,
  IsDecimal,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMenuContainerDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  description?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  parentContainerId?: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  containerType?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  posPlu?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  posPageNo?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  posMenuId?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  posMenuFlowId?: number;

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
  @IsBoolean()
  @ApiProperty()
  isCommonContainer?: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  isActive?: boolean;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  displayOrder?: number;

  @IsOptional()
  @IsDecimal()
  @ApiProperty()
  price?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  updatedBy?: number;
}
