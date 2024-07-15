import moment from 'moment';

export enum SectionList {
  Breakfast = 1,
  Mainmenu = 2,
  BreakfastMIAM = 20,
  MainmenuMIAM = 11,
}

export function isMiamTimeSlot(storeSectionTimeSlot: {
  sectionId: SectionList;
}) {
  return (
    storeSectionTimeSlot.sectionId === SectionList.BreakfastMIAM ||
    storeSectionTimeSlot.sectionId === SectionList.MainmenuMIAM
  );
}

export function filterFromStoreServices(
  restaurant: { breakfast: number; overnightService: number },
  storeSectionTimeSlot: {
    sectionId: SectionList;
    openingTime: string;
    closingTime: string;
  }[],
) {
  return storeSectionTimeSlot.filter((storeSectionTimeSlot) => {
    if (
      !Boolean(restaurant.breakfast) &&
      (storeSectionTimeSlot.sectionId === SectionList.Breakfast ||
        storeSectionTimeSlot.sectionId === SectionList.BreakfastMIAM)
    ) {
      return false;
    }
    if (
      !Boolean(restaurant.overnightService) &&
      (storeSectionTimeSlot.sectionId === SectionList.Mainmenu ||
        storeSectionTimeSlot.sectionId === SectionList.MainmenuMIAM) &&
      isMidnight(storeSectionTimeSlot.openingTime)
    ) {
      return false;
    }
    return true;
  });
}

export const isMidnight = (timeString: string) => {
  return timeString === '00:00:00' || timeString === '00:00';
};

export function checkTimeSlotOverlap(
  currentTimeSlot: { openingTime: string; closingTime: string },
  existingTimeSlots: { openingTime: string; closingTime: string }[],
) {
  const currentPeriod = {
    from: moment(currentTimeSlot.openingTime, 'HH:mm'),
    to: moment(currentTimeSlot.closingTime, 'HH:mm'),
  };
  const periods = existingTimeSlots.map((m) => ({
    from: moment(m.openingTime, 'HH:mm'),
    to: moment(m.closingTime, 'HH:mm'),
  }));

  for (let i = 0; i < periods.length; i++) {
    const thisPeriod = periods[i];
    if (
      currentPeriod.from.isBetween(
        thisPeriod.from,
        thisPeriod.to,
        undefined,
        '[]',
      ) ||
      currentPeriod.to.isBetween(
        thisPeriod.from,
        thisPeriod.to,
        undefined,
        '[]',
      )
    ) {
      return true;
    }
  }
  return false;
}
