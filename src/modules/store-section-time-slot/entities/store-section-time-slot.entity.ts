import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Store } from '@modules/store/entities/store.entity';
import { Section } from '@modules/section/entities/section.entity';
import { StoreSectionTimeSlotOverride } from '@modules/store-section-time-slot-override/entities/store-section-time-slot-override.entity';
import { BhyveAuditEntity } from 'src/shared/audit.entity';
import { AuditLog } from 'src/shared/audit-logs.types';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';
import { UUID } from 'crypto';

@Entity('StoreSectionTimeSlot')
@Index('sectionId', ['sectionId'])
@Index('DayofWeek_OpeningTime_IsActive', [
  'dayOfWeek',
  'openingTime',
  'isActive',
])
@Index('storeId_dayOfWeek_openingTime_closingTime_index', [
  'storeId',
  'dayOfWeek',
  'openingTime',
  'closingTime',
])
export class StoreSectionTimeSlot extends BhyveAuditEntity implements AuditLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  storeId: number;

  @ManyToOne(() => Store)
  @JoinColumn({ name: 'storeId' })
  store: Store;

  @Column()
  sectionId: number;

  @ManyToOne(() => Section)
  @JoinColumn({ name: 'sectionId' })
  section: Section;

  @Column({ nullable: true })
  dayOfWeek: number;

  @Column({ nullable: true })
  openingTime: string;

  @Column({ nullable: true })
  closingTime: string;

  @Column()
  type: string;

  @Column({ nullable: true })
  isActive: boolean;

  @OneToMany(
    () => StoreSectionTimeSlotOverride,
    (override) => override.storeSectionTimeSlot,
  )
  overrides: StoreSectionTimeSlotOverride[];

  _metadata: { auditUser: Resto365User; correlationId: UUID };
}
