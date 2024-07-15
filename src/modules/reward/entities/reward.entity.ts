import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import {
  RewardDiscountType,
  RewardProperty,
  RewardType,
} from '../../offer/types';

@Entity('Reward')
export class Reward {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'json', nullable: false })
  properties: RewardProperty[];

  @Column({ type: 'enum', nullable: false, enum: RewardType })
  type: RewardType;

  @Column({ type: 'enum', nullable: false, enum: RewardDiscountType })
  discountType: RewardDiscountType;

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
}
