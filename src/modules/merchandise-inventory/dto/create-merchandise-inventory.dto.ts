import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMerchandiseInventoryDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  merchandiseId: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  storeId: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  soh: number;

  @ApiProperty()
  @IsOptional()
  isActive?: boolean;
}
