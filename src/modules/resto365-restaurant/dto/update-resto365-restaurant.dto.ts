import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsInt,
  IsNumber,
  IsEnum,
  IsString,
  IsArray,
  IsDecimal,
} from 'class-validator';
import { GasType } from 'src/context';

export enum Ownership {
  Corporate = 'Corporate',
  Franchise = 'Franchise',
}

export class UpdateResto365RestaurantDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  bhyveId?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  restaurantName?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  shortRestaurantName?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  fullRestaurantName?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  code?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  newCode?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  acronym?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  openingDate?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  refurbishmentStartDate?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  refurbishmentEndDate?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  freeBurritos?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  closingDate?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  address1?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  notableBuildingLocation?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  address2?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  suburb?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  postalCode?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  state?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  country?: string;

  @ApiProperty({ enum: Ownership })
  @IsOptional()
  @IsEnum(Ownership)
  ownership?: Ownership;

  @ApiProperty()
  @IsString()
  @IsOptional()
  owner1FirstName?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  owner1LastName?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  owner1Email?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  owner1Mobile?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  owner2FirstName?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  owner2LastName?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  owner2Email?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  owner2Mobile?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  previousOwnership?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  previousOwner?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  legalEntity?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  abn?: string;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  areaId?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  restaurantManagerOktaId?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  restaurantManager?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  culinaryOpsCoachOktaId?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  culinaryOpsCoach?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  cAndOCoachPhoneNumber?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  stateManagerOktaId?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  stateManager?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  extension?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  restaurantEmail?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  corporateRMEmail?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  numberOfTradingDays?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  monOpen?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  monClose?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  tueOpen?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  tueClose?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  wedOpen?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  wedClose?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  thuOpen?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  thurClose?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  friOpen?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  friClose?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  satOpen?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  satClose?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  sunOpen?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  sunClose?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  tradingHourChangeNotes?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  format?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  priceTier?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  doorDash?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  menuLog?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  uberEats?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  breakfast?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  coffee?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  iceMachine?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  icedCoffee?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  liquor?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  churro?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  quesadillas?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  softServe?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  toilet?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  wheelChairAccess?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  courierInstructions?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  dineIn?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  driveThru?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  pickUp?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  amexMid?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  tyroMid?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  subnet?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  internetPlan?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  coatesLocationId?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  nbnLocationId?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  crunchTimeLocationId?: string;

  @ApiProperty()
  @IsDecimal()
  @IsOptional()
  longitude?: number;

  @ApiProperty()
  @IsDecimal()
  @IsOptional()
  latitude?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  posHardware?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  posQty?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  totalEftposQty?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  dtEftposQty?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  organics?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  cardboard?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  containerDepositScheme?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  coMingledRecycled?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  solar?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  evCharging?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  otherSustainabilityInitiatives?: string;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  posStoreId?: number;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  oldStoreId?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  timeZone?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  postCode?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  orderLink?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  cateringLink?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  storeAlertEmail?: string;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  displayOrder?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  isActive?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  isTest?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  isInAppDeliveryEnabled?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  inActiveReason?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  isFoodCourt?: number;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  maxOrderValue?: number;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  minOrderValue?: number;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  orderAlertValueThreshold?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  syncLoyaltyDollars?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  syncLoyaltyPoints?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  googlePlaceId?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  gst?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  isGstIncluded?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  taxOfficeCode?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  brandSiteRestaurantLink?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  fax?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  orderingId?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  orderingName?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  campaignMonitorCode?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  primaryMarketingArea?: string;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  trafficVolume?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  additionalDetails?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  storeGroup?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  longDescription?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  formattedStoreName?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  disableStoreOrder?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  isPermanentlyClosed?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  pickupInstruction?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  comments?: string;

  @IsInt()
  @IsOptional()
  @ApiProperty()
  groupId?: number;

  @IsArray()
  @IsOptional()
  @ApiProperty()
  channelIds?: number[];

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  overnightService?: number;

  @ApiProperty({ enum: GasType })
  @IsOptional()
  @IsEnum(GasType)
  gasType?: GasType;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  seatingCapacity?: number;
}
