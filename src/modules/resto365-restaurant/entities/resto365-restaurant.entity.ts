import { Resto365Area } from '@modules/resto365-area/entities/resto365-area.entity';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';
import { Resto365AuditEntity } from 'src/shared/audit.entity';
import { AuditLog } from 'src/shared/audit-logs.types';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToOne,
  JoinColumn,
  Unique,
  OneToMany,
} from 'typeorm';
import { UUID } from 'crypto';
import { Resto365CerebroProductCompanyOverride } from '@modules/resto365-cerebro-product-company-override/entities/resto365-cerebro-product-company-override.entity';
import { GasType } from 'src/context';

export enum Ownership {
  Corporate = 'Corporate',
  Franchise = 'Franchise',
}

@Entity({ name: 'Restaurant' })
@Index('idx_bhyveId', ['bhyveId'])
@Unique('restaurantName', ['restaurantName'])
export class Resto365Restaurant
  extends Resto365AuditEntity
  implements AuditLog
{
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 32, nullable: true })
  bhyveId: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  restaurantName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  shortRestaurantName: string;

  @Column({ type: 'text', nullable: true })
  fullRestaurantName: string;

  @Column({ type: 'char', length: 15, nullable: true })
  code: string;

  @Column({ type: 'char', length: 15, nullable: true })
  newCode: string;

  @Column({ type: 'varchar', length: 16, nullable: true })
  acronym: string;

  @Column({ type: 'varchar', length: 16, nullable: true })
  openingDate: string;

  @Column({ type: 'varchar', length: 16, nullable: true })
  refurbishmentStartDate: string;

  @Column({ type: 'varchar', length: 16, nullable: true })
  refurbishmentEndDate: string;

  @Column({ type: 'varchar', length: 16, nullable: true })
  freeBurritos: string;

  @Column({ type: 'varchar', length: 16, nullable: true })
  closingDate: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  address1: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  notableBuildingLocation: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  address2: string;

  @Column({ type: 'varchar', length: 64, nullable: true })
  suburb: string;

  @Column({ type: 'varchar', length: 16, nullable: true })
  postalCode: string;

  @Column({ type: 'varchar', length: 16, nullable: true })
  state: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  country: string;

  @Column({ type: 'enum', enum: Ownership, nullable: true })
  ownership: Ownership;

  @Column({ type: 'varchar', length: 255, nullable: true })
  owner1FirstName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  owner1LastName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  owner1Email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  owner1Mobile: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  owner2FirstName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  owner2LastName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  owner2Email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  owner2Mobile: string;

  @Column({ type: 'text', nullable: true })
  previousOwnership: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  previousOwner: string;

  @Column({ type: 'text', nullable: true })
  legalEntity: string;

  @Column({ type: 'varchar', length: 32, nullable: true })
  abn: string;

  @Column({ nullable: false })
  areaId: number;

  @ManyToOne(() => Resto365Area)
  @JoinColumn({ name: 'areaId' })
  area: Resto365Area;

  @Column({ type: 'varchar', length: 32, nullable: true })
  restaurantManagerOktaId: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  restaurantManager: string;

  @Column({ type: 'varchar', length: 32, nullable: true })
  culinaryOpsCoachOktaId: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  culinaryOpsCoach: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  cAndOCoachPhoneNumber: string;

  @Column({ type: 'varchar', length: 32, nullable: true })
  stateManagerOktaId: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  stateManager: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  extension: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  restaurantEmail: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  corporateRMEmail: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  numberOfTradingDays: string;

  @Column({ type: 'varchar', length: 32, nullable: true })
  monOpen: string;

  @Column({ type: 'varchar', length: 32, nullable: true })
  monClose: string;

  @Column({ type: 'varchar', length: 32, nullable: true })
  tueOpen: string;

  @Column({ type: 'varchar', length: 32, nullable: true })
  tueClose: string;

  @Column({ type: 'varchar', length: 32, nullable: true })
  wedOpen: string;

  @Column({ type: 'varchar', length: 32, nullable: true })
  wedClose: string;

  @Column({ type: 'varchar', length: 32, nullable: true })
  thuOpen: string;

  @Column({ type: 'varchar', length: 32, nullable: true })
  thurClose: string;

  @Column({ type: 'varchar', length: 32, nullable: true })
  friOpen: string;

  @Column({ type: 'varchar', length: 32, nullable: true })
  friClose: string;

  @Column({ type: 'varchar', length: 32, nullable: true })
  satOpen: string;

  @Column({ type: 'varchar', length: 32, nullable: true })
  satClose: string;

  @Column({ type: 'varchar', length: 32, nullable: true })
  sunOpen: string;

  @Column({ type: 'varchar', length: 32, nullable: true })
  sunClose: string;

  @Column({ type: 'text', nullable: true })
  tradingHourChangeNotes: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  format: string;

  @Column({ type: 'varchar', length: 16, nullable: true })
  priceTier: string;

  @Column({ type: 'tinyint', nullable: true })
  doorDash: number;

  @Column({ type: 'tinyint', nullable: true })
  menuLog: number;

  @Column({ type: 'tinyint', nullable: true })
  uberEats: number;

  @Column({ type: 'tinyint', nullable: true })
  breakfast: number;

  @Column({ type: 'tinyint', nullable: true })
  coffee: number;

  @Column({ type: 'tinyint', nullable: true })
  iceMachine: number;

  @Column({ type: 'tinyint', nullable: true })
  icedCoffee: number;

  @Column({ type: 'tinyint', nullable: true })
  liquor: number;

  @Column({ type: 'tinyint', nullable: true })
  churro: number;

  @Column({ type: 'tinyint', nullable: true })
  quesadillas: number;

  @Column({ type: 'tinyint', nullable: true })
  softServe: number;

  @Column({ type: 'tinyint', nullable: true })
  toilet: number;

  @Column({ type: 'tinyint', nullable: true })
  wheelChairAccess: number;

  @Column({ type: 'text', nullable: true })
  courierInstructions: string;

  @Column({ type: 'tinyint', nullable: true })
  dineIn: number;

  @Column({ type: 'tinyint', nullable: true })
  driveThru: number;

  @Column({ type: 'tinyint', nullable: true })
  pickUp: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  amexMid: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  tyroMid: string;

  @Column({ type: 'varchar', length: 16, nullable: true })
  subnet: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: 'Alpha.Net Internet Plan - 50 mbps/100 mbps',
  })
  internetPlan: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  coatesLocationId: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  nbnLocationId: string;

  @Column({ type: 'varchar', length: 32, nullable: true })
  crunchTimeLocationId: string;

  @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
  longitude: number;

  @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
  latitude: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  posHardware: string;

  @Column({ type: 'varchar', length: 16, nullable: true })
  posQty: string;

  @Column({ type: 'varchar', length: 16, nullable: true })
  totalEftposQty: string;

  @Column({ type: 'varchar', length: 16, nullable: true })
  dtEftposQty: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  organics: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  cardboard: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  containerDepositScheme: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  coMingledRecycled: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  solar: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  evCharging: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  otherSustainabilityInitiatives: string;

  @Column({ type: 'int', nullable: true })
  posStoreId: number;

  @Column({ type: 'int', nullable: true })
  oldStoreId: number;

  @Column({ type: 'varchar', length: 250, nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  timeZone: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  city: string;

  @Column({ type: 'varchar', length: 10, nullable: false })
  postCode: string;

  @Column({ type: 'varchar', length: 350, nullable: true })
  orderLink: string;

  @Column({ type: 'varchar', length: 350, nullable: true })
  cateringLink: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  storeAlertEmail: string;

  @Column({ type: 'int', nullable: false })
  displayOrder: number;

  @Column({ type: 'tinyint', nullable: false })
  isActive: number;

  @Column({ type: 'tinyint', nullable: true })
  isTest: number;

  @Column({ type: 'tinyint', nullable: false, default: 0 })
  isInAppDeliveryEnabled: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  inActiveReason: string;

  @Column({ type: 'tinyint', nullable: false })
  isFoodCourt: number;

  @Column({ type: 'int', nullable: true })
  maxOrderValue: number;

  @Column({ type: 'int', nullable: true })
  minOrderValue: number;

  @Column({ type: 'int', nullable: true })
  orderAlertValueThreshold: number;

  @Column({ type: 'tinyint', nullable: false, default: 1 })
  syncLoyaltyDollars: number;

  @Column({ type: 'tinyint', nullable: false, default: 1 })
  syncLoyaltyPoints: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: 'store google places Id',
  })
  googlePlaceId: string;

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
  isGstIncluded: number;

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

  @Column({ type: 'tinyint', nullable: false, default: 0 })
  disableStoreOrder: number;

  @Column({ type: 'tinyint', nullable: true })
  isPermanentlyClosed: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  pickupInstruction: string;

  @Column({ type: 'text', nullable: true })
  comments: string;

  @Column({
    type: 'decimal',
    precision: 4,
    scale: 2,
    nullable: true,
    comment: 'Total Tax amount defined for the store',
  })
  totalTax: number;

  @Column({
    type: 'decimal',
    precision: 4,
    scale: 2,
    nullable: true,
    comment: 'State Tax amount defined for the store',
  })
  stateTax: number;

  @Column({
    type: 'decimal',
    precision: 4,
    scale: 2,
    nullable: true,
    comment: 'County Tax amount defined for the store',
  })
  countyTax: number;

  @Column({
    type: 'decimal',
    precision: 4,
    scale: 2,
    nullable: true,
    comment: 'Local Tax amount defined for the store',
  })
  localTax: number;

  @Column({
    type: 'decimal',
    precision: 4,
    scale: 2,
    nullable: true,
    comment: 'RTA amount defined for the store',
  })
  rta: number;

  @Column({
    type: 'decimal',
    precision: 4,
    scale: 2,
    nullable: true,
    comment: 'Other Applicable Taxes amount defined for the store',
  })
  otherApplicableTaxes: number;

  @Column({
    type: 'varchar',
    length: 350,
    nullable: true,
    comment: 'Tax Rate Source',
  })
  taxRateSource: string;

  @Column({ type: 'tinyint', nullable: true })
  overnightService: number;

  @Column({ type: 'tinyint', default: 1 })
  needMenuGenerate: number;

  @Column({
    name: 'gasType',
    type: 'enum',
    enum: GasType,
    nullable: true,
  })
  gasType: GasType;

  @Column({ type: 'int', nullable: false, default: 0 })
  seatingCapacity: number;

  @OneToMany(
    () => Resto365CerebroProductCompanyOverride,
    (resto365CerebroProductCompanyOverride) =>
      resto365CerebroProductCompanyOverride.restaurant,
  )
  public resto365CerebroProductCompanyOverride?: Resto365CerebroProductCompanyOverride[];

  _metadata: { auditUser: Resto365User; correlationId: UUID };
}
