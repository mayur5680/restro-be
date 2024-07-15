/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { StoreOrderOffsetOverrideController } from './store-order-offset-override.controller';
import { StoreOrderOffsetOverrideService } from './store-order-offset-override.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoreOrderOffsetOverride } from './entities/store-order-offset-override.entity';
import { CreateStoreOrderOffsetOverrideDto } from './dto/create-store-order-offset-override.dto';
import { UpdateStoreOrderOffsetOverrideDto } from './dto/update-store-order-offset-override.dto';
import { NotFoundException } from '@nestjs/common';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';

import { Resto365RestaurantService } from '@modules/resto365-restaurant/resto365-restaurant.service';

class MockResto365RestaurantService {
  async findOneByBhyveId() {
    return { id: 1 };
  }
}

describe('StoreOrderOffsetOverrideController', () => {
  let controller: StoreOrderOffsetOverrideController;
  let service: StoreOrderOffsetOverrideService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let repository: Repository<StoreOrderOffsetOverride>;

  const toreOrderOffsetOverrideDto: CreateStoreOrderOffsetOverrideDto = {
    storeId: 1,
    startTime: '08:00:00',
    endTime: '16:00:00',
    dayOfWeek: 1,
    effectiveFrom: new Date('2024-02-12T00:00:00'),
    effectiveTo: new Date('2024-02-18T23:59:59'),
    value: 10,
    offset: 2,
    isActive: true,
  };

  const mockRestoUser = new Resto365User();
  const mockCorrelationId = '12345678-1234-1234-1234-123456789abc';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreOrderOffsetOverrideController],
      providers: [
        StoreOrderOffsetOverrideService,
        {
          provide: getRepositoryToken(StoreOrderOffsetOverride),
          useClass: Repository,
        },
        {
          provide: Resto365RestaurantService,
          useClass: MockResto365RestaurantService,
        },
      ],
    }).compile();

    controller = module.get<StoreOrderOffsetOverrideController>(
      StoreOrderOffsetOverrideController,
    );
    service = module.get<StoreOrderOffsetOverrideService>(
      StoreOrderOffsetOverrideService,
    );
    repository = module.get<Repository<StoreOrderOffsetOverride>>(
      getRepositoryToken(StoreOrderOffsetOverride),
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
