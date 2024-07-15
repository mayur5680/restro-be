import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { contactType } from '../entities/resto365-equipment-supplier-contact.entity';

export class CreateResto365EquipmentSupplierContactDto {
  @ApiProperty({
    type: 'string',
    example: 'john doe',
    description: 'Name of equipment supplier contact',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: 'enum',
    enum: contactType,
    example: 'Service Contact',
    description: 'Contact Type of equipment supplier contact',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  contactType: contactType;

  @ApiProperty({
    type: 'string',
    example: '1234567890',
    description: 'Contact number of equipment supplier contact',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  contactNumber: string;

  @ApiProperty({
    type: 'string',
    example: 'test@test.com',
    description: 'Contact email of equipment supplier contact',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  contactEmail: string;

  @ApiProperty({
    type: 'string',
    example: '1234567890',
    description: 'Alternate contact number of equipment supplier contact',
    required: true,
  })
  @IsString()
  @IsOptional()
  alternateContactNumber?: string;

  @ApiProperty({
    type: 'number',
    example: 1,
    description: 'Supplier ID of equipment supplier contact',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  supplierId: number;
}
