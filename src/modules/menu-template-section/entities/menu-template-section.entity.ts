import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { MenuTemplate } from '@modules/menu-template/entities/menu-template.entity';
import { Section } from '@modules/section/entities/section.entity';

@Entity('MenuTemplateSection')
export class MenuTemplateSection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  menuTemplateId: number;

  @Column()
  sectionId: number;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @Column()
  createdBy: number;

  @UpdateDateColumn({ name: 'updatedAt', nullable: true })
  updatedAt: Date;

  @Column({ nullable: true })
  updatedBy: number;

  @ManyToOne(() => MenuTemplate, (menuTemplate) => menuTemplate.id)
  @JoinColumn({ name: 'menuTemplateId' })
  menuTemplate: MenuTemplate;

  @ManyToOne(() => Section, (section) => section.id)
  @JoinColumn({ name: 'sectionId' })
  section: Section;
}
