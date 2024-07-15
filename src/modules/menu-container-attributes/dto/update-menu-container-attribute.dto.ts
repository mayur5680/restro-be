import {
  IsOptional,
  IsNumber,
  IsString,
  IsDecimal,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMenuContainerAttributeDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  menuContainerId?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  posMenuId?: string;

  @IsDecimal()
  @IsOptional()
  @ApiProperty()
  @Min(0)
  price?: number;

  @IsDecimal()
  @IsOptional()
  @ApiProperty()
  @Min(0)
  overridePrice?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  updatedBy?: number;
}
