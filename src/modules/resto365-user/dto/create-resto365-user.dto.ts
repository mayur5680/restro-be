import { IsString, IsEmail, IsOptional, IsIn, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CountryCode } from '@modules/resto365-country/types';

export class CreateResto365UserDto {
  @IsString()
  @ApiProperty({ description: 'The Okta ID of the user', example: '12345678' })
  oktaId: string;

  @IsEmail()
  @ApiProperty({
    description: 'The email address of the user',
    example: 'user@example.com',
  })
  email: string;

  @IsString()
  @ApiProperty({
    description: 'The full name of the user',
    example: 'John Doe',
  })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'The department of the user',
    example: 'Digital IT',
    required: false,
  })
  department?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'The phone number of the user',
    example: '+1234567890',
    required: false,
  })
  phone?: string;

  @IsIn(['au', 'us'], { each: true })
  @ApiProperty({
    description: 'The countries the is assigned to',
    example: ['au', 'au'],
  })
  countries: CountryCode[];

  @ApiProperty({
    description: 'The area id the user is assigned to',
    example: 1,
  })
  @IsOptional()
  areaId: number | null;

  @ApiProperty({
    description: 'The restaurant ids the user is assigned to',
    example: [1, 2],
  })
  restaurantIds: number[];

  @IsNumber()
  @ApiProperty({ description: 'The role ID of the user', example: 1 })
  roleId: number;
}
