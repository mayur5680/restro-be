// Import necessary modules from TypeORM
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

// Import related entities if needed
import { Channel } from '@modules/channel/entities/channel.entity';
import { Group } from '@modules/group/entities/group.entity';
import { ChannelGroupMenuTemplate } from '@modules/channel-group-menu-template/entities/channel-group-menu-template.entity';
import { MenuTemplate } from '@modules/menu-template/entities/menu-template.entity';

// Define the ChannelGroup entity
@Entity('ChannelGroup')
export class ChannelGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  channelId: number;

  @Column()
  groupId: number;

  @Column({ nullable: true })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column()
  createdBy: number;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  @Column({ nullable: true })
  updatedBy: number;

  // Define relationships
  @ManyToOne(() => Channel, (channel) => channel.id)
  @JoinColumn({ name: 'channelId' })
  channel: Channel;

  @ManyToOne(() => Group, (group) => group.id)
  @JoinColumn({ name: 'groupId' })
  group: Group;

  @OneToMany(
    () => ChannelGroupMenuTemplate,
    (channelGroupMenuTemplate) => channelGroupMenuTemplate.channelGroup,
  )
  public channelGroupMenuTemplate?: ChannelGroupMenuTemplate[];

  @ManyToMany(
    () => MenuTemplate,
    (menuTemplate) => menuTemplate.channelGroupMenuTemplate,
  )
  @JoinTable({ name: 'ChannelGroupMenuTemplate' })
  public menuTemplate?: MenuTemplate[];
}
