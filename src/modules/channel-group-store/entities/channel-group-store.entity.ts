import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Channel } from '@modules/channel/entities/channel.entity';
import { Group } from '@modules/group/entities/group.entity';
import { Store } from '@modules/store/entities/store.entity';

@Entity('ChannelGroupStore')
export class ChannelGroupStore {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  channelId: number;

  @Column({ type: 'int' })
  groupId: number;

  @Column({ type: 'int' })
  storeId: number;

  @Column({ type: 'tinyint', default: 0 })
  isActive: boolean;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'int' })
  createdBy: number;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updatedAt: Date;

  @Column({ type: 'int', nullable: true })
  updatedBy: number;

  @ManyToOne(() => Channel, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'channelId' })
  channel: Channel;

  @ManyToOne(() => Group, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'groupId' })
  group: Group;

  @ManyToOne(() => Store, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'storeId' })
  store: Store;
}
