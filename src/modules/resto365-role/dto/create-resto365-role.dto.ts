import { Permissions } from '@modules/auth/types';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateResto365RoleDto {
  @Expose()
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @Expose()
  @ApiProperty()
  @IsNotEmpty()
  permissions: Permissions;
}
