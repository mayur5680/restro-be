import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsEnum, IsString } from 'class-validator';
import { FaqCategory } from '../entities/resto365-faq.entity';

export class UpdateResto365FaqDto {
  @ApiProperty({
    type: String,
    example: 'How to create a new restaurant?',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    type: String,
    example: 'Restaurants',
    enum: [
      'Restaurants',
      'Menu',
      'GuestExperience',
      'Marketing',
      'Operations',
      'UserAccess',
    ],
  })
  @IsOptional()
  @IsEnum([
    'Restaurants',
    'Menu',
    'GuestExperience',
    'Marketing',
    'Operations',
    'UserAccess',
  ])
  category?: FaqCategory;

  @ApiProperty({
    type: String,
    example: 'https://example.com/document.pdf',
  })
  @IsOptional()
  @IsString()
  documentUrl?: string;
}
