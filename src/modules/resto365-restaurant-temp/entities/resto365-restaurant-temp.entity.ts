import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Temp_Restaurant')
export class TempRestaurant {
  @PrimaryGeneratedColumn()
  bhyveId: number;

  @Column({ type: 'int', nullable: true })
  posStoreId: number;

  @Column({ type: 'int', nullable: true })
  oldStoreId: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  restaurantName: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  timeZone: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  address1: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  address2: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  city: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  suburb: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  postCode: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  postalCode: string;

  @Column({ type: 'int', nullable: true })
  country_code: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  country_name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  state: string;

  @Column({ type: 'int', nullable: true })
  areaId: number;

  @Column({ type: 'varchar', length: 10, nullable: true })
  priceTier: string;

  @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
  longitude: number;

  @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
  latitude: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  orderLink: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  cateringLink: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  storeAlertEmail: string;

  @Column({ type: 'int', nullable: true })
  displayOrder: number;

  @Column({ type: 'boolean', nullable: true })
  isActive: boolean;

  @Column({ type: 'boolean', nullable: true })
  isTest: boolean;

  @Column({ type: 'text', nullable: true })
  inActiveReason: string;

  @Column({ type: 'boolean', nullable: true })
  isFoodCourt: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  maxOrderValue: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  minOrderValue: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  orderAlertValueThreshold: number;

  @Column({ type: 'boolean', nullable: true })
  syncLoyaltyDollars: boolean;

  @Column({ type: 'boolean', nullable: true })
  syncLoyaltyPoints: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  googlePlaceId: string;

  @Column({ type: 'timestamp', nullable: true })
  createdAt: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  createdBy: string;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  updatedBy: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  gst: number;

  @Column({ type: 'boolean', nullable: true })
  isGstIncluded: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  taxOfficeCode: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  brandSiteRestaurantLink: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  fax: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  orderingId: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  orderingName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  campaignMonitorCode: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  primaryMarketingArea: string;

  @Column({ type: 'int', nullable: true })
  trafficVolume: number;

  @Column({ type: 'text', nullable: true })
  additionalDetails: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  storeGroup: string;

  @Column({ type: 'text', nullable: true })
  longDescription: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  formattedStoreName: string;

  @Column({ type: 'boolean', nullable: true })
  disableStoreOrder: boolean;

  @Column({ type: 'boolean', nullable: true })
  isPermanentlyClosed: boolean;

  @Column({ type: 'text', nullable: true })
  pickupInstruction: string;

  @Column({ type: 'boolean', nullable: true })
  isInAppDeliveryEnabled: boolean;

  @Column({ type: 'boolean', nullable: true })
  liquor: boolean;

  @Column({ type: 'boolean', nullable: true })
  coffee: boolean;

  @Column({ type: 'boolean', nullable: true })
  icedCoffee: boolean;

  @Column({ type: 'boolean', nullable: true })
  breakfast: boolean;

  @Column({ type: 'boolean', nullable: true })
  driveThru: boolean;

  @Column({ type: 'boolean', nullable: true })
  wheelChairAccess: boolean;

  @Column({ type: 'boolean', nullable: true })
  pickUp: boolean;

  @Column({ type: 'boolean', nullable: true })
  dineIn: boolean;

  @Column({ type: 'boolean', nullable: true })
  softServe: boolean;

  @Column({ type: 'boolean', nullable: true })
  churro: boolean;
}
