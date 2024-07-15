import { PermissionArg } from '@modules/auth/AclDecorator';
import { Permissions } from '@modules/auth/types';
import { Resto365Area } from '@modules/resto365-area/entities/resto365-area.entity';
import { Resto365Country } from '@modules/resto365-country/entities/resto365-country.entity';
import { Resto365Restaurant } from '@modules/resto365-restaurant/entities/resto365-restaurant.entity';
import { Resto365Role } from '@modules/resto365-role/entities/resto365-role.entity';
import { UUID } from 'crypto';
import { AuditLog } from 'src/shared/audit-logs.types';
import { Resto365AuditEntity } from 'src/shared/audit.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'User' })
export class Resto365User extends Resto365AuditEntity implements AuditLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  oktaId: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  /* TODO: Should be an enum */
  @Column({ nullable: true })
  department: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: false })
  roleId: number;

  @ManyToOne(() => Resto365Role)
  @JoinColumn({ name: 'roleId' })
  role: Resto365Role;

  @ManyToMany(() => Resto365Country)
  @JoinTable()
  countries: Resto365Country[];

  @ManyToMany(() => Resto365Area)
  @JoinTable()
  areas: Resto365Area[];

  @ManyToMany(() => Resto365Restaurant)
  @JoinTable()
  restaurants: Resto365Restaurant[];

  get roleName() {
    return this.role.name;
  }

  permissions: Permissions;

  hasPermission(permission: PermissionArg) {
    const [action, subject] = permission.split(':');
    return this.permissions[subject]?.includes(action) ?? false;
  }

  _metadata: {
    auditUser: Resto365User;
    correlationId: UUID;
  };
}
