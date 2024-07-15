import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum, IsString } from 'class-validator';
import { FaqCategory } from '../entities/resto365-faq.entity';
export class CreateResto365FaqDto {
  @ApiProperty({
    type: String,
    example: 'How to create a new restaurant?',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

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
  @IsNotEmpty()
  @IsEnum([
    'Restaurants',
    'Menu',
    'GuestExperience',
    'Marketing',
    'Operations',
    'UserAccess',
  ])
  category: FaqCategory;

  @ApiProperty({
    type: String,
    example: 'https://example.com/document.pdf',
  })
  @IsNotEmpty()
  @IsString()
  documentUrl: string;
}
