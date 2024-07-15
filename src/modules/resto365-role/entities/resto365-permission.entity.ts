import { Action, Subject } from '@modules/auth/types';
import { Resto365AuditEntity } from 'src/shared';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Resto365Role } from './resto365-role.entity';

@Entity({ name: 'Permission' })
export class Resto365Permission extends Resto365AuditEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  subject: Subject;

  @Column({ nullable: false })
  action: Action;

  @ManyToOne(() => Resto365Role, (role) => role.permissions)
  role: Resto365Role;
}
