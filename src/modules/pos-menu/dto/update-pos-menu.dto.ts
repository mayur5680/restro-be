import { IsNotEmpty, IsOptional, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePosMenuDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  description: string | null;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  storeId: number | null;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  tier: number | null;

  @IsOptional()
  @IsString()
  @ApiProperty()
  type: string | null;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  updatedBy: number;
}
