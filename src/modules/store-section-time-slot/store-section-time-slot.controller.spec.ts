import { Test, TestingModule } from '@nestjs/testing';
import { StoreSectionTimeSlotController } from './store-section-time-slot.controller';
import { StoreSectionTimeSlotService } from './store-section-time-slot.service';
import { CreateStoreSectionTimeSlotDto } from './dto/create-store-section-time-slot.dto';
import { StoreSectionTimeSlot } from './entities/store-section-time-slot.entity';
import { NotFoundException } from '@nestjs/common';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';
import { Store } from '@modules/store/entities/store.entity';
import { Section } from '@modules/section/entities/section.entity';
import { Resto365RestaurantService } from '@modules/resto365-restaurant/resto365-restaurant.service';

class MockResto365RestaurantService {
  async findOne() {
    return { id: 'mockStoreId' };
  }

  async findOneByBhyveId() {
    return { id: 1 };
  }
}

describe('StoreSectionTimeSlotController', () => {
  let controller: StoreSectionTimeSlotController;
  let service: StoreSectionTimeSlotService;

  const mockUser = new Resto365User();
  const mockCorrelationId = '12345678-1234-1234-1234-123456789abc';
  const mockCreateStoreSectionTimeSlotDto: CreateStoreSectionTimeSlotDto[] = [
    {
      storeId: 1,
      sectionId: 1,
      dayOfWeek: 1,
      openingTime: '10:00',
      closingTime: '18:00',
      type: 'example',
      isActive: true,
    },
  ];

  const mockStoreSectionTimeSlot: StoreSectionTimeSlot = {
    id: 1,
    storeId: 1,
    sectionId: 1,
    dayOfWeek: 1,
    openingTime: '10:00',
    closingTime: '18:00',
    type: 'example',
    isActive: true,
    store: new Store(),
    section: new Section(),
    overrides: [],
    _metadata: {
      auditUser: mockUser,
      correlationId: mockCorrelationId,
    },
    createdAt: undefined,
    createdBy: 0,
    updatedAt: undefined,
    updatedBy: 0,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreSectionTimeSlotController],
      providers: [
        {
          provide: StoreSectionTimeSlotService,
          useValue: {
            create: jest.fn().mockResolvedValue([mockStoreSectionTimeSlot]),
            findAllWithOverrides: jest
              .fn()
              .mockResolvedValue([mockStoreSectionTimeSlot]),
            findOneWithOverrides: jest
              .fn()
              .mockResolvedValue(mockStoreSectionTimeSlot),
            update: jest.fn().mockResolvedValue(mockStoreSectionTimeSlot),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
        {
          provide: Resto365RestaurantService,
          useClass: MockResto365RestaurantService,
        },
      ],
    }).compile();

    controller = module.get<StoreSectionTimeSlotController>(
      StoreSectionTimeSlotController,
    );
    service = module.get<StoreSectionTimeSlotService>(
      StoreSectionTimeSlotService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all store section time slots', async () => {
      const result = await controller.findAll([1], [1], [1], mockCorrelationId);
      expect(result).toEqual([mockStoreSectionTimeSlot]);
    });
  });

  describe('findOne', () => {
    it('should return a specific store section time slot', async () => {
      const result = await controller.findOne(1, mockCorrelationId);
      expect(result).toEqual(mockStoreSectionTimeSlot);
    });

    it('should throw an error if the store section time slot is not found', async () => {
      jest.spyOn(service, 'findOneWithOverrides').mockResolvedValue(undefined);
      await expect(
        controller.findOne(1, mockCorrelationId),
      ).rejects.toThrowError(
        new NotFoundException(`StoreSectionTimeSlot with id 1 not found`),
      );
    });
  });

  describe('create', () => {
    it('should create a store section time slot', async () => {
      const storeSectionTimeSlot = new StoreSectionTimeSlot();

      jest.spyOn(service, 'create').mockResolvedValue([storeSectionTimeSlot]);
      const result = await controller.create(
        mockCreateStoreSectionTimeSlotDto,
        mockUser,
        mockCorrelationId,
      );

      expect(result).toEqual({
        data: [storeSectionTimeSlot],
        _metadata: {
          entitySource: 'Restaurant',
          entitySourceId: 1,
          description: 'StoreSectionTimeSlot created successfully',
        },
      });
    });
    it('should throw an error if the store section time slot is not created', async () => {
      jest.spyOn(service, 'create').mockRejectedValue(new Error());
      await expect(
        controller.create(
          mockCreateStoreSectionTimeSlotDto,
          mockUser,
          mockCorrelationId,
        ),
      ).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should update a store section time slot', async () => {
      const storeSectionTimeSlot = new StoreSectionTimeSlot();

      jest.spyOn(service, 'update').mockResolvedValue(storeSectionTimeSlot);
      const result = await controller.update(
        1,
        { openingTime: '09:00' },
        mockUser,
        mockCorrelationId,
      );

      expect(result).toEqual({
        data: storeSectionTimeSlot,
        _metadata: {
          entitySource: 'Restaurant',
          entitySourceId: 1,
          description: 'StoreSectionTimeSlot updated successfully',
        },
      });
    });
    it('should throw an error if the store section time slot is not updated', async () => {
      jest.spyOn(service, 'update').mockRejectedValue(new Error());
      await expect(
        controller.update(
          1,
          { openingTime: '09:00' },
          mockUser,
          mockCorrelationId,
        ),
      ).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    it('should delete a store section time slot', async () => {
      const result = await controller.remove(1, mockUser, mockCorrelationId);
      expect(result).toEqual({
        data: 'StoreSectionTimeSlot with id 1 deleted successfully',
        _metadata: {
          entitySource: 'Restaurant',
          entitySourceId: 1,
          description: 'StoreSectionTimeSlot deleted successfully',
        },
      });
    });
    it('should throw an error if the store section time slot is not deleted', async () => {
      jest.spyOn(service, 'remove').mockRejectedValue(new Error());
      await expect(
        controller.remove(1, mockUser, mockCorrelationId),
      ).rejects.toThrowError();
    });
  });
});
