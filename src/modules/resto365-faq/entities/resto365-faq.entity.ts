import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';
import { Resto365AuditEntity } from 'src/shared/audit.entity';
import { AuditLog } from 'src/shared/audit-logs.types';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UUID } from 'crypto';

export enum FaqCategory {
  Restaurants = 'Restaurants',
  Menu = 'Menu',
  GuestExperience = 'GuestExperience',
  Marketing = 'Marketing',
  Operations = 'Operations',
  UserAccess = 'UserAccess',
}

@Entity('Faq')
@Index(['title'], { unique: true })
export class Resto365Faq extends Resto365AuditEntity implements AuditLog {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  title: string;

  @Column({ type: 'enum', enum: FaqCategory })
  category: FaqCategory;

  @Column({
    type: 'text',
  })
  documentUrl: string;

  @ManyToOne(() => Resto365User)
  @JoinColumn({ name: 'createdBy' })
  user: Resto365User;

  _metadata: { auditUser: Resto365User; correlationId: UUID };
}
