import { Offer } from '@modules/offer/entities/offer.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity('StoreOffer')
export class StoreOffer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  offerId: string;

  @Column({ type: 'int', nullable: true })
  storeId: number;

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

  @ManyToOne(() => Offer)
  @JoinColumn()
  offer: Offer;
}
