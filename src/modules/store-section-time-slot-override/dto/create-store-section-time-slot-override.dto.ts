import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsOptional,
  Validate,
  IsDate,
} from 'class-validator';
import { IsTimeConstraint } from '@modules/validators/is-time.constraint';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStoreSectionTimeSlotOverrideDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  storeSectionTimeSlotId: number;

  @IsOptional()
  @Validate(IsTimeConstraint, { message: 'closingTime must be a valid time' })
  @ApiProperty()
  openingTime?: string | null;

  @IsOptional()
  @Validate(IsTimeConstraint, { message: 'closingTime must be a valid time' })
  @ApiProperty()
  closingTime?: string | null;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty()
  effectiveFrom: Date;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty()
  effectiveTo: Date;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  reasonForOverride: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  storeStatus: 'OPEN' | 'CLOSE';
}
