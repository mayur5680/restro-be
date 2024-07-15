import {
  IsOptional,
  IsString,
  IsNotEmpty,
  IsEnum,
  IsNumber,
  IsBoolean,
  IsDecimal,
  IsBooleanString,
  IsArray,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Resto365CerebroProductCompanyOverride } from '@modules/resto365-cerebro-product-company-override/entities/resto365-cerebro-product-company-override.entity';

enum Ownership {
  Corporate = 'Corporate',
  Franchise = 'Franchise',
}

export class CombineRestaurantAndStoreResponseDto {
  @IsOptional()
  @IsString()
  bhyveId: string;

  constructor() {
    this.restaurantName = null;
    this.shortRestaurantName = null;
    this.fullRestaurantName = null;
    this.code = null;
    this.newCode = null;
    this.acronym = null;
    this.openingDate = null;
    this.refurbishmentStartDate = null;
    this.refurbishmentEndDate = null;
    this.freeBurritos = null;
    this.closingDate = null;
    this.address1 = null;
    this.notableBuildingLocation = null;
    this.address2 = null;
    this.suburb = null;
    this.postalCode = null;
    this.state = null;
    this.country = null;
    this.ownership = null;
    this.owner1FirstName = null;
    this.owner1LastName = null;
    this.owner1Email = null;
    this.owner1Mobile = null;
    this.owner2FirstName = null;
    this.owner2LastName = null;
    this.owner2Email = null;
    this.owner2Mobile = null;
    this.previousOwnership = null;
    this.previousOwner = null;
    this.legalEntity = null;
    this.abn = null;
    this.area = null;
    this.restaurantManagerOktaId = null;
    this.restaurantManager = null;
    this.culinaryOpsCoachOktaId = null;
    this.culinaryOpsCoach = null;
    this.cAndOCoachPhoneNumber = null;
    this.stateManagerOktaId = null;
    this.stateManager = null;
    this.phoneNumber = null;
    this.extension = null;
    this.restaurantEmail = null;
    this.corporateRMEmail = null;
    this.numberOfTradingDays = null;
    this.monOpen = null;
    this.monClose = null;
    this.tueOpen = null;
    this.tueClose = null;
    this.wedOpen = null;
    this.wedClose = null;
    this.thuOpen = null;
    this.thurClose = null;
    this.friOpen = null;
    this.friClose = null;
    this.satOpen = null;
    this.satClose = null;
    this.sunOpen = null;
    this.sunClose = null;
    this.tradingHourChangeNotes = null;
    this.format = null;
    this.priceTier = null;
    this.doorDash = null;
    this.menuLog = null;
    this.uberEats = null;
    this.breakfast = null;
    this.coffee = null;
    this.iceMachine = null;
    this.icedCoffee = null;
    this.liquor = null;
    this.churro = null;
    this.quesadillas = null;
    this.softServe = null;
    this.toilet = null;
    this.wheelChairAccess = null;
    this.courierInstructions = null;
    this.dineIn = null;
    this.driveThru = null;
    this.pickUp = null;
    this.posStoreId = null;
    this.oldStoreId = null;
    this.name = null;
    this.description = null;
    this.timeZone = null;
    this.city = null;
    this.postCode = null;
    this.longitude = null;
    this.latitude = null;
    this.orderLink = null;
    this.cateringLink = null;
    this.phone = null;
    this.email = null;
    this.storeAlertEmail = null;
    this.displayOrder = null;
    this.isActive = null;
  }

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  restaurantName: string;

  @IsOptional()
  @IsString()
  shortRestaurantName: string;

  @IsOptional()
  @IsString()
  fullRestaurantName: string;

  @IsOptional()
  @IsString()
  code: string;

  @IsOptional()
  @IsString()
  newCode: string;

  @IsOptional()
  @IsString()
  acronym: string;

  @IsOptional()
  @IsString()
  openingDate: string;

  @IsOptional()
  @IsString()
  refurbishmentStartDate: string;

  @IsOptional()
  @IsString()
  refurbishmentEndDate: string;

  @IsOptional()
  @IsString()
  freeBurritos: string;

  @IsOptional()
  @IsString()
  closingDate: string;

  @IsOptional()
  @IsString()
  address1: string;

  @IsOptional()
  @IsString()
  notableBuildingLocation: string;

  @IsOptional()
  @IsString()
  address2: string;

  @IsOptional()
  @IsString()
  suburb: string;

  @IsOptional()
  @IsString()
  postalCode: string;

  @IsOptional()
  @IsString()
  state: string;

  @IsOptional()
  @IsString()
  country: string;

  @IsOptional()
  @IsEnum(Ownership)
  ownership: Ownership;

  @IsOptional()
  @IsString()
  owner1FirstName: string;

  @IsOptional()
  @IsString()
  owner1LastName: string;

  @IsOptional()
  @IsString()
  owner1Email: string;

  @IsOptional()
  @IsString()
  owner1Mobile: string;

  @IsOptional()
  @IsString()
  owner2FirstName: string;

  @IsOptional()
  @IsString()
  owner2LastName: string;

  @IsOptional()
  @IsString()
  owner2Email: string;

  @IsOptional()
  @IsString()
  owner2Mobile: string;

  @IsOptional()
  @IsString()
  previousOwnership: string;

  @IsOptional()
  @IsString()
  previousOwner: string;

  @IsOptional()
  @IsString()
  legalEntity: string;

  @IsOptional()
  @IsString()
  abn: string;

  @IsOptional()
  @IsString()
  area: string;

  @IsOptional()
  @IsString()
  restaurantManagerOktaId: string;

  @IsOptional()
  @IsString()
  restaurantManager: string;

  @IsOptional()
  @IsString()
  culinaryOpsCoachOktaId: string;

  @IsOptional()
  @IsString()
  culinaryOpsCoach: string;

  @IsOptional()
  @IsString()
  cAndOCoachPhoneNumber: string;

  @IsOptional()
  @IsString()
  stateManagerOktaId: string;

  @IsOptional()
  @IsString()
  stateManager: string;

  @IsOptional()
  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  extension: string;

  @IsOptional()
  @IsString()
  restaurantEmail: string;

  @IsOptional()
  @IsString()
  corporateRMEmail: string;

  @IsOptional()
  @IsString()
  numberOfTradingDays: string;

  @IsOptional()
  @IsString()
  monOpen: string;

  @IsOptional()
  @IsString()
  monClose: string;

  @IsOptional()
  @IsString()
  tueOpen: string;

  @IsOptional()
  @IsString()
  tueClose: string;

  @IsOptional()
  @IsString()
  wedOpen: string;

  @IsOptional()
  @IsString()
  wedClose: string;

  @IsOptional()
  @IsString()
  thuOpen: string;

  @IsOptional()
  @IsString()
  thurClose: string;

  @IsOptional()
  @IsString()
  friOpen: string;

  @IsOptional()
  @IsString()
  friClose: string;

  @IsOptional()
  @IsString()
  satOpen: string;

  @IsOptional()
  @IsString()
  satClose: string;

  @IsOptional()
  @IsString()
  sunOpen: string;

  @IsOptional()
  @IsString()
  sunClose: string;

  @IsOptional()
  @IsString()
  tradingHourChangeNotes: string;

  @IsOptional()
  @IsString()
  format: string;

  @IsOptional()
  @IsString()
  priceTier: string;

  @IsOptional()
  @IsBooleanString()
  doorDash: string;

  @IsOptional()
  @IsBooleanString()
  menuLog: string;

  @IsOptional()
  @IsBooleanString()
  uberEats: string;

  @IsOptional()
  @IsBooleanString()
  breakfast: string;

  @IsOptional()
  @IsBooleanString()
  coffee: string;

  @IsOptional()
  @IsBooleanString()
  iceMachine: string;

  @IsOptional()
  @IsBooleanString()
  icedCoffee: string;

  @IsOptional()
  @IsBooleanString()
  liquor: string;

  @IsOptional()
  @IsBooleanString()
  churro: string;

  @IsOptional()
  @IsBooleanString()
  quesadillas: string;

  @IsOptional()
  @IsBooleanString()
  softServe: string;

  @IsOptional()
  @IsBooleanString()
  toilet: string;

  @IsOptional()
  @IsBooleanString()
  wheelChairAccess: string;

  @IsOptional()
  @IsString()
  courierInstructions: string;

  @IsOptional()
  @IsBooleanString()
  dineIn: string;

  @IsOptional()
  @IsBooleanString()
  driveThru: string;

  @IsOptional()
  @IsBooleanString()
  pickUp: string;

  @IsOptional()
  @IsNumber()
  posStoreId?: number;

  @IsOptional()
  @IsNumber()
  oldStoreId?: number;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  timeZone?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsString()
  postCode: string;

  @IsOptional()
  @IsDecimal({ decimal_digits: '8' })
  longitude?: number;

  @IsOptional()
  @IsDecimal({ decimal_digits: '8' })
  latitude?: number;

  @IsOptional()
  @IsString()
  orderLink?: string;

  @IsOptional()
  @IsString()
  cateringLink?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  storeAlertEmail?: string;

  @IsNumber()
  displayOrder: number;

  @IsBoolean()
  isActive: boolean;

  @IsOptional()
  @IsArray()
  resto365CerebroProductCompanyOverride: Resto365CerebroProductCompanyOverride[];
}
