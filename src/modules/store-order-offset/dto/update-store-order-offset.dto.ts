import { IsBoolean, IsInt, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStoreOrderOffsetDto {
  @IsOptional()
  @IsInt()
  @ApiProperty()
  value?: number;

  @IsOptional()
  @IsInt()
  @ApiProperty()
  offset?: number;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  isActive?: boolean;
}
