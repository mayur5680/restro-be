import { Test, TestingModule } from '@nestjs/testing';
import { StoreOrderOffsetController } from './store-order-offset.controller';
import { StoreOrderOffsetService } from './store-order-offset.service';
import { StoreOrderOffset } from './entities/store-order-offset.entity';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';

import { CreateStoreOrderOffsetDto } from './dto/create-store-order-offset.dto';
import { UpdateStoreOrderOffsetDto } from './dto/update-store-order-offset.dto';
import { Resto365RestaurantService } from '@modules/resto365-restaurant/resto365-restaurant.service';

class MockResto365RestaurantService {
  async findOneByBhyveId() {
    return { id: 1 };
  }
}

class MockStoreOrderOffsetService {
  async findOne() {
    return { id: 1, storeId: 1 };
  }

  async create() {
    return;
  }

  async update() {
    return;
  }

  async delete() {
    return;
  }
}

describe('StoreOrderOffsetController', () => {
  let controller: StoreOrderOffsetController;
  let service: StoreOrderOffsetService;

  const mockUser = new Resto365User();
  const mockCorrelationId = '12345678-1234-1234-1234-123456789abc';

  const mockCreateStoreOrderOffsetDto: CreateStoreOrderOffsetDto = {
    storeId: 1,
    value: 100,
    offset: 10,
    isActive: true,
  };

  const mockUpdateStoreOrderOffsetDto: UpdateStoreOrderOffsetDto = {
    value: 100,
    offset: 10,
    isActive: true,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreOrderOffsetController],
      providers: [
        StoreOrderOffsetService,
        {
          provide: 'StoreOrderOffsetRepository',
          useClass: MockStoreOrderOffsetService,
        },
        {
          provide: Resto365RestaurantService,
          useClass: MockResto365RestaurantService,
        },
      ],
    }).compile();

    controller = module.get(StoreOrderOffsetController);
    service = module.get(StoreOrderOffsetService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of store order offsets', async () => {
      const result = [createSampleStoreOrderOffset()];

      jest.spyOn(service, 'findAllWithOverrides').mockResolvedValue(result);

      expect(
        await controller.findAll([1, 2], mockUser, mockCorrelationId),
      ).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a store order offset', async () => {
      const result = createSampleStoreOrderOffset();

      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne(1, mockUser, mockCorrelationId)).toBe(
        result,
      );
    });
  });

  describe('create', () => {
    it('should return a store order offset', async () => {
      const storeOrderOffset = mockCreateStoreOrderOffsetDto;
      const result = createSampleStoreOrderOffset();
      const restaurant = { id: 1 };

      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(
        await controller.create(storeOrderOffset, mockUser, mockCorrelationId),
      ).toEqual({
        data: result,
        _metadata: {
          entitySource: 'Restaurant',
          entitySourceId: restaurant.id,
          description: `Created Permanent Order Offset`,
        },
      });
    });
  });

  describe('update', () => {
    it('should return a store order offset', async () => {
      const storeOrderOffset = mockUpdateStoreOrderOffsetDto;
      const result = createSampleStoreOrderOffset();
      const restaurant = { id: 1 };

      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(
        await controller.update(
          1,
          storeOrderOffset,
          mockUser,
          mockCorrelationId,
        ),
      ).toEqual({
        data: result,
        _metadata: {
          entitySource: 'Restaurant',
          entitySourceId: restaurant.id,
          description: `Updated StoreOrderOffset`,
        },
      });
    });
  });

  describe('delete', () => {
    it('should return a success message', async () => {
      const deleteSpy = jest
        .spyOn(service, 'delete')
        .mockResolvedValue(Promise.resolve());

      const result = await controller.delete(1, mockUser, mockCorrelationId);

      expect(deleteSpy).toHaveBeenCalledWith(1, mockUser, mockCorrelationId);
      expect(result).toEqual({
        data: `Deleted StoreOrderOffset with id: 1`,
        _metadata: {
          entitySource: 'Restaurant',
          entitySourceId: 1,
          description: `Deleted StoreOrderOffset with id: 1`,
        },
      });
    });
  });

  function createSampleStoreOrderOffset(): StoreOrderOffset {
    return {
      id: 1,
      storeId: 1,
      value: 100,
      offset: 10,
      isActive: true,
      createdAt: new Date(),
      createdBy: 1,
      updatedAt: new Date(),
      updatedBy: 1,
      _metadata: {
        auditUser: mockUser,
        correlationId: mockCorrelationId,
      },
    };
  }
});
