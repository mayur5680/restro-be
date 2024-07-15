/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { StoreSectionTimeSlotOverrideController } from './store-section-time-slot-override.controller';
import { StoreSectionTimeSlotOverrideService } from './store-section-time-slot-override.service';
import { CreateStoreSectionTimeSlotOverrideDto } from './dto/create-store-section-time-slot-override.dto';
import { StoreSectionTimeSlotOverride } from './entities/store-section-time-slot-override.entity';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';

import { StoreSectionTimeSlotService } from '@modules/store-section-time-slot/store-section-time-slot.service';
import { Resto365RestaurantService } from '@modules/resto365-restaurant/resto365-restaurant.service';
import { StoreSectionTimeSlot } from '@modules/store-section-time-slot/entities/store-section-time-slot.entity';

class MockResto365RestaurantService {
  async findOne() {
    return { id: 'mockStoreId' };
  }

  async findOneByBhyveId() {
    return { id: 1 };
  }
}

class MockStoreSectionTimeSlotService {
  async findOne() {
    return { id: 1 };
  }
  async findByIds() {
    return [{ id: 1 }];
  }
}

describe('StoreSectionTimeSlotOverrideController', () => {
  let controller: StoreSectionTimeSlotOverrideController;
  let service: StoreSectionTimeSlotOverrideService;

  const mockUser = {} as Resto365User;
  const mockCorrelationId = 'string-string-string-string-string';
  const mockCreateStoreSectionTimeSlotOverrideDto: CreateStoreSectionTimeSlotOverrideDto[] =
    [
      {
        storeSectionTimeSlotId: 1,
        openingTime: '10:00',
        closingTime: '18:00',
        effectiveFrom: new Date(),
        effectiveTo: new Date(),
        reasonForOverride: 'example',
        storeStatus: 'OPEN',
      },
    ];

  const mockStoreSectionTimeSlotOverride: StoreSectionTimeSlotOverride = {
    id: 1,
    storeSectionTimeSlotId: 1,
    openingTime: '10:00',
    closingTime: '18:00',
    reasonForOverride: 'example',
    storeStatus: 'OPEN',
    _metadata: {
      auditUser: mockUser,
      correlationId: mockCorrelationId,
    },
    createdAt: undefined,
    createdBy: 0,
    updatedAt: undefined,
    updatedBy: 0,
    storeSectionTimeSlot: new StoreSectionTimeSlot(),
    effectiveFrom: undefined,
    effectiveTo: undefined,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreSectionTimeSlotOverrideController],
      providers: [
        {
          provide: StoreSectionTimeSlotOverrideService,
          useValue: {
            create: jest
              .fn()
              .mockResolvedValue([mockStoreSectionTimeSlotOverride]),
            findAll: jest
              .fn()
              .mockResolvedValue([mockStoreSectionTimeSlotOverride]),
            findOne: jest
              .fn()
              .mockResolvedValue(mockStoreSectionTimeSlotOverride),
            update: jest
              .fn()
              .mockResolvedValue(mockStoreSectionTimeSlotOverride),
            remove: jest
              .fn()
              .mockResolvedValue(mockStoreSectionTimeSlotOverride),
          },
        },
        {
          provide: Resto365RestaurantService,
          useClass: MockResto365RestaurantService,
        },
        {
          provide: StoreSectionTimeSlotService,
          useClass: MockStoreSectionTimeSlotService,
        },
      ],
    }).compile();

    controller = module.get<StoreSectionTimeSlotOverrideController>(
      StoreSectionTimeSlotOverrideController,
    );
    service = module.get<StoreSectionTimeSlotOverrideService>(
      StoreSectionTimeSlotOverrideService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
