import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsEnum,
  IsNumber,
  IsString,
  IsOptional,
} from 'class-validator';
import { Brand, Warranty } from '../entities/resto365-equipment.entity';

export class CreateResto365EquipmentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  equipmentCategoryId: number;

  @ApiProperty({
    type: 'string',
    example: 'Electric Kettle',
    description: 'Name of equipment',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  equipment: string;

  @ApiProperty({
    type: 'number',
    example: 1,
    description: 'Supplier ID of equipment',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  supplierId: number;

  @ApiProperty({
    type: 'enum',
    enum: Brand,
    example: Brand.HennyPenny,
    description: 'Brand of equipment',
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(Brand)
  brand: Brand;

  @ApiProperty({
    type: 'string',
    example: 'Model 123',
    description: 'Model of equipment',
    required: false,
  })
  @IsString()
  @IsOptional()
  model?: string;

  @ApiProperty({
    type: 'string',
    example: 'Electric Kettle',
    description: 'Description of equipment',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    type: 'number',
    example: 5,
    description: 'Quantity of equipment',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty({
    type: 'enum',
    enum: Warranty,
    example: Warranty.OneYear,
    description: 'Warranty of equipment',
    required: true,
  })
  @IsEnum(Warranty)
  @IsNotEmpty()
  warranty: Warranty;

  @ApiProperty({
    type: 'date',
    example: '2021-09-01T00:00:00.000Z',
    description: 'Purchase date of equipment',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  purchaseDate: Date;

  @ApiProperty({
    type: 'date',
    example: '2021-09-01T00:00:00.000Z',
    description: 'Last service date of equipment',
    required: false,
  })
  @IsOptional()
  @IsString()
  lastServiceDate?: Date;

  @ApiProperty({
    type: 'date',
    example: '2021-09-01T00:00:00.000Z',
    description: 'Next service date of equipment',
    required: false,
  })
  @IsOptional()
  @IsString()
  nextServiceDate?: Date;

  @ApiProperty({
    type: 'string',
    example: '1 month',
    description: 'Service period of equipment',
    required: false,
  })
  @IsString()
  @IsOptional()
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

  @ApiProperty({
    type: 'number',
    example: 1,
    description: 'Restaurant ID of equipment',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  restaurantId: number;
}
