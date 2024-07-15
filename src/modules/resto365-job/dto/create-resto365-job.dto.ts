import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateResto365JobDto {
  @IsNotEmpty()
  @IsNumber()
  jobId: number;

  @IsNotEmpty()
  @IsNumber()
  restaurantId: number;

  @IsNotEmpty()
  @IsNumber()
  channelId: number;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  request: string;
}
