export enum TagAttribute {
  Liquor = 1,
  Coffee = 2,
  Breakfast = 3,
  DriveThru = 4,
  WheelChairAccess = 5,
  PickUp = 6,
  DineIn = 7,
}

export enum CerebroSync {
  PRODUCTCOMPANY = 'productCompany',
  PRODUCT = 'product',
}

export enum JobStatus {
  CREATED = 'CREATED',
  FAILED = 'FAILED',
  INPROGRESS = 'INPROGRESS',
  COMPLETED = 'COMPLETED',
}

export enum JobType {
  ORDER = 'ORDER',
  MENU_GENERATION = 'MENU_GENERATION',
  TASK_MENU_SYNC = 'TASK_MENU_SYNC',
  TASK_STORE_SYNC = 'TASK_STORE_SYNC',
}

export enum ContainerType {
  CATEGORY = 'CT',
  MULTIPART = 'MT',
  MULTISECTION = 'MS',
}

export enum GasType {
  LPG = 'LPG',
  NATURAL = 'NATURAL',
}

export enum ContainerAction {
  IS_PRODUCTCHECK = 'IS_PRODUCTCHECK',
  IS_ENABLE = 'IS_ENABLE',
  IS_DISABLE = 'IS_DISABLE',
}

export enum ProductStatus {
  DISABLE = 'DISABLE',
  PERMANENT_DISABLE = 'PERMANENT_DISABLE',
}

export enum LoyaltyType {
  DOLLAR = 'DOLLAR',
  POINT = 'POINT',
}

export enum CalenderThemeColor {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
  SUCCESS = 'success',
}
