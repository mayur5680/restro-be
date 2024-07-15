import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateResto365CerebroSyncDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  syncDate: Date;
}
