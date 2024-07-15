import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { MenuTemplateSection } from '@modules/menu-template-section/entities/menu-template-section.entity';
import { MenuContainer } from '@modules/menu-container/entities/menu-container.entity';
import { BhyveAuditEntity } from 'src/shared';

@Entity()
export class MenuTemplateSectionContainer extends BhyveAuditEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  menuTemplateSectionId: number;

  @Column({ nullable: true })
  menuContainerPosPlu: number;

  @Column({ nullable: true })
  isActive: boolean;

  @ManyToOne(() => MenuTemplateSection, { eager: true })
  @JoinColumn({ name: 'menuTemplateSectionId' })
  menuTemplateSection: MenuTemplateSection;

  @ManyToOne(() => MenuContainer, { eager: true })
  @JoinColumn({ name: 'menuContainerPosPlu' })
  container: MenuContainer;
}
