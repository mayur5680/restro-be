import { Merchandise } from '@modules/merchandise/entities/merchandise.entity';
import { Store } from '@modules/store/entities/store.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('MerchandiseInventory')
export class MerchandiseInventory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  merchandiseId: number;

  @Column({ nullable: false })
  storeId: number;

  @Column({ nullable: false })
  soh: number;

  @Column({ type: 'tinyint' })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'int' })
  createdBy: number;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @Column({ type: 'int', nullable: true })
  updatedBy: number;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @OneToOne(() => Store)
  @JoinColumn()
  store: Store;

  @OneToOne(() => Merchandise)
  @JoinColumn()
  merchandise: Merchandise;
}
