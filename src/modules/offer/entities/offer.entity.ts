import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { OfferType, TriggerType, UserType } from '../types';
import { OfferAttributes } from '../../offer-attribute/entities/offer-attributes.entity';
import { Store } from '@modules/store/entities/store.entity';
import { StoreOffer } from '@modules/store-offer/entities/store-offer.entity';
import { OfferMeta } from '@modules/offer-meta/entities/offer-meta.entity';

@Entity('Offer')
export class Offer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  masterCouponId: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  hook: string;

  @Column({ type: 'enum', nullable: true, enum: OfferType })
  offerType: OfferType;

  @Column({ type: 'enum', nullable: true, enum: UserType })
  userType: UserType;

  @CreateDateColumn()
  startDate: Date;

  @CreateDateColumn()
  endDate: Date;

  @Column({ type: 'varchar', length: 255 })
  status: string;

  @Column({ type: 'enum', nullable: true, enum: TriggerType })
  triggerType: TriggerType;

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

  @Column({ type: 'tinyint' })
  oneOff: boolean;

  @Column({ type: 'tinyint' })
  byOrder?: boolean;

  @Column({ type: 'tinyint' })
  byStore?: boolean;

  @Column({ type: 'tinyint' })
  byPostCode?: boolean;

  @Column({ type: 'tinyint' })
  byState?: boolean;

  @Column({ type: 'int' })
  priority: number;

  @Column({ type: 'int', nullable: true })
  rewardTypeId: number;

  @OneToOne(() => OfferAttributes, (offerAttribute) => offerAttribute.offer)
  offerAttributes: OfferAttributes;

  @OneToMany(() => StoreOffer, (storeOffer) => storeOffer.offer)
  storeOffers: StoreOffer[];

  @ManyToMany(() => Store, (store) => store.storeOffers)
  @JoinTable({ name: 'StoreOffer' })
  stores: Store[];

  @OneToOne(() => OfferMeta, (offerMeta) => offerMeta.offer)
  offerMeta: OfferMeta;
}
