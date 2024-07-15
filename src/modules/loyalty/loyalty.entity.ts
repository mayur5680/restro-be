import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from '@modules/user/user.entity';

@Entity('Loyalty')
@Unique('cardNumber', ['cardNumber'])
@Index('userId', ['userId'])
export class Loyalty {
  @PrimaryColumn('varchar', { length: 255 })
  id: string;

  @Column({ type: 'int', nullable: true })
  userId: number | null;

  @Column({
    type: 'int',
    default: 0,
    nullable: true,
    comment: 'Unique Identifier for this member in task system',
  })
  posMemberId: number | null;

  @Column({ type: 'varchar', length: 255, nullable: true, unique: true })
  cardNumber: string | null;

  @Column({ type: 'int', nullable: true })
  points: number | null;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  gygDollar: number | null;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  issueDate: Date;

  @Column({ type: 'datetime', nullable: true })
  expiryDate: Date | null;

  @Column({ type: 'tinyint', nullable: true })
  isActive: boolean | null;

  @Column({
    type: 'int',
    default: 0,
    nullable: true,
    comment: 'Unique Identifier for this member in task 21.12 system',
  })
  posMemberId2112: number | null;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'varchar', length: 255, nullable: false })
  createdBy: string;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  updatedBy: string | null;

  @Column({ type: 'datetime', nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;
}
