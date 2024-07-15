import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Store } from '@modules/store/entities/store.entity';
import { BhyveAuditEntity } from 'src/shared/audit.entity';
import { AuditLog } from 'src/shared/audit-logs.types';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';
import { UUID } from 'crypto';

@Entity({ name: 'StoreOrderOffsetOverride' })
export class StoreOrderOffsetOverride
  extends BhyveAuditEntity
  implements AuditLog
{
  @PrimaryColumn()
  id: string;

  @Column({ type: 'int' })
  storeId: number;

  @Column({ type: 'time' })
  startTime: string;

  @Column({ type: 'time' })
  endTime: string;

  @Column({ type: 'int' })
  dayOfWeek: number;

  @Column({ type: 'timestamp', nullable: true })
  effectiveFrom: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  effectiveTo: Date | null;

  @Column({ type: 'int' })
  value: number;

  @Column({ type: 'int', nullable: true })
  offset: number | null;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @ManyToOne(() => Store)
  @JoinColumn()
  store: Store;

  _metadata: { auditUser: Resto365User; correlationId: UUID };
}
