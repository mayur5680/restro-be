import { Test, TestingModule } from '@nestjs/testing';
import { Resto365CerebroProductCompanyController } from './resto365-cerebro-product-company.controller';
import { Resto365CerebroProductCompanyService } from './resto365-cerebro-product-company.service';
import { Resto365CerebroProductCompany } from './entities/resto365-cerebro-product-company.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpException } from '@nestjs/common';
import { Resto365CerebroSyncService } from '@modules/resto365-cerebro-sync/resto365-cerebro-sync.service';
import { Resto365CerebroProductsService } from '@modules/resto365-cerebro-products/resto365-cerebro-products.service';
import { StoreService } from '@modules/store/store.service';
import { ChannelGroupService } from '@modules/channel-group/channel-group.service';
import { MenuContainerProductService } from '@modules/menu-container-product/menu-container-product.service';
import { MenuContainerProductOverrideService } from '@modules/menu-container-product-override/menu-container-product-override.service';
import { ChannelGroupStoreService } from '@modules/channel-group-store/channel-group-store.service';
import { ConfigService } from '@modules/config/config.service';
import { CerebroLazyLoadService } from '@modules/resto365-cerebro-lazy-loader/resto365-cerebro-lazy-loader.service';
import { Resto365RestaurantService } from '@modules/resto365-restaurant/resto365-restaurant.service';
import { Resto365JobService } from '@modules/resto365-job/resto365-job.service';
import { MenuContainerService } from '@modules/menu-container/menu-container.service';
import { MenuContainerOverrideService } from '@modules/menu-container-override/menu-container-override.service';
import { Resto365NotificationService } from '@modules/resto365-notification/resto365-notification.service';
import { Resto365CerebroProductCompanyOverrideService } from '@modules/resto365-cerebro-product-company-override/resto365-cerebro-product-company-override.service';

class MockStoreService {
  async findAll() {
    return [];
  }
}

class MockCrunchSyncService {
  async findByName() {
    // Mock the finding of a store by id
    return { name: 'productCompany' };
  }
}

const mockConfigService = {
  get bhyveConfig() {
    return {
      bhvyeHttp: 'https://api-internal.test.apps.gyg.com.au/dev',
    };
  },
};

describe('CerebroProductCompanyController', () => {
  let controller: Resto365CerebroProductCompanyController;
  let service: Resto365CerebroProductCompanyService;
  let repository: Repository<Resto365CerebroProductCompany>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Resto365CerebroProductCompanyController],
      providers: [
        Resto365CerebroProductCompanyService,
        {
          provide: getRepositoryToken(Resto365CerebroProductCompany, 'r365'),
          useClass: Repository,
        },
        {
          provide: Resto365CerebroProductsService,
          useClass: MockStoreService,
        },
        {
          provide: Resto365CerebroSyncService,
          useClass: MockCrunchSyncService,
        },
        {
          provide: CerebroLazyLoadService,
          useValue: {},
        },
        { provide: StoreService, useClass: MockStoreService },
        { provide: ChannelGroupService, useClass: MockStoreService },
        {
          provide: MenuContainerProductService,
          useClass: MockStoreService,
        },
        {
          provide: ChannelGroupStoreService,
          useClass: MockStoreService,
        },
        {
          provide: MenuContainerProductOverrideService,
          useClass: MockStoreService,
        },
        {
          provide: Resto365RestaurantService,
          useValue: MockStoreService,
        },
        {
          provide: Resto365JobService,
          useValue: MockStoreService,
        },
        {
          provide: MenuContainerService,
          useValue: MockStoreService,
        },
        {
          provide: MenuContainerOverrideService,
          useValue: MockStoreService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
        {
          provide: Resto365NotificationService,
          useValue: {},
        },
        {
          provide: Resto365CerebroProductCompanyOverrideService,
          useValue: MockStoreService,
        },
      ],
    }).compile();

    controller = module.get<Resto365CerebroProductCompanyController>(
      Resto365CerebroProductCompanyController,
    );
    service = module.get<Resto365CerebroProductCompanyService>(
      Resto365CerebroProductCompanyService,
    );
    repository = module.get<Repository<Resto365CerebroProductCompany>>(
      getRepositoryToken(Resto365CerebroProductCompany, 'r365'),
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of productCompany', async () => {
      const mockResult = [
        new Resto365CerebroProductCompany(),
        new Resto365CerebroProductCompany(),
      ];
      jest.spyOn(repository, 'find').mockResolvedValue(mockResult);

      const result = await service.findAll();
      expect(result).toEqual(mockResult);
    });

    it('should return an empty array if no productCompany are found', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([]);

      const result = await service.findAll();
      expect(result).toEqual([]);
    });
  });

  describe('findById', () => {
    it('should return a CerebroProductCompany', async () => {
      const result: Resto365CerebroProductCompany =
        new Resto365CerebroProductCompany();
      jest.spyOn(service, 'findById').mockResolvedValue(result);

      expect(await service.findById(1)).toBe(result);
    });

    it('should throw HttpException if CerebroProductCompany not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.findById(1)).rejects.toThrowError(HttpException);
    });
  });
});
