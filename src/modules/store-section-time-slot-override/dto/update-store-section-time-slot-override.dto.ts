import { IsString, IsOptional, Validate, IsDate } from 'class-validator';
import { IsTimeConstraint } from '@modules/validators/is-time.constraint';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStoreSectionTimeSlotOverrideDto {
  @IsOptional()
  @Validate(IsTimeConstraint, { message: 'closingTime must be a valid time' })
  @ApiProperty()
  openingTime?: string | null;

  @IsOptional()
  @Validate(IsTimeConstraint, { message: 'closingTime must be a valid time' })
  @ApiProperty()
  closingTime?: string | null;

  @IsOptional()
  @IsDate()
  @ApiProperty()
  effectiveFrom?: Date;

  @IsOptional()
  @IsDate()
  @ApiProperty()
  effectiveTo?: Date;

  @IsOptional()
  @IsString()
  @ApiProperty()
  reasonForOverride?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  storeStatus?: 'OPEN' | 'CLOSE';
}
