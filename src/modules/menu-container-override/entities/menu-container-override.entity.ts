import { MenuContainer } from '@modules/menu-container/entities/menu-container.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('MenuContainerOverride')
export class MenuContainerOverride {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  groupId: number;

  @Column({ nullable: true })
  channelId: number;

  @Column({ nullable: true })
  storeId: number;

  @Column({ nullable: true })
  menuTemplateId: number;

  @Column({ nullable: true })
  menuContainerPosPlu: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  price: number;

  @Column({ nullable: true })
  posMenuId: number;

  @Column({ length: 150, nullable: true })
  name: string;

  @Column({ length: 350, nullable: true })
  description: string;

  @Column({ length: 1000, nullable: true })
  image: string;

  @Column({ length: 255, nullable: true })
  status: string;

  @Column({ name: 'imageTop', length: 255, nullable: true })
  imageTop: string;

  @Column({ name: 'imageAngle', length: 255, nullable: true })
  imageAngle: string;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @Column()
  createdBy: number;

  @UpdateDateColumn({ name: 'updatedAt', nullable: true })
  updatedAt: Date;

  @Column({ nullable: true })
  updatedBy: number;

  @ManyToOne(() => MenuContainer)
  @JoinColumn({ name: 'menuContainerPosPlu', referencedColumnName: 'posPlu' })
  menuContainer: MenuContainer;
}
