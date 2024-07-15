import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { StoreSectionTimeSlot } from '@modules/store-section-time-slot/entities/store-section-time-slot.entity';
import { Offer } from '@modules/offer/entities/offer.entity';
import { StoreOffer } from '@modules/store-offer/entities/store-offer.entity';
import { StoreTag } from '@modules/store-tag/entities/store-tag.entity';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';
import { AuditLog } from 'src/shared/audit-logs.types';
import { UUID } from 'crypto';
import { ChannelGroupStore } from '@modules/channel-group-store/entities/channel-group-store.entity';
import { GroupStore } from '@modules/group-store/entities/group-store.entity';

export type AuditMetadata = { auditUser: Resto365User; correlationId: UUID };

@Entity('Store')
export class Store implements AuditLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: true })
  posStoreId: number;

  @Column({ type: 'int', nullable: true })
  oldStoreId: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  timeZone: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  address1: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  address2: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  city: string;

  @Column({ type: 'varchar', length: 10 })
  postCode: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  country: string;

  @Column({ type: 'varchar', length: 3, nullable: true })
  state: string;

  @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
  longitude: number;

  @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
  latitude: number;

  @Column({ type: 'varchar', length: 350, nullable: true })
  orderLink: string;

  @Column({ type: 'varchar', length: 350, nullable: true })
  cateringLink: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  storeAlertEmail: string;

  @Column({ type: 'int' })
  displayOrder: number;

  @Column({ type: 'tinyint' })
  isActive: boolean;

  @Column({
    type: 'tinyint',
    nullable: true,
    comment: 'define if test store or real store',
  })
  isTest: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  inActiveReason: string;

  @Column({ type: 'tinyint' })
  isFoodCourt: boolean;

  @Column({ type: 'tinyint' })
  hasBreakfast: boolean;

  @Column({ type: 'tinyint' })
  hasCoffee: boolean;

  @Column({ type: 'int', nullable: true })
  maxOrderValue: number;

  @Column({ type: 'int', nullable: true })
  minOrderValue: number;

  @Column({ type: 'int', nullable: true })
  orderAlertValueThreshold: number;

  @Column({ type: 'tinyint' })
  syncLoyaltyDollars: boolean;

  @Column({ type: 'tinyint' })
  syncLoyaltyPoints: boolean;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: 'store google places Id',
  })
  googlePlaceId: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'int' })
  createdBy: number;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @Column({ type: 'int', nullable: true })
  updatedBy: number;

  @Column({
    type: 'decimal',
    precision: 4,
    scale: 2,
    nullable: true,
    comment: 'GST amount defined for the store',
  })
  gst: number;

  @Column({
    type: 'tinyint',
    nullable: true,
    comment: 'Flag to indicate if gst should be included in price or not.',
  })
  isGstIncluded: boolean;

  @Column({ type: 'varchar', length: 50, nullable: true })
  taxOfficeCode: string;

  @Column({ type: 'varchar', length: 350, nullable: true })
  brandSiteRestaurantLink: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  fax: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  orderingId: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  orderingName: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  campaignMonitorCode: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  primaryMarketingArea: string;

  @Column({ type: 'int', nullable: true })
  trafficVolume: number;

  @Column({ type: 'varchar', length: 500, nullable: true })
  additionalDetails: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  storeGroup: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  longDescription: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  formattedStoreName: string;

  @Column({ type: 'tinyint' })
  disableStoreOrder: boolean;

  @Column({ type: 'tinyint', nullable: true })
  isPermanentlyClosed: boolean;

  @Column({ type: 'varchar', length: 500, nullable: true })
  pickupInstruction: string;

  @OneToMany(() => StoreOffer, (storeOffer) => storeOffer.storeId)
  public storeOffers?: StoreOffer[];

  @ManyToMany(() => Offer, (offer) => offer.storeOffers)
  @JoinTable({ name: 'StoreOffer' })
  offers?: Offer[];

  @OneToMany(() => StoreTag, (storeTag) => storeTag.store)
  @JoinColumn({ name: 'id', referencedColumnName: 'storeId' })
  tags: StoreTag[];

  @OneToMany(
    () => StoreSectionTimeSlot,
    (storeSectionTimeSlot) => storeSectionTimeSlot.store,
  )
  storeSectionTimeSlots?: StoreSectionTimeSlot[];

  @OneToMany(() => GroupStore, (groupStore) => groupStore.store)
  @JoinColumn({ name: 'id', referencedColumnName: 'storeId' })
  groupStore?: StoreTag[];

  @OneToMany(
    () => ChannelGroupStore,
    (channelGroupStore) => channelGroupStore.store,
  )
  public channelGroupStore?: ChannelGroupStore[];
  _metadata: AuditMetadata;
}
