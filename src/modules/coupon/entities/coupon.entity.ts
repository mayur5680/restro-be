import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { CouponType } from '../types';

@Entity('Coupon')
export class Coupon {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  code: string;

  @Column({ type: 'decimal' })
  amount: number;

  @Column({ type: 'integer' })
  percentage: number;

  @Column({ type: 'integer' })
  productId: number;

  @Column({ type: 'integer' })
  minValue: number;

  @Column({ type: 'tinyint' })
  enableNotification: boolean;

  @Column({ type: 'datetime', nullable: true })
  issueDate: string;

  @Column({ type: 'datetime', nullable: true })
  expiryDate: string;

  @Column({ type: 'tinyint' })
  isActive: boolean;

  @Column({ type: 'tinyint' })
  oneof: boolean;

  @Column({ type: 'decimal' })
  loyaltyPoints: number;

  @Column({ type: 'integer' })
  posPlu: number;

  @Column({ type: 'decimal' })
  defaultPrice: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  image: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  link: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  title: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description: string;

  @Column({ type: 'enum', enum: CouponType, nullable: false })
  couponType: CouponType;

  @Column({ type: 'varchar', length: 255, nullable: true })
  priceDescription: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  offerDescription: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  intraTitle: string;

  @Column({ type: 'text', nullable: true })
  stepText: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  webImage: string;

  @Column({ type: 'integer' })
  validityPeriod: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  validityPeriodType: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  dashboardImageLink: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  dashboardWebImageLink: string;

  @Column({ type: 'tinyint' })
  isMultipart: boolean;

  @Column({ type: 'integer' })
  taskReferencePosPlu: number;

  @Column({ type: 'integer' })
  rewardTypeId: number;

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
