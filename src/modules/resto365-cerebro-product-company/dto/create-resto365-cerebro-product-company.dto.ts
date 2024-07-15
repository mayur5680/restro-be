import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsInt, IsString } from 'class-validator';

export class CreateResto365CerebroProductCompanyDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  productId: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  productName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  productNameNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  categoryPk: number;
}
