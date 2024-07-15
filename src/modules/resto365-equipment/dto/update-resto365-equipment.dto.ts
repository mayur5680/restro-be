import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsEnum, IsString, IsNumber } from 'class-validator';
import { Brand, Warranty } from '../entities/resto365-equipment.entity';

export class UpdateResto365EquipmentDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  equipmentCategoryId: number;
  @ApiProperty({
    type: 'string',
    example: 'Electric Kettle',
    description: 'Name of equipment',
    required: false,
  })
  @IsOptional()
  @IsString()
  equipment?: string;

  @ApiProperty({
    type: 'number',
    example: 1,
    description: 'Supplier ID of equipment',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  supplierId?: number;

  @ApiProperty({
    type: 'enum',
    enum: Brand,
    example: Brand.HennyPenny,
    description: 'Brand of equipment',
    required: false,
  })
  @IsOptional()
  @IsEnum(Brand)
  brand?: Brand;

  @ApiProperty({
    type: 'string',
    example: 'Model 123',
    description: 'Model of equipment',
    required: false,
  })
  @IsOptional()
  @IsString()
  model?: string;

  @ApiProperty({
    type: 'string',
    example: 'Electric Kettle',
    description: 'Description of equipment',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    type: 'number',
    example: 10,
    description: 'Quantity of equipment',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  quantity?: number;

  @ApiProperty({
    type: 'enum',
    enum: Warranty,
    example: Warranty.OneYear,
    description: 'Warranty of equipment',
    required: false,
  })
  @IsOptional()
  @IsEnum(Warranty)
  warranty?: Warranty;

  @ApiProperty({
    type: 'date',
    example: '2021-01-01',
    description: 'Purchase date of equipment',
    required: false,
  })
  @IsOptional()
  @IsString()
  purchaseDate?: Date;

  @ApiProperty({
    type: 'date',
    example: '2021-01-01',
    description: 'Last service date of equipment',
    required: false,
  })
  @IsOptional()
  @IsString()
  lastServiceDate?: Date;

  @ApiProperty({
    type: 'date',
    example: '2021-01-01',
    description: 'Next service date of equipment',
    required: false,
  })
  @IsOptional()
  @IsString()
  nextServiceDate?: Date;

  @ApiProperty({
    type: 'string',
    example: '1 year',
    description: 'Service period of equipment',
    required: false,
  })
  @IsOptional()
  @IsString()
  servicePeriod?: string;

  @ApiProperty({
    type: 'text',
    example: 'This is a comment',
    description: 'Comments of equipment',
    required: false,
  })
  @IsOptional()
  @IsString()
  comments?: string;
}
