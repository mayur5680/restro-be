import { User } from '@modules/user/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToOne,
  OneToMany,
} from 'typeorm';

import { Order } from '@modules/order/order.entity';
import { Payment } from '@modules/payment/payment.entity';

@Entity('Checkout')
export class Checkout {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: true })
  orderId: string;

  @Column({
    nullable: true,
    comment: 'guest user identifier associated to the order',
  })
  customerId: string;

  @ManyToOne(() => User, {
    nullable: true,
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column('json')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: Record<string, any>;

  @Column({ nullable: true })
  posOrderId: number;

  @Column({ type: 'datetime', nullable: true })
  posOrderTimeStamp: Date;

  @Column({
    type: 'enum',
    enum: ['COMPLETED', 'FAILED', 'INPROGRESS', 'PENDING'],
  })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  createdBy: string;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @Column({ nullable: true })
  updatedBy: string;

  @Column({ type: 'datetime', nullable: true })
  deletedAt: Date;

  @Column({ default: 0, comment: 'Add cutlery in order' })
  addCutlery: number;

  @Column({ type: 'datetime', nullable: true })
  kdsBumpTime: Date;

  @Column({ nullable: true })
  sourceIp: string;

  @OneToOne(() => Order, { nullable: true })
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @OneToMany(() => Payment, (payment) => payment.checkout)
  @JoinColumn({ name: 'orderId' })
  payments: Payment[];
}
