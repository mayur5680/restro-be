import { IsNumber, IsString } from 'class-validator';

export class CreateResto365CerebroProductCompanyOverrideDto {
  @IsNumber()
  restaurantId: number;

  @IsNumber()
  cerebroProductCompanyId: number;

  @IsString()
  status: string;
}
