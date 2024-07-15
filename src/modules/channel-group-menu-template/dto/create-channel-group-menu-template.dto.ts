import { IsInt, IsBoolean, IsOptional, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelGroupMenuTemplateDto {
  @IsInt()
  @ApiProperty()
  channelGroupId: number;

  @IsInt()
  @ApiProperty()
  menuTemplateId: number;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  isActive?: boolean;

  @IsDate()
  @ApiProperty()
  createdAt: Date;

  @IsInt()
  @ApiProperty()
  createdBy: number;

  @IsOptional()
  @IsDate()
  @ApiProperty()
  updatedAt?: Date;

  @IsOptional()
  @IsInt()
  @ApiProperty()
  updatedBy?: number;
}
