import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateStoreSurchargeDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  storeId: number;

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
  posPlu: number;

  @ApiProperty()
  @IsNotEmpty()
  surchargePercentage: number;

  @ApiProperty()
  @IsNotEmpty()
  surchargeAmount: number;
}
