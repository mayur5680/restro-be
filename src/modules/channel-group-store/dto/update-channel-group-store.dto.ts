import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsInt, IsNotEmpty } from 'class-validator';

import { CreateChannelGroupStoreDto } from './create-channel-group-store.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateChannelGroupStoreDto extends PartialType(
  CreateChannelGroupStoreDto,
) {
  @IsNotEmpty()
  @ApiProperty()
  @IsBoolean()
  isActive: boolean;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  updatedBy: number;
}
