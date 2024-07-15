import { PartialType } from '@nestjs/mapped-types';
import { CreateResto365RoleDto } from './create-resto365-role.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Permissions } from '@modules/auth/types';

export class UpdateResto365RoleDto extends PartialType(CreateResto365RoleDto) {
  @Expose()
  @ApiProperty()
  permissions: Permissions;
}
