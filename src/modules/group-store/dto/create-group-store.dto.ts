import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateGroupStoreDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  groupId: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  storeId: number;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  isActive?: boolean;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  createdBy: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  updatedBy?: number;
}
