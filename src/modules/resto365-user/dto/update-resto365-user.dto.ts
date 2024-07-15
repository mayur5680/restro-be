import { PartialType } from '@nestjs/mapped-types';
import { CreateResto365UserDto } from './create-resto365-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UpdateResto365UserDto extends PartialType(CreateResto365UserDto) {
  @IsNumber()
  @ApiProperty({ description: 'The id of the user', example: 1 })
  id: number;
}
