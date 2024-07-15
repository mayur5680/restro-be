import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Group } from '@modules/group/entities/group.entity';
import { Channel } from '@modules/channel/entities/channel.entity';
import { Store } from '@modules/store/entities/store.entity';
import { MenuTemplate } from '@modules/menu-template/entities/menu-template.entity';
import { Section } from '@modules/section/entities/section.entity';
import { BhyveAuditEntity } from 'src/shared';

@Entity('MenuTemplateSectionOverride')
@Index('groupId', ['groupId'])
@Index('channelId', ['channelId'])
@Index('storeId', ['storeId'])
@Index('sectionId', ['sectionId'])
export class MenuTemplateSectionOverride extends BhyveAuditEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  groupId: number;

  @Column({ nullable: true })
  channelId: number;

  @Column({ nullable: true })
  storeId: number;

  @Column()
  sectionId: number;

  @Column({ nullable: true })
  menuTemplateId: number;

  @ManyToOne(() => MenuTemplate, (menuTemplate) => menuTemplate.id)
  @JoinColumn({ name: 'menuTemplateId' })
  menuTemplate: MenuTemplate;

  @ManyToOne(() => Section, (section) => section.id)
  @JoinColumn({ name: 'sectionId' })
  section: Section;

  @Column({ length: 150, nullable: true })
  name: string;

  @Column({ length: 250, nullable: true })
  description: string;

  @Column({ length: 255, nullable: true })
  status: string;

  @Column({ default: 1 })
  displayOrder: number;

  @ManyToOne(() => Group, (group) => group.id)
  @JoinColumn({ name: 'groupId' })
  group: Group;

  @ManyToOne(() => Channel, (channel) => channel.id)
  @JoinColumn({ name: 'channelId' })
  channel: Channel;

  @ManyToOne(() => Store, (store) => store.id)
  @JoinColumn({ name: 'storeId' })
  store: Store;
}
