import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Store } from '@modules/store/entities/store.entity';
import { Channel } from '@modules/channel/entities/channel.entity';

@Entity('StoreChannel')
@Index('channelId_deletedAt_isActive_index', [
  'channelId',
  'deletedAt',
  'isActive',
])
export class StoreChannel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  storeId: number;

  @Column({ type: 'int' })
  channelId: number;

  @Column({ type: 'tinyint', default: 0 })
  isActive: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'varchar', length: 255 })
  createdBy: string;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  updatedBy: string | null;

  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deletedAt: Date | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  deletedBy: string | null;

  @ManyToOne(() => Store)
  @JoinColumn({ name: 'storeId' })
  store: Store;

  @ManyToOne(() => Channel)
  @JoinColumn({ name: 'channelId' })
  channel: Channel;
}
