import {
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsString,
  IsDecimal,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuContainerAttributeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  menuContainerId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  posMenuId: string;

  @IsDecimal()
  @IsOptional()
  @ApiProperty()
  @Min(0)
  price: number;

  @IsDecimal()
  @IsOptional()
  @ApiProperty()
  @Min(0)
  overridePrice: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  createdBy: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  updatedBy: number;
}
