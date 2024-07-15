import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Scope } from './entities/resto365-role.entity';

export class Resto365RoleResponseDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  scope: Scope;

  @Expose()
  @ApiProperty()
  isCustomRole: boolean;
}
