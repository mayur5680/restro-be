import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsUUID, IsOptional } from 'class-validator';

export class CreateStoreChannelDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  storeId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  channelId: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  isActive?: number;

  @ApiProperty()
  @IsNotEmpty()
  createdBy: string;

  @ApiProperty()
  @IsOptional()
  updatedBy?: string;

  @ApiProperty()
  @IsOptional()
  deletedBy?: string;
}
