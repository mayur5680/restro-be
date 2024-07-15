import { Store } from '@modules/store/entities/store.entity';
import { Group } from '@modules/group/entities/group.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity('GroupStore')
export class GroupStore {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  groupId: number;

  @Column({ type: 'int' })
  storeId: number;

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

  @ManyToOne(() => Group)
  @JoinColumn({ name: 'groupId' })
  group: Group;

  @ManyToOne(() => Store)
  @JoinColumn({ name: 'storeId' })
  store: Store;
}
