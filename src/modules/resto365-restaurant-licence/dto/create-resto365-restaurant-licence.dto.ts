import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsString,
  Min,
  IsNumber,
} from 'class-validator';
export class CreateResto365RestaurantLicenceDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  licenceName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  licenceNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  issueDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  expiryDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  renewalNoticePeriodInDays: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  comments: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  restaurantId: number;
}
