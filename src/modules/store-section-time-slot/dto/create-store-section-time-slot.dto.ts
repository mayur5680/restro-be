import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsBoolean,
  Validate,
} from 'class-validator';
import { IsTimeConstraint } from '@modules/validators/is-time.constraint';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStoreSectionTimeSlotDto {
  @IsNotEmpty()
  @IsInt({ message: 'storeId must be an integer' })
  @ApiProperty()
  storeId: number;

  @IsNotEmpty({ message: 'sectionId is required' })
  @IsInt({ message: 'sectionId must be an integer' })
  @ApiProperty()
  sectionId: number;

  @IsNotEmpty()
  @IsInt({ message: 'dayOfWeek must be an integer' })
  @ApiProperty()
  dayOfWeek: number;

  @IsNotEmpty()
  @Validate(IsTimeConstraint, { message: 'openingTime must be a valid time' })
  @ApiProperty()
  openingTime: string;

  @IsNotEmpty()
  @Validate(IsTimeConstraint, { message: 'closingTime must be a valid time' })
  @ApiProperty()
  closingTime: string;

  @IsNotEmpty({ message: 'type is required' })
  @IsString({ message: 'type must be a string' })
  @ApiProperty()
  type: string;

  @IsNotEmpty({ message: 'isActive is required' })
  @IsBoolean({ message: 'isActive must be a boolean' })
  @ApiProperty()
  isActive: boolean;
}
