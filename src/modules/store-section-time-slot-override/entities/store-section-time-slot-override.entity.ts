import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { StoreSectionTimeSlot } from '@modules/store-section-time-slot/entities/store-section-time-slot.entity';
import { IsNotEmpty } from 'class-validator';
import { BhyveAuditEntity } from 'src/shared/audit.entity';
import { AuditLog } from 'src/shared/audit-logs.types';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';
import { UUID } from 'crypto';

@Entity('StoreSectionTimeSlotOverride')
@Unique([
  'storeSectionTimeSlotId',
  'openingTime',
  'closingTime',
  'effectiveFrom',
  'effectiveTo',
  'reasonForOverride',
  'storeStatus',
])
export class StoreSectionTimeSlotOverride
  extends BhyveAuditEntity
  implements AuditLog
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  storeSectionTimeSlotId: number;

  @ManyToOne(() => StoreSectionTimeSlot)
  @JoinColumn({ name: 'storeSectionTimeSlotId' })
  storeSectionTimeSlot: StoreSectionTimeSlot;

  @Column({ type: 'time', nullable: true })
  openingTime: string;

  @Column({ type: 'time', nullable: true })
  closingTime: string;

  @IsNotEmpty()
  @Column({ type: 'datetime' })
  effectiveFrom: Date;

  @IsNotEmpty()
  @Column({ type: 'datetime' })
  effectiveTo: Date;

  @Column({ type: 'varchar', length: 250 })
  reasonForOverride: string;

  @Column({ type: 'enum', enum: ['OPEN', 'CLOSE'], default: 'OPEN' })
  storeStatus: 'OPEN' | 'CLOSE';

  _metadata: { auditUser: Resto365User; correlationId: UUID };
}
