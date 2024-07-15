import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { LoyaltyType } from 'src/context';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LoyaltyDetailDTO {
  @Expose()
  id: string;

  @Expose()
  cardNumber: string;

  @Expose()
  posMemberId: string;
}

export class LoyaltyUserStatsDTO {
  @Expose()
  gygDollar: number;

  @Expose()
  points: number;

  @Expose()
  @Transform(({ value }) => value.toISOString(), { toPlainOnly: true })
  updatedAt: string;

  @Expose()
  cardNumber: string;

  @Expose()
  posMemberId: string;
}

export class UpdateLoyalty {
  points?: number;
  gygDollar?: number;
  comment: string;
  storeId: number;
}

export class UpdateLoyaltyDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  loyaltyType: LoyaltyType;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  value: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  comment: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  storeId: number;
}
