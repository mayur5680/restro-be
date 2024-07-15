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
import { Offer } from '@modules/offer/entities/offer.entity';
import { OfferMetaSection } from '@modules/offer-meta/entities/offer-meta-section.entity';

@Entity('OfferMeta')
export class OfferMeta {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  subTitle: string;

  @Column({ type: 'tinyint' })
  alwaysShow: boolean;

  @Column({ type: 'varchar', length: 255 })
  callToActionText: string;

  @Column({ type: 'varchar', length: 255 })
  callToActionlink: string;

  @Column({ type: 'varchar', length: 255 })
  webImage: string;

  @Column({ type: 'varchar', length: 255 })
  dashboardImageUrl: string;

  @Column({ type: 'varchar', length: 255 })
  dashboardWebImageUrl: string;

  @Column({ type: 'varchar', length: 255 })
  tocTitle: string;

  @Column({ type: 'varchar', length: 255 })
  tocUrl: string;

  @Column({ type: 'varchar', length: 255 })
  brazePromotionId: string;

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

  @Column({ type: 'varchar' })
  offerId: string;

  @OneToOne(() => Offer)
  @JoinColumn()
  offer: Offer;

  @OneToOne(
    () => OfferMetaSection,
    (offerMetaSection) => offerMetaSection.offerMeta,
  )
  offerMetaSection: OfferMetaSection;
}
