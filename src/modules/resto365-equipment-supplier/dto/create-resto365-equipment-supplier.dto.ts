import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateResto365EquipmentSupplierDto {
  @ApiProperty({
    type: 'string',
    example: 'ABC Supplier',
    description: 'Name of supplier',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
