import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  containerId: number;

  @ApiProperty()
  parentProductId?: number;

  @ApiProperty()
  posPlu: number;

  @ApiProperty()
  posMenuId: number;

  @ApiProperty()
  posMenuFlowId?: number;

  @ApiProperty()
  productType: string;

  @ApiProperty()
  partType?: string;

  @ApiProperty()
  actionType?: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  kilojoules: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  image?: string;

  @ApiProperty()
  imageTop?: string;

  @ApiProperty()
  imageAngle?: string;

  @ApiProperty()
  displayOrder: number;
}
