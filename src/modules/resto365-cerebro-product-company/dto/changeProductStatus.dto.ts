import { CreateMenuContainerOverrideDto } from '@modules/menu-container-override/dto/create-menu-container-override.dto';
import { CreateMenuContainerProductOverrideDto } from '@modules/menu-container-product-override/dto/create-menu-container-product-override.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class ChangeProductStatusDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  isEnable: boolean;

  @IsOptional()
  @IsString()
  @ApiProperty()
  productName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  reason: string;
}

export class ChangeProductStatusRequest {
  @IsOptional()
  @IsString()
  @ApiProperty()
  reason: string;

  @IsArray()
  @ApiProperty()
  products: ChangeProductStatusDto[];
}

export class ModifyingProducts extends ChangeProductStatusDto {
  deleteProduct?: number[];
  overrideProduct?: CreateMenuContainerProductOverrideDto[];
}

export class ModifyingContainers {
  deleteContainer?: number[];
  overrideContainer?: CreateMenuContainerOverrideDto[];
}
