import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
  OneToOne,
} from 'typeorm';
import { Checkout } from '@modules/checkout/checkout.entity';
import { User } from '@modules/user/user.entity';
import { PaymentSource } from '@modules/paymentSource/paymentSource.entity';
import { Braintree } from '@modules/braintree/braintree.entity';

export enum PaymentStatus {
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  INPROGRESS = 'INPROGRESS',
  REFUND = 'REFUND',
  VOID = 'VOID',
}

export enum PaymentType {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT',
}

@Entity('Payment')
@Index('checkoutId_index', ['checkoutId'])
@Index('userId_index', ['userId'])
@Index('paymentSourceId_index', ['paymentSourceId'])
@Index('type_index', ['type'])
@Index('referenceId_index', ['referenceId'])
@Index('status_index', ['status'])
@Index('createdBy_index', ['createdBy'])
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: true })
  checkoutId: string;

  @Column({ type: 'int', nullable: true })
  userId: number;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'int' })
  paymentSourceId: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  amount: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  referenceId: string;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.INPROGRESS,
  })
  status: PaymentStatus;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'varchar', length: 255 })
  createdBy: number;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  updatedBy: number;

  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deletedAt: Date;

  @Column({
    type: 'enum',
    enum: PaymentType,
    nullable: true,
  })
  type: PaymentType;

  @OneToOne(() => Braintree, (braintree) => braintree.payment, {
    nullable: true,
  })
  braintree: Braintree;

  @ManyToOne(() => Checkout, (checkout) => checkout.payments, {
    nullable: true,
  })
  @JoinColumn({ name: 'checkoutId' })
  checkout: Checkout;

  @OneToOne(() => PaymentSource)
  @JoinColumn({ name: 'paymentSourceId' })
  paymentSource: PaymentSource;
}
