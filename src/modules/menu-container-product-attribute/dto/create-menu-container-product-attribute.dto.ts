import {
  IsInt,
  IsOptional,
  IsDecimal,
  Min,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuContainerProductAttributeDto {
  @IsInt()
  @ApiProperty()
  @IsNotEmpty()
  menuContainerProductId: number;

  @IsInt()
  @ApiProperty()
  @IsNotEmpty()
  posMenuId: number;

  @IsDecimal()
  @Min(0)
  @ApiProperty()
  @IsNotEmpty()
  price: number;

  @IsOptional()
  @IsDecimal()
  @Min(0)
  @ApiProperty()
  overridePrice?: number | null;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  createdBy?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  updatedBy?: number;
}
