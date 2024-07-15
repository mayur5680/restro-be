// Import necessary modules from TypeORM
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

// Import related entities
import { ChannelGroup } from '@modules/channel-group/entities/channel-group.entity';
import { MenuTemplate } from '@modules/menu-template/entities/menu-template.entity';

// Define the ChannelGroupMenuTemplate entity
@Entity('ChannelGroupMenuTemplate')
export class ChannelGroupMenuTemplate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  channelGroupId: number;

  @Column()
  menuTemplateId: number;

  @Column({ nullable: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  createdBy: number;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @Column({ nullable: true })
  updatedBy: number;

  // Define relationships with ChannelGroup and MenuTemplate entities
  @ManyToOne(() => ChannelGroup, (channelGroup) => channelGroup.id)
  @JoinColumn({ name: 'channelGroupId' })
  channelGroup: ChannelGroup;

  @ManyToOne(() => MenuTemplate, (menuTemplate) => menuTemplate.id)
  @JoinColumn({ name: 'menuTemplateId' })
  menuTemplate: MenuTemplate;
}
