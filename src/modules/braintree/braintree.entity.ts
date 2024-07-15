import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Payment } from '@modules/payment/payment.entity';
export enum PaymentTypeEnum {
  GOOGLE_PAY = 'GOOGLE_PAY',
  SAMSUNG_PAY = 'SAMSUNG_PAY',
  APPLE_PAY = 'APPLE_PAY',
  VEMO_CARD = 'VEMO_CARD',
  VISA_CARD = 'VISA_CARD',
  MASTER_CARD = 'MASTER_CARD',
  AMEX = 'AMEX',
  DINERS = 'DINERS',
  PAY_PAL = 'PAY_PAL',
  CREDIT_CARD = 'CREDIT_CARD',
}

@Entity('Braintree')
export class Braintree {
  @PrimaryColumn()
  id: string;

  @Index()
  @Column({ type: 'varchar', length: 255, nullable: true })
  paymentId: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  amount: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  transactionStatus: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  transactionId: string;

  @Column({ nullable: false })
  nounce: string;

  @Column({ type: 'json', nullable: true })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  BTAFT: any;

  @CreateDateColumn()
  createdAt: Date | string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  createdBy: string;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date | string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  updatedBy: string;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | string;

  @Column({
    type: 'enum',
    enum: [
      'GOOGLE_PAY',
      'SAMSUNG_PAY',
      'APPLE_PAY',
      'VEMO_CARD',
      'VISA_CARD',
      'MASTER_CARD',
      'AMEX',
      'DINERS',
      'PAY_PAL',
      'CREDIT_CARD',
    ],
    default: 'CREDIT_CARD',
    nullable: true,
  })
  paymentType: PaymentTypeEnum;

  @OneToOne(() => Payment, (payment) => payment.braintree, { nullable: true })
  @JoinColumn({ name: 'paymentId' })
  payment: Payment;
}
