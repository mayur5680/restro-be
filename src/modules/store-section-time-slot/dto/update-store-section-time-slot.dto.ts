import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsOptional, Validate } from 'class-validator';
import { CreateStoreSectionTimeSlotDto } from './create-store-section-time-slot.dto';
import { IsTimeConstraint } from '@modules/validators/is-time.constraint';

export class UpdateStoreSectionTimeSlotDto extends PartialType(
  CreateStoreSectionTimeSlotDto,
) {
  @Validate(IsTimeConstraint, { message: 'openingTime must be a valid time' })
  @ApiProperty()
  @IsOptional()
  openingTime?: string;

  @Validate(IsTimeConstraint, { message: 'closingTime must be a valid time' })
  @ApiProperty()
  @IsOptional()
  closingTime?: string;

  @IsBoolean({ message: 'isActive must be a boolean' })
  @ApiProperty()
  @IsOptional()
  isActive?: boolean;
}
