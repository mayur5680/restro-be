import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';
import { UUID } from 'crypto';
import { AuditLog } from 'src/shared/audit-logs.types';
import { BhyveAuditEntity } from 'src/shared/audit.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('StoreOrderOffset')
@Index(['storeId', 'isActive'])
export class StoreOrderOffset extends BhyveAuditEntity implements AuditLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: true })
  storeId: number;

  @Column({ type: 'int', nullable: true })
  value: number;

  @Column({ type: 'int', nullable: true })
  offset: number;

  @Column({ type: 'tinyint', nullable: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'int' })
  createdBy: number;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @Column({ type: 'int', nullable: true })
  updatedBy: number;

  _metadata: { auditUser: Resto365User; correlationId: UUID };
}
