import { IsOptional, IsString, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStoreOrderOffsetOverrideDto {
  @IsNumber()
  @ApiProperty()
  storeId: number;

  @IsString()
  @ApiProperty()
  startTime: string;

  @IsString()
  @ApiProperty()
  endTime: string;

  @IsNumber()
  @ApiProperty()
  dayOfWeek: number;

  @IsOptional()
  @ApiProperty()
  effectiveFrom: Date | null;

  @IsOptional()
  @ApiProperty()
  effectiveTo: Date | null;

  @IsNumber()
  @ApiProperty()
  value: number;

  @IsOptional()
  @ApiProperty()
  offset: number | null;

  @IsBoolean()
  @ApiProperty()
  isActive: boolean;
}
