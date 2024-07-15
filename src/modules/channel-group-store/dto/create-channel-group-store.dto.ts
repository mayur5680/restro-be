import { IsBoolean, IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelGroupStoreDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  channelId: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  groupId: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  storeId: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsBoolean()
  isActive: boolean;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  createdBy: number;

  @IsInt()
  @IsOptional()
  @ApiProperty()
  updatedBy: number;
}
