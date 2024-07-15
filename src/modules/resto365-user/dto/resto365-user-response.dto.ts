import { Permissions } from '@modules/auth/types';
import { Resto365RoleResponseDto } from '@modules/resto365-role/resto365-role.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export interface RestoUser {
  id: string;
  email: string;
  name: string;
  phone: string;
  department: string;
  role: string;
  permissions?: string[];
}

export class Resto365UserResponseDTO {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  email: string;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  phone: string;

  @Expose()
  @ApiProperty()
  department: string;

  @Expose()
  @ApiProperty()
  role: Resto365RoleResponseDto;

  @Expose()
  @ApiProperty()
  permissions: Permissions;

  @Expose()
  @ApiProperty()
  assignedCountries: { id: number; name: string }[];

  @Expose()
  @ApiProperty()
  assignedAreas: { id: number; name: string }[];

  @Expose()
  @ApiProperty()
  assignedRestaurants: { id: number; name: string }[];
}
