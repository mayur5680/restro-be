import { Store } from '@modules/store/entities/store.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('StoreSurcharge')
export class StoreSurcharge {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  description: string;

  @Column({ type: 'int', nullable: true })
  storeId: number;

  @Column({ type: 'timestamp', nullable: true })
  startDateTime: string;

  @Column({ type: 'timestamp', nullable: true })
  endDateTime: string;

  @Column({ type: 'tinyint' })
  isActive: boolean;

  @Column({ type: 'tinyint' })
  isVisibleForCustomer: boolean;

  @Column({ type: 'int', nullable: true })
  definitionId: number;

  @Column({ type: 'int', nullable: true })
  posPlu: number;

  @Column({ type: 'float', nullable: true })
  surchargePercentage: number;

  @Column({ type: 'float', nullable: true })
  surchargeAmount: number;

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
}
