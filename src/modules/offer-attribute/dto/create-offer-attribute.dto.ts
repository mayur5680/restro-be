import { OfferDetails } from '@modules/offer/types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateOfferAttributeDto {
  @ApiProperty()
  @IsNotEmpty()
  offerDetails: OfferDetails;

  @ApiProperty()
  @IsOptional()
  merchandiseId?: number;

  @ApiProperty()
  @IsOptional()
  menuContainerId?: number;

  @ApiProperty()
  @IsOptional()
  menuContainerProductId?: number;

  @ApiProperty()
  @IsOptional()
  minQuantity?: number;

  @ApiProperty()
  minValue: number;

  @ApiProperty()
  minSpendByMenuContainerId: number;

  @ApiProperty()
  minSpendByMenuContainerProductId: number;

  @ApiProperty()
  claimedLimitUnit: string;

  @ApiProperty()
  displayText: string;

  @ApiProperty()
  claimedUnitValue: number;

  @ApiProperty()
  maxAllowedPerOrder: number;

  @ApiProperty()
  maxAllowedPerUser: number;

  @ApiProperty()
  isActive: boolean;
}
