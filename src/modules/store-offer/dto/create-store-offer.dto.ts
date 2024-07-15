import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateStoreOfferDto {
  @ApiProperty()
  @IsNotEmpty()
  offerId: string;

  @ApiProperty()
  @IsNotEmpty()
  storeId: number;

  @ApiProperty()
  @IsOptional()
  isActive?: boolean;
}
