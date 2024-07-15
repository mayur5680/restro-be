import { ChannelGroup } from '@modules/channel-group/entities/channel-group.entity';
import { GroupStore } from '@modules/group-store/entities/group-store.entity';
import { Store } from '@modules/store/entities/store.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

enum GroupType {
  MENU = 'MENU',
  OFFER = 'OFFER',
}

@Entity('Group')
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150, nullable: false })
  name: string;

  @Column({ length: 250, nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: GroupType,
    default: GroupType.MENU,
    nullable: true,
  })
  groupType: GroupType;

  @Column({ type: 'tinyint', nullable: true })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'int', nullable: false })
  createdBy: number;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  @Column({ type: 'int', nullable: true })
  updatedBy: number;

  @OneToMany(() => ChannelGroup, (channelGroup) => channelGroup.groupId)
  public channelGroup?: ChannelGroup[];

  @OneToMany(() => GroupStore, (groupStore) => groupStore.groupId)
  public groupStore?: GroupStore[];

  @ManyToMany(() => Store, (store) => store.groupStore)
  @JoinTable({ name: 'GroupStore' })
  store?: Store[];
}
