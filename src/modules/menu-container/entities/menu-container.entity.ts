import { MenuContainerAttributes } from '@modules/menu-container-attributes/entities/menu-container-attribute.entity';
import { MenuContainerOverride } from '@modules/menu-container-override/entities/menu-container-override.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity('MenuContainer')
export class MenuContainer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150, nullable: false })
  name: string;

  @Column({ length: 250, nullable: true })
  description: string;

  @Column({ nullable: true })
  parentContainerId: number;

  @ManyToOne(() => MenuContainer, (parentContainer) => parentContainer.id)
  @JoinColumn({ name: 'parentContainerId' })
  parentContainer: MenuContainer;

  @Column({ length: 3, nullable: true })
  containerType: string;

  @Column({ nullable: true })
  posPlu: number;

  @Column({ nullable: true })
  posPageNo: number;

  @Column({ nullable: true })
  posMenuId: number;

  @Column({ nullable: true })
  posMenuFlowId: number;

  @Column({ length: 1000, nullable: true })
  image: string;

  @Column({
    length: 255,
    nullable: true,
    comment: 'imageTop to support additional image fields',
  })
  imageTop: string;

  @Column({
    length: 255,
    nullable: true,
    comment: 'imageAngle to support additional image fields',
  })
  imageAngle: string;

  @Column({ default: false })
  isCommonContainer: boolean;

  @Column({ nullable: true })
  isActive: boolean;

  @Column({
    default: 1,
    comment: 'DisplayOrder to support ordering at client side',
  })
  displayOrder: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  price: number;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column()
  createdBy: number;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @Column({ nullable: true })
  updatedBy: number;

  @OneToMany(
    () => MenuContainerAttributes,
    (menuContainerAttributes) => menuContainerAttributes.menuContainer,
  )
  menuContainerAttributes: MenuContainerAttributes[];

  @OneToMany(
    () => MenuContainerOverride,
    (menuContainerOverride) => menuContainerOverride.menuContainer,
  )
  menuContainerOverride: MenuContainerOverride[];
}
