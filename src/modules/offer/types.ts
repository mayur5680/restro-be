import { Product } from '@modules/product/entities/product.entity';

export enum OfferType {
  MERCHANDISE = 'MERCHANDISE',
  CONTAINER = 'CONTAINER',
  COUPON = 'COUPON',
  DISCOUNT = 'DISCOUNT',
  PRODUCT = 'PRODUCT',
}

export enum UserType {
  REGISTERED = 'REGISTERED',
  GUEST = 'GUEST',
  FACEBOOK = 'FACEBOOK',
  GOOGLE = 'GOOGLE',
  ALL = 'ALL',
}

export enum TriggerType {
  SPEND_BASED = 'SPEND_BASED',
  SPEND_INDEPENDENT = 'SPEND_INDEPENDENT',
}

export enum RewardType {
  PRODUCT = 'PRODUCT',
  BASKET = 'BASKET',
  MERCHANDISE = 'MERCHANDISE',
  LOYALTY = 'LOYALTY',
}
export enum RewardRewardType {
  GYGPOINTS = 'GYGPOINTS',
  GYGDOLLARS = 'GYGDOLLARS',
}

export enum RewardDiscountType {
  AMOUNT = 'AMOUNT',
  PERCENTAGE = 'PERCENTAGE',
  'NON-DISCOUNTING' = 'NON-DISCOUNTING',
}

export interface GygQueryOptions {
  take?: number;
  skip?: number;
  filters?: Record<string, string>;
  sortBy: string;
}

export interface Trigger {
  criteria: string;
  condition: string;
  minimumOrderValue: number;
  sourceItems?: SourceItem[];
}

export interface Merchandise {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  image: string;
  imageTop: string;
  imageAngle: string;
  posPlu: number;
  needInventoryValidation: boolean;
}

export interface RewardProperty {
  isDefault: boolean;
  merchandiseId?: number;
  merchandise?: Merchandise;
  productId?: number;
  product?: Product;
  quantity?: number;
  rewardType: RewardRewardType;
  productPosId?: number;
  config?: string;
  multiplier?: number;
  description?: string;
  multiplierCriteria?: string;
  notAvailableDescription?: string;
  sourceItems?: SourceItem[];
  type?: RewardType;
  discountType?: RewardDiscountType;
}

export enum RewardConfig {
  MULTIPLIER = 'multiplier',
  FLAT = 'flat',
}
export enum RewardMultiplierCriteria {
  BASKET_TOTAL = 'basketTotal',
  MIN_ORDER_VALUE = 'minOrderValue',
}

export enum TriggerCriteria {
  BASKET_TOTAL = 'basketTotal',
  MIN_ORDER_VALUE = 'minOrderValue',
}

export enum TriggerCondition {
  BASKET_TOTAL = 'basketTotal',
  CATEGORY = 'category',
}

export interface Reward {
  id: number;
  name: string;
  type: RewardType;
  properties: RewardProperty[];
  discountType: RewardDiscountType;
  merchandise?: Merchandise;
}

export interface SourceItem {
  minQty: number;
  productId: number;
  productPosPlu: number;
}

export interface OfferBracket {
  rewardId?: number;
  reward?: Reward;
  rewards?: RewardProperty[];

  triggers: Trigger[];
  application: string;
  shouldMultiply: boolean;
  needInventoryValidation?: boolean;
  shouldDiscountSourceItems: boolean;
}

export interface OfferDetails {
  offerBrackets: OfferBracket[];
  bracketApplication: string;
}
