import {
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsString,
  MaxLength,
  IsDecimal,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuContainerProductDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(350)
  @ApiProperty()
  description?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  containerId?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  parentProductId?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  posPlu?: number;

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
  @MaxLength(3)
  @ApiProperty()
  productType?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1)
  @ApiProperty()
  partType?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1)
  @ApiProperty()
  actionType?: string;

  @IsOptional()
  @IsDecimal({ decimal_digits: '2' })
  @ApiProperty()
  price?: number;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @ApiProperty()
  kilojoules?: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  isActive?: boolean;

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
  @IsNumber()
  @ApiProperty()
  displayOrder?: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  createdBy: number;

  // Pagination parameters
  page?: number; // Current page number
  limit?: number; // Number of items per page
}
