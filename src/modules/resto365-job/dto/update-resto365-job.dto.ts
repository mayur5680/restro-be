import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateResto365JobDto {
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  status: string;
}
