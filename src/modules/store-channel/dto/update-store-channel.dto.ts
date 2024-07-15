import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsUUID } from 'class-validator';

export class UpdateStoreChannelDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID()
  storeId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  channelId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  isActive?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  updatedBy?: string;
}
