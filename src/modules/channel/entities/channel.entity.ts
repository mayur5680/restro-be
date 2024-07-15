// Import necessary modules from TypeORM
import { ChannelGroupMenuTemplate } from '@modules/channel-group-menu-template/entities/channel-group-menu-template.entity';
import { ChannelGroup } from '@modules/channel-group/entities/channel-group.entity';
import { Group } from '@modules/group/entities/group.entity';
import { Store } from '@modules/store/entities/store.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  OneToMany,
  JoinTable,
} from 'typeorm';

// Define the Channel entity
@Entity('Channel')
export class Channel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150, nullable: false })
  name: string;

  @Column({ length: 250, nullable: true })
  description: string;

  @Column({ length: 255, nullable: true })
  type: string;

  @Column({ length: 255, nullable: true })
  link: string;

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

  @OneToMany(() => ChannelGroup, (channelGroup) => channelGroup.channelId)
  public channelGroup?: ChannelGroup[];

  @ManyToMany(() => Group, (group) => group.channelGroup)
  @JoinTable({ name: 'ChannelGroup' })
  group?: Group[];

  @ManyToMany(
    () => ChannelGroupMenuTemplate,
    (channelGroupMenuTemplate) => channelGroupMenuTemplate.channelGroup,
  )
  @JoinTable({ name: 'ChannelGroup' })
  channelGroupMenuTemplate?: ChannelGroupMenuTemplate[];

  @ManyToMany(() => Store, (store) => store.channelGroupStore)
  @JoinTable({ name: 'ChannelGroupStore' })
  store?: Store[];
}
