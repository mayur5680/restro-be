import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';

import { Store } from '@modules/store/entities/store.entity';
import { Checkout } from '@modules/checkout/checkout.entity';

@Entity('Order')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: [
      'ABANDONED',
      'AWAITING_PICKUP',
      'CREATED',
      'FAILED',
      'INPROGRESS',
      'COMPLETED',
      'CANCELLED',
      'RECEIVED',
    ],
  })
  status: string;

  @Column({ type: 'int' })
  type: number;

  @Column({ type: 'int', nullable: true, default: null })
  tableNumber: number;

  @ManyToOne(() => Store)
  @JoinColumn({ name: 'storeId' })
  store: Store;

  @Column({ type: 'int', nullable: true, default: null })
  channelId: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'varchar' })
  createdBy: number | string;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @Column({ type: 'int', nullable: true })
  updatedBy: number;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @Column({
    type: 'enum',
    enum: [
      'CATERING',
      'DELIVERY',
      'DRIVETHRU',
      'EATIN',
      'PICKUP',
      'TABLE',
      'TAKEAWAY',
    ],
  })
  collectionType: string;

  @Column({
    type: 'int',
    nullable: true,
    comment: 'order stage identifier as the order progress',
  })
  orderStage: number;

  @Column({ type: 'json', nullable: true })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any;

  @Column({ type: 'boolean', nullable: true })
  isCheckedOut: boolean;

  @Column({
    type: 'text',
    nullable: true,
    comment: 'payment token generated for order',
  })
  paymentToken: string;

  @Column({
    type: 'datetime',
    nullable: true,
    comment: 'the timestamp when the payment token was generated',
  })
  paymentTokenTimestamp: Date;

  @Column({
    type: 'enum',
    enum: ['MULTIPART', 'SINGLEPART'],
    nullable: true,
    comment: 'experimental field.',
  })
  productType: string;

  @Column({ type: 'decimal', precision: 7, scale: 2, nullable: true })
  amountIncludingGst: number;

  @Column({ type: 'decimal', precision: 7, scale: 2, nullable: true })
  amountExcludingGst: number;

  @Column({ type: 'decimal', precision: 7, scale: 2, nullable: true })
  gstAmount: number;

  @Column({
    type: 'json',
    nullable: true,
    comment: 'Order response object to be returned back to the user.',
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  itemsResponse: any;

  @Column({
    type: 'json',
    nullable: true,
    comment: 'offers added to the basket',
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  offers: any;

  @Column({
    type: 'json',
    nullable: true,
    comment: 'Offer Tracking for the order',
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  offerTrail: any;

  @Column({ type: 'timestamp', nullable: true })
  pickUpTime: Date;

  @Column({ type: 'timestamp', nullable: true })
  activeUntil: Date;

  @Column({ type: 'int', nullable: true, default: null })
  posMenuId: number;

  @Column({ type: 'varchar', nullable: true })
  parentOrderId: string;

  @Column({ type: 'int', nullable: true })
  orderNumber: number;

  @Column({ type: 'varchar', nullable: true })
  hash: string;

  @Column({ type: 'varchar', nullable: true })
  orderRatingScheduleId: string;

  @Column({ type: 'int', nullable: true })
  supportTicketId: number;

  @Column({ type: 'varchar', nullable: true })
  clientPlatformType: string;

  @Column({ type: 'varchar', nullable: true })
  clientVersion: string;

  @OneToOne(() => Checkout, (checkout) => checkout.order)
  checkout: Checkout;
}
