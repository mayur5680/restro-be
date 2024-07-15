import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateMerchandiseDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  @IsOptional()
  image?: string;

  @ApiProperty()
  @IsOptional()
  imageTop?: string;

  @ApiProperty()
  @IsOptional()
  imageAngle?: string;

  @ApiProperty()
  @IsOptional()
  posPlu?: number;

  @ApiProperty()
  needInventoryValidation: boolean;
}
