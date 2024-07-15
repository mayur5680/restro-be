import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
  Index,
  Unique,
} from 'typeorm';

export enum LoyaltyHistoryActionEnum {
  CREDITED = 'CREDITED',
  DEBITED = 'DEBITED',
}

export enum LoyaltyHistoryStatusEnum {
  CREATED = 'CREATED',
  INPROGRESS = 'INPROGRESS',
  COMPLETED = 'COMPLETED',
  SKIPPED = 'SKIPPED',
  PENDING = 'PENDING',
  REFUND = 'REFUND',
  FAILED = 'FAILED',
}

export enum LoyaltyHistorySourceTypeEnum {
  ORDER = 'ORDER',
  LOYALTY = 'LOYALTY',
  ADMINLOYALTY = 'ADMINLOYALTY',
  ADMINGYGDOLLAR = 'ADMINGYGDOLLAR',
  REFERRAL = 'REFERRAL',
}

export enum LoyaltyHistoryTypeEnum {
  POINTS = 'POINTS',
  DOLLARS = 'DOLLARS',
}
@Entity('LoyaltyHistory')
@Unique('cardNumber', ['cardNumber'])
@Index('userId', ['userId'])
export class LoyaltyHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: true, comment: 'BHYVE User ID' })
  userId: number;

  @Column({ type: 'int', nullable: true, comment: 'BHYVE Store ID' })
  storeId: number;

  @Column({ type: 'int', nullable: true, comment: 'TASK Store ID' })
  posMemberId: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    default: null,
    comment: 'GOMEX Card Number',
  })
  cardNumber: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: '0.00',
    comment: '',
  })
  totalValue: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    comment: '',
  })
  value: number;

  @Column({ type: 'enum', enum: ['POINTS', 'DOLLARS'] })
  type: LoyaltyHistoryTypeEnum;

  @Column({ type: 'enum', enum: ['CREDITED', 'DEBITED'] })
  action: LoyaltyHistoryActionEnum;

  @Column({
    type: 'enum',
    enum: [
      'CREATED',
      'INPROGRESS',
      'COMPLETED',
      'SKIPPED',
      'PENDING',
      'REFUND',
      'FAILED',
    ],
  })
  status: LoyaltyHistoryStatusEnum;

  @Column({ length: 255, nullable: true })
  comments: string;

  @Column({ type: 'tinyint', width: 1, default: 0 })
  syncBraze: boolean;

  @Column({ length: 255, nullable: true })
  sourceId: string;

  @Column({ length: 255, nullable: true })
  requestIdentifier: string;

  @Column({
    type: 'enum',
    enum: ['ORDER', 'LOYALTY', 'ADMINLOYALTY', 'ADMINGYGDOLLAR', 'REFERRAL'],
    nullable: true,
  })
  sourceType: LoyaltyHistorySourceTypeEnum;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date | string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  createdBy: string;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt: Date | string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  updatedBy: string | null;

  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deletedAt: Date | string | null;
}
