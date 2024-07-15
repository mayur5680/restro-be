import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateGroupStoreDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsBoolean()
  isActive: boolean;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  updatedBy: number;
}
