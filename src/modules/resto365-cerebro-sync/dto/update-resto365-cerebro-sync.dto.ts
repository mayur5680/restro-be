import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsInt, IsNotEmpty } from 'class-validator';

export class UpdateResto365CerebroSyncDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  updatedBy: number;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  syncDate: Date;
}
