import { ChannelGroupMenuTemplate } from '@modules/channel-group-menu-template/entities/channel-group-menu-template.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('MenuTemplate')
export class MenuTemplate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: true })
  posMenuId: number;

  @Column({ length: 150, nullable: false })
  name: string;

  @Column({ length: 250, nullable: true })
  description: string;

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

  @OneToMany(
    () => ChannelGroupMenuTemplate,
    (channelGroupMenuTemplate) => channelGroupMenuTemplate.menuTemplate,
  )
  public channelGroupMenuTemplate?: ChannelGroupMenuTemplate[];
}
