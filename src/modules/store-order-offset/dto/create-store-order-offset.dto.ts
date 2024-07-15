import { IsBoolean, IsInt, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStoreOrderOffsetDto {
  @IsInt()
  @ApiProperty()
  storeId: number;

  @IsInt()
  @ApiProperty()
  value: number;

  @IsInt()
  @ApiProperty()
  offset: number;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  isActive?: boolean;
}
