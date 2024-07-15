import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsInt, IsString, Min, IsNumber } from 'class-validator';

export class UpdateResto365RestaurantLicenceDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  licenceName?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  licenceNumber?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  issueDate?: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  expiryDate?: Date;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Min(1)
  renewalNoticePeriodInDays?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  comments?: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  restaurantId?: number;
}
