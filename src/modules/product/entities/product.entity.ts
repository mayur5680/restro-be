import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('MenuContainerProduct')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 350, nullable: true })
  description: string;

  @Column({ type: 'int' })
  containerId: number;

  @Column({ type: 'int' })
  parentProductId: number;

  @Column({ type: 'int' })
  posPlu: number;

  @Column({ type: 'int' })
  posMenuId: number;

  @Column({ type: 'int' })
  posMenuFlowId: number;

  @Column({ type: 'varchar', length: 3 })
  productType: string;

  @Column({ type: 'varchar', length: 1 })
  partType: string;

  @Column({ type: 'varchar', length: 1 })
  actionType: string;

  @Column({ type: 'decimal' })
  price: number;

  @Column({ type: 'varchar', length: 50 })
  kilojoules: string;

  @Column({ type: 'tinyint' })
  isActive: boolean;

  @Column({ type: 'int' })
  displayOrder: number;

  @Column({ type: 'varchar', length: 255 })
  image: string;

  @Column({ type: 'varchar', length: 255 })
  imageTop: string;

  @Column({ type: 'varchar', length: 255 })
  imageAngle: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'int' })
  createdBy: number;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @Column({ type: 'int', nullable: true })
  updatedBy: number;
}
