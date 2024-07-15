import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, IsBoolean, IsOptional } from 'class-validator';
export class CreateChannelGroupDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  channelId: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  groupId: number;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  isActive?: boolean;

  @IsNotEmpty()
  @ApiProperty()
  createdBy: number;
}
