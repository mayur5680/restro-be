import { IsOptional, IsNotEmpty, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSectionDto {
  @IsOptional()
  @ApiProperty()
  parentSectionId?: number;

  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsOptional()
  @ApiProperty()
  description?: string;

  @IsOptional()
  @ApiProperty()
  isCommonSection?: number;

  @IsOptional()
  @ApiProperty()
  isActive?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @ApiProperty()
  displayOrder?: number;

  @IsNotEmpty()
  @ApiProperty()
  createdBy: number;

  @IsOptional()
  @ApiProperty()
  updatedBy?: number;

  @IsOptional()
  @ApiProperty()
  createdAt?: Date;

  @IsOptional()
  @ApiProperty()
  updatedAt?: Date;
}
