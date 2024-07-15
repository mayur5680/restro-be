import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateStoreTagDto {
  @ApiProperty()
  @IsNotEmpty()
  tagId: number;

  @ApiProperty()
  @IsNotEmpty()
  storeId: number;

  @ApiProperty()
  @IsOptional()
  isActive?: boolean;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  createdBy?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  updatedBy?: number;
}
