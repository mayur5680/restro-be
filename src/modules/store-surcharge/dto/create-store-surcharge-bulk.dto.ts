import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Min } from 'class-validator';

export class CreateStoreSurchargeBulkDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  state: string;

  @ApiProperty()
  @IsNotEmpty()
  startDateTime: string;

  @ApiProperty()
  @IsNotEmpty()
  endDateTime: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  isVisibleForCustomer: boolean;

  @ApiProperty()
  definitionId: number;

  @ApiProperty()
  @IsNotEmpty()
  @Min(1)
  posPlu: number;

  @ApiProperty()
  @IsNotEmpty()
  surchargePercentage: number;

  @ApiProperty()
  @IsNotEmpty()
  surchargeAmount: number;
}
