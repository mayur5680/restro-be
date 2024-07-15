import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from '@modules/user/user.entity';

@Entity('UserExternalIdentity')
@Index('brazeId_unique_index', ['brazeId'], { unique: true })
@Index('email_unique_index', ['email'], { unique: true })
@Index('branchId_unique_index', ['branchId'], { unique: true })
//@Index('customerId_index', ['customerId'])
@Index('userId_index', ['userId'])
export class UserExternalIdentity {
  @PrimaryColumn()
  id: number;

  @Column({ type: 'int', nullable: true })
  userId: number | null;

  @Column({ nullable: true })
  customerId: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  brazeId: string;

  @Column({ default: false })
  isBrazeEnabled: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column({ nullable: true })
  createdBy: string;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  @Column({ nullable: true })
  updatedBy: string;

  @Column({ nullable: true })
  branchDeepLink: string;

  @Column({ nullable: true })
  branchId: string;

  @Column({ nullable: true })
  emailSubscription: boolean;

  @Column({ nullable: true })
  smsSubscription: boolean;

  @Column({ nullable: true })
  pushNotificationSubscription: boolean;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  // @ManyToOne(() => Customer, { onDelete: 'CASCADE' })
  // @JoinColumn({ name: 'customerId' })
  // customer: Customer;
}
