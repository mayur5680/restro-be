import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export enum UserDeviceStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export class CreateUserDeviceDto {
  @ApiProperty()
  @IsNotEmpty()
  userId: number;

  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: false })
  @IsOptional()
  mobile?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  deviceId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  deviceToken?: string;

  @ApiProperty({ enum: UserDeviceStatus, default: UserDeviceStatus.ACTIVE })
  @IsOptional()
  status?: UserDeviceStatus;

  @ApiProperty({ required: false })
  @IsOptional()
  createdBy?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  updatedBy?: number;

  @ApiProperty({ default: false })
  @IsOptional()
  oldDevice?: boolean;
}
