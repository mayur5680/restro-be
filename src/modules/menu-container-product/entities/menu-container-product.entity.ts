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
import { MenuContainer } from '@modules/menu-container/entities/menu-container.entity';
import { MenuContainerProductAttributes } from '@modules/menu-container-product-attribute/entities/menu-container-product-attribute.entity';
import { MenuContainerProductOverride } from '@modules/menu-container-product-override/entities/menu-container-product-override.entity';

@Entity('MenuContainerProduct')
export class MenuContainerProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150, nullable: false })
  name: string;

  @Column({ length: 350, nullable: true })
  description: string;

  @Column()
  containerId: number;

  @Column()
  parentProductId: number;

  @ManyToOne(() => MenuContainer)
  @JoinColumn({ name: 'containerId' })
  container: MenuContainer;

  @ManyToOne(() => MenuContainerProduct, { nullable: true })
  @JoinColumn({ name: 'parentProductId' })
  parentProduct: MenuContainerProduct;

  @Column({ nullable: true })
  posPlu: number;

  @Column({ nullable: true })
  posMenuId: number;

  @Column({ nullable: true })
  posMenuFlowId: number;

  @Column({ length: 3, nullable: true })
  productType: string;

  @Column({ length: 1, nullable: true })
  partType: string;

  @Column({ length: 1, nullable: true })
  actionType: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  price: number;

  @Column({ length: 50, nullable: true })
  kilojoules: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  imageTop: string;

  @Column({ nullable: true })
  imageAngle: string;

  @Column({
    default: 1,
    comment: 'DisplayOrder to support ordering at client side',
  })
  displayOrder: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  createdBy: number;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @Column({ nullable: true })
  updatedBy: number;

  @OneToMany(
    () => MenuContainerProductAttributes,
    (menuContainerProductAttributes) =>
      menuContainerProductAttributes.menuContainerProduct,
  )
  menuContainerProductAttributes: MenuContainerProductAttributes[];

  @OneToMany(
    () => MenuContainerProductOverride,
    (menuContainerProductOverride) =>
      menuContainerProductOverride.menuContainerProduct,
  )
  menuContainerProductOverride: MenuContainerProductOverride[];
}
