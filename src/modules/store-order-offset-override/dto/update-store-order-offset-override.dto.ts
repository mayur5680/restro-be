import { IsOptional, IsString, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStoreOrderOffsetOverrideDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty()
  storeId?: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  startTime?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  endTime?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  dayOfWeek?: number;

  @IsOptional()
  @ApiProperty()
  effectiveFrom?: Date | null;

  @IsOptional()
  @ApiProperty()
  effectiveTo?: Date | null;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  value?: number;

  @IsOptional()
  @ApiProperty()
  offset?: number | null;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  isActive?: boolean;
}
