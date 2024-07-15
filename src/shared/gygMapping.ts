import { TagAttribute } from 'src/context/enum';

export const tagIdsMapping = (createdRestaurant) => {
  return {
    [TagAttribute.Liquor]: createdRestaurant.liquor,
    [TagAttribute.Coffee]: createdRestaurant.coffee,
    [TagAttribute.Breakfast]: createdRestaurant.breakfast,
    [TagAttribute.DriveThru]: createdRestaurant.driveThru,
    [TagAttribute.WheelChairAccess]: createdRestaurant.wheelChairAccess,
    [TagAttribute.PickUp]: createdRestaurant.pickUp,
    [TagAttribute.DineIn]: createdRestaurant.dineIn,
  };
};

export const mappTagIds = () => {
  return {
    [TagAttribute.Liquor]: 'liquor',
    [TagAttribute.Coffee]: 'coffee',
    [TagAttribute.Breakfast]: 'breakfast',
    [TagAttribute.DriveThru]: 'driveThru',
    [TagAttribute.WheelChairAccess]: 'wheelChairAccess',
    [TagAttribute.PickUp]: 'pickUp',
    [TagAttribute.DineIn]: 'dineIn',
  };
};

export const mapPermanentOffsetAndValue = () => {
  return [
    { value: 0, offset: 4 },
    { value: 60, offset: 7 },
    { value: 120, offset: 10 },
    { value: 200, offset: 20 },
    { value: 300, offset: 30 },
    { value: 400, offset: 44 },
  ];
};

export const mapBreakfastSectionIds = () => {
  return [1, 20];
};

export const mapHotDrinksSectionIds = () => {
  return [13, 19];
};

export const mapDessertSectionIds = () => {
  return [10];
};

export const icedCoffeePosPlus = () => {
  return [31480040, 31480041, 31480042, 31480043];
};

export const softServePosPlus = () => {
  return [31480038, 31480044, 31480036];
};

// PosPlus for Churro
export const mapChurroPosPlus = () => {
  return [31480032];
};

// PosPlus for Churro Sandea
export const mapChurroSandeaPosPlus = () => {
  return [31480037];
};

export const setGroupIdBasedOnPriceTier = (priceTier: string) => {
  switch (priceTier) {
    case 'T1':
      return 5;
    case 'T2':
      return 6;
    default:
      throw new Error('Invalid price tier');
  }
};

export const PRICE_TIER_CONSTANTS = {
  T1_APP_WEB: {
    groupId: 5,
    menuTemplateId: 4,
    posMenuId: 7,
  },
  T1_IN_APP_DEL: {
    groupId: 5,
    menuTemplateId: 7,
    posMenuId: 5,
  },
  T2_APP_WEB: {
    groupId: 6,
    menuTemplateId: 6,
    posMenuId: 8,
  },
  T2_IN_APP_DEL: {
    groupId: 6,
    menuTemplateId: 8,
    posMenuId: 6,
  },
};
// Mapp channelIds to menuTemplateIds and posMenuIds for AppWeb and InAppDel based on priceTier and channelId
export const mapChannelIdsToMenuTemplateIdsAndPosMenuIds = (
  channelId: number,
  priceTier: string,
) => {
  switch (channelId) {
    case 1:
      switch (priceTier) {
        case 'T1':
          return PRICE_TIER_CONSTANTS.T1_APP_WEB;
        case 'T2':
          return PRICE_TIER_CONSTANTS.T2_APP_WEB;
        default:
          throw new Error("Invalid price tier/channelId for channel 'APP_WEB'");
      }
    case 4:
      switch (priceTier) {
        case 'T1':
          return PRICE_TIER_CONSTANTS.T1_IN_APP_DEL;
        case 'T2':
          return PRICE_TIER_CONSTANTS.T2_IN_APP_DEL;
        default:
          throw new Error(
            "Invalid price tier/channelId for channel 'IN_APP_DEL'",
          );
      }
    default:
      throw new Error('Invalid channelId');
  }
};

export const transformationTemplateId = 2;
