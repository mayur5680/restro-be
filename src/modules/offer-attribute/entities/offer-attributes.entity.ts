import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Offer } from '../../offer/entities/offer.entity';
import { OfferDetails } from '../../offer/types';

@Entity('OfferAttributes')
export class OfferAttributes {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Offer)
  @JoinColumn()
  offer: Offer;

  @Column({ type: 'varchar', nullable: false })
  offerId: string;

  @Column({ type: 'json', nullable: false })
  offerDetails: OfferDetails;

  @Column({ type: 'int', nullable: true })
  merchandiseId: number;

  @Column({ type: 'int', nullable: true })
  menuContainerId: number;

  @Column({ type: 'int', nullable: true })
  menuContainerProductId: number;

  @Column({ type: 'int', nullable: true })
  minQuantity: number;

  @Column({ type: 'int', nullable: true })
  minValue: number;

  @Column({ type: 'int', nullable: true })
  minSpendByMenuContainerId: number;

  @Column({ type: 'int', nullable: true })
  minSpendByMenuContainerProductId: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  claimedLimitUnit: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  displayText: string;

  @Column({ type: 'int', nullable: true })
  claimedUnitValue: number;

  @Column({ type: 'int', nullable: true })
  maxAllowedPerOrder: number;

  @Column({ type: 'int', nullable: true })
  maxAllowedPerUser: number;

  @Column({ type: 'tinyint', nullable: true })
  isActive: boolean;

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
