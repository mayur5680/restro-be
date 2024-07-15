import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsString,
  IsDate,
} from 'class-validator';

export class CreateResto365CerebroProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  productMappingPk: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  recipePlu: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  posPLU: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  posProductName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  recipeName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  ingredientName: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  componentSequence: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  recipeQty: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  productCompanyNameNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  portion: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  recipeCategory: string;

  @ApiProperty()
  @IsDate()
  lastTouchDate: Date;
}
