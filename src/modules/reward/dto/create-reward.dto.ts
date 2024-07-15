import {
  RewardDiscountType,
  RewardProperty,
  RewardType,
} from '@modules/offer/types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateRewardDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  properties: RewardProperty[];

  @ApiProperty()
  @IsNotEmpty()
  type: RewardType;

  @ApiProperty()
  @IsOptional()
  discountType: RewardDiscountType;
}
