import { ApiProperty } from '@nestjs/swagger';
import {
  IsDecimal,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';

export class UpdateMenuContainerProductAttributeDto {
  @IsInt()
  @ApiProperty()
  @IsOptional()
  menuContainerProductId?: number;

  @IsInt()
  @ApiProperty()
  @IsOptional()
  posMenuId?: number;

  @IsDecimal()
  @Min(0)
  @ApiProperty()
  @IsOptional()
  price?: number;

  @IsOptional()
  @IsDecimal()
  @Min(0)
  @ApiProperty()
  overridePrice?: number | null;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  updatedBy?: number;
}
