import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Resto365AuditEntity } from 'src/shared/audit.entity';
import { Resto365Permission } from './resto365-permission.entity';
import { AuditLog } from 'src/shared/audit-logs.types';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';
import { UUID } from 'crypto';

export enum Scope {
  Country = 'country',
  Area = 'area',
  Restaurant = 'restaurant',
}
@Entity({ name: 'Role' })
export class Resto365Role extends Resto365AuditEntity implements AuditLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({
    nullable: false,
    default: false,
  })
  isCustomRole: boolean;

  @Column({
    nullable: false,
  })
  scope: Scope;

  @OneToMany(() => Resto365Permission, (permission) => permission.role, {
    cascade: true,
  })
  permissions: Resto365Permission[];

  _metadata: {
    auditUser: Resto365User;
    correlationId: UUID;
  };
}
