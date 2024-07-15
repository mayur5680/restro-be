import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { StoreSectionTimeSlotService } from './store-section-time-slot.service';
import { StoreSectionTimeSlot } from './entities/store-section-time-slot.entity';
import { CreateStoreSectionTimeSlotDto } from './dto/create-store-section-time-slot.dto';
import { Repository } from 'typeorm';
import { StoreSectionTimeSlotOverrideService } from '@modules/store-section-time-slot-override/store-section-time-slot-override.service';
import { StoreSectionTimeSlotOverride } from '@modules/store-section-time-slot-override/entities/store-section-time-slot-override.entity';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';
import { AuditParams } from 'src/shared/audit-logs.types';
import { Resto365RestaurantService } from '@modules/resto365-restaurant/resto365-restaurant.service';
import {
  SectionList,
  checkTimeSlotOverlap,
  filterFromStoreServices,
} from './common';

describe('StoreSectionTimeSlotService', () => {
  let service: StoreSectionTimeSlotService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let repository: Repository<StoreSectionTimeSlot>;

  const mockRepository = {
    save: jest.fn(),
    upsert: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
  };

  const storeSectionTimeSlotDto: CreateStoreSectionTimeSlotDto = {
    storeId: 0,
    sectionId: 0,
    dayOfWeek: 0,
    openingTime: '10:30:00',
    closingTime: '22:55:00',
    type: '',
    isActive: false,
  };

  const mockRestoUser = new Resto365User();
  const mockAuditParams: AuditParams = {
    _metadata: {
      auditUser: mockRestoUser,
      correlationId: '1238-8888-8888-8888-8888',
    },
  };

  const mockStoreSectionTimeSlots = [
    {
      sectionId: SectionList.Breakfast,
      openingTime: '05:00',
      closingTime: '10:00',
    },
    {
      sectionId: SectionList.BreakfastMIAM,
      openingTime: '05:00',
      closingTime: '10:00',
    },
    {
      sectionId: SectionList.Mainmenu,
      openingTime: '10:00',
      closingTime: '22:00',
    },
    {
      sectionId: SectionList.MainmenuMIAM,
      openingTime: '10:00',
      closingTime: '22:00',
    },
    {
      sectionId: SectionList.Mainmenu,
      openingTime: '00:00',
      closingTime: '04:00',
    },
    {
      sectionId: SectionList.MainmenuMIAM,
      openingTime: '00:00',
      closingTime: '04:00',
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StoreSectionTimeSlotService,
        {
          provide: getRepositoryToken(StoreSectionTimeSlot),
          useValue: mockRepository,
        },
        StoreSectionTimeSlotOverrideService,
        {
          provide: getRepositoryToken(StoreSectionTimeSlotOverride),
          useClass: Repository, // Adjust as needed
        },
        {
          provide: Resto365RestaurantService,
          useValue: {
            findOneByBhyveId: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<StoreSectionTimeSlotService>(
      StoreSectionTimeSlotService,
    );
    repository = module.get<Repository<StoreSectionTimeSlot>>(
      getRepositoryToken(StoreSectionTimeSlot),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a store section time slot', async () => {
      const mockStoreSectionTimeSlot = new StoreSectionTimeSlot();
      mockStoreSectionTimeSlot.id = 1;

      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(undefined);
      jest
        .spyOn(repository, 'save')
        .mockResolvedValueOnce(mockStoreSectionTimeSlot);
      jest
        .spyOn(service, 'checkStoreSectionTimeslotOverlap')
        .mockResolvedValueOnce(false);
      const result = await service.create(
        [storeSectionTimeSlotDto],
        mockRestoUser,
        mockAuditParams,
      );

      expect(result).toEqual([mockStoreSectionTimeSlot]);
      expect(repository.findOne).toHaveBeenCalledTimes(1);
      expect(repository.save).toHaveBeenCalledTimes(1);
    });

    it('should not create a store section time slot if it already exists', async () => {
      const existingRecord = new StoreSectionTimeSlot();
      existingRecord.id = 1;

      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(existingRecord);
      jest
        .spyOn(service, 'checkStoreSectionTimeslotOverlap')
        .mockResolvedValueOnce(false);
      const result = await service.create(
        [storeSectionTimeSlotDto],
        mockRestoUser,
        mockAuditParams,
      );

      expect(result).toEqual([]);
      expect(repository.findOne).toHaveBeenCalledTimes(1);
      expect(repository.save).not.toHaveBeenCalled();
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findByIds', () => {
    it('should find store section time slots by ids', async () => {
      mockRepository.find.mockResolvedValueOnce([storeSectionTimeSlotDto]);

      const result = await service.findByIds([1]);

      expect(result).toEqual([storeSectionTimeSlotDto]);
    });
  });

  describe('findAllWithOverrides', () => {
    it('should find all store section time slots with overrides', async () => {
      mockRepository.find.mockResolvedValueOnce([storeSectionTimeSlotDto]);

      const result = await service.findAllWithOverrides({
        stores: [1],
        sections: [1],
        dayOfWeeks: [1],
      });

      expect(result).toEqual([storeSectionTimeSlotDto]);
    });
  });

  describe('checkStoreSectionTimeSlotOverlap', () => {
    it('should return true, if a mid night menu time slot overlaps with a breakfast menu timeslot', () => {
      const currentTimeSlot = {
        openingTime: '00:00',
        closingTime: '05:00',
      };
      const existingTimeSlots = [
        { openingTime: '04:00', closingTime: '10:30' },
        { openingTime: '10:31', closingTime: '22:30' },
      ];

      const result = checkTimeSlotOverlap(currentTimeSlot, existingTimeSlots);

      expect(result).toEqual(true);
    });

    it('should return false, if a mid night menu time slot does not overlap with a breakfast menu timeslot', () => {
      const currentTimeSlot = {
        openingTime: '00:00',
        closingTime: '05:00',
      };
      const existingTimeSlots = [
        { openingTime: '05:01', closingTime: '10:30' },
        { openingTime: '10:31', closingTime: '22:30' },
      ];

      const result = checkTimeSlotOverlap(currentTimeSlot, existingTimeSlots);

      expect(result).toEqual(false);
    });
  });

  describe('filterFromStoreServices', () => {
    it('it should not return breakfast menu time slots if breakfast service is disabled', () => {
      const restaurant = { breakfast: 0, overnightService: 1 };
      const storeSectionTimeSlots = [...mockStoreSectionTimeSlots];

      const result = filterFromStoreServices(restaurant, storeSectionTimeSlots);

      expect(result).toEqual([
        {
          sectionId: SectionList.Mainmenu,
          openingTime: '10:00',
          closingTime: '22:00',
        },
        {
          sectionId: SectionList.MainmenuMIAM,
          openingTime: '10:00',
          closingTime: '22:00',
        },
        {
          sectionId: SectionList.Mainmenu,
          openingTime: '00:00',
          closingTime: '04:00',
        },
        {
          sectionId: SectionList.MainmenuMIAM,
          openingTime: '00:00',
          closingTime: '04:00',
        },
      ]);
    });
    it('it should not return midnight menu time slots if overnight service is disabled', () => {
      const restaurant = { breakfast: 1, overnightService: 0 };
      const storeSectionTimeSlots = [...mockStoreSectionTimeSlots];

      const result = filterFromStoreServices(restaurant, storeSectionTimeSlots);

      expect(result).toEqual([
        {
          sectionId: SectionList.Breakfast,
          openingTime: '05:00',
          closingTime: '10:00',
        },
        {
          sectionId: SectionList.BreakfastMIAM,
          openingTime: '05:00',
          closingTime: '10:00',
        },
        {
          sectionId: SectionList.Mainmenu,
          openingTime: '10:00',
          closingTime: '22:00',
        },
        {
          sectionId: SectionList.MainmenuMIAM,
          openingTime: '10:00',
          closingTime: '22:00',
        },
      ]);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
