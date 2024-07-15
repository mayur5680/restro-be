import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resto365RestaurantService } from './resto365-restaurant.service';
import {
  Resto365Restaurant,
  Ownership,
} from './entities/resto365-restaurant.entity';
import { CreateResto365RestaurantDto } from './dto/create-resto365-restaurant.dto';
import { StoreService } from '@modules/store/store.service';
import { CreateStoreDto } from '@modules/store/dto/create-store.dto';
import { TagService } from '@modules/tag/tag.service';
import { StoreTagService } from '@modules/store-tag/store-tag.service';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';
import { GroupStoreService } from '@modules/group-store/group-store.service';
import { StoreChannelService } from '@modules/store-channel/store-channel.service';
import { ChannelGroupStoreService } from '@modules/channel-group-store/channel-group-store.service';
import { StoreOrderOffsetService } from '@modules/store-order-offset/store-order-offset.service';
import { MenuTemplateSectionOverrideService } from '@modules/menu-template-section-override/menu-template-section-override.service';
import { SectionService } from '@modules/section/section.service';
import { MenuContainerOverrideService } from '@modules/menu-container-override/menu-container-override.service';
import { MenuContainerService } from '@modules/menu-container/menu-container.service';
import { AuditParams } from 'src/shared/audit-logs.types';
import { ConfigService } from '@modules/config/config.service';
import { Resto365JobService } from '@modules/resto365-job/resto365-job.service';

import { ChannelGroupService } from '@modules/channel-group/channel-group.service';
import { ChannelGroupMenuTemplateService } from '@modules/channel-group-menu-template/channel-group-menu-template.service';
import { MenuTemplateService } from '@modules/menu-template/menu-template.service';
import { GasType } from 'src/context';

class MockStoreService {
  async create(createStoreDto: CreateStoreDto) {
    // Mock the creation of a store
    return { id: 'mockStoreId', ...createStoreDto };
  }

  async findById() {
    // Mock the finding of a store by id
    return { id: 'mockStoreId' };
  }

  async update() {
    // Mock the update method if needed
    return { id: 'mockStoreId' };
  }
}

class MockTagService {
  async create() {
    // Mock the creation of a tag
    return { id: 'mockTagId' };
  }
}

class MockStoreTagService {
  async create() {
    // Mock the creation of a store tag
    return { id: 'mockStoreTagId' };
  }
}

class MockGroupStoreService {
  async create() {
    // Mock the creation of a group store
    return { id: 1 };
  }
}

class MockStoreChannelService {
  async create() {
    // Mock the creation of a store channel
    return { id: 1 };
  }
}

class MockChannelGroupStoreService {
  async create() {
    // Mock the creation of a channel group store
    return { id: 1 };
  }
}

class MockStoreOrderOffsetService {
  async create() {
    // Mock the creation of a store order offset
    return { id: 1 };
  }
}

class MockMenuTemplateSectionOverrideService {
  async create() {
    // Mock the creation of a menu template section override
    return { id: 1 };
  }
}

class MockSectionService {
  async create() {
    // Mock the creation of a section
    return { id: 1 };
  }
}

class MockMenuContainerOverrideService {
  async create() {
    // Mock the creation of a menu container override
    return { id: 1 };
  }
}

class MockMenuContainerService {
  async create() {
    // Mock the creation of a menu container
    return { id: 1 };
  }
}

class MockConfigService {
  get() {
    return 'mockConfig';
  }
}

class MockResto365JobService {
  async create() {
    // Mock the creation of a job
    return { id: 1 };
  }
}

class MockChannelGroupService {
  async create() {
    // Mock the creation of a channel group
    return { id: 1 };
  }
}

class MockChannelGroupMenuTemplateService {
  async create() {
    // Mock the creation of a channel group menu template
    return { id: 1 };
  }
}

class MockMenuTemplateService {
  async create() {
    // Mock the creation of a menu template
    return { id: 1 };
  }
}

describe('Resto365RestaurantService', () => {
  let service: Resto365RestaurantService;
  let repository: Repository<Resto365Restaurant>;

  const mockRestaurantDto: CreateResto365RestaurantDto = {
    bhyveId: '',
    restaurantName: 'Test Restaurant',
    stateManagerOktaId: '',
    shortRestaurantName: 'Test Restaurant',
    fullRestaurantName: 'Test Restaurant',
    code: 'TEST',
    newCode: 'TEST',
    acronym: 'TR',
    openingDate: '2021-01-01',
    refurbishmentStartDate: '2021-01-01',
    refurbishmentEndDate: '2021-01-01',
    freeBurritos: '2021-01-01',
    closingDate: '2021-01-01',
    address1: 'Test Address',
    address2: 'Test Address',
    notableBuildingLocation: 'Test Building',
    ownership: Ownership.Corporate,
    suburb: '',
    postalCode: '',
    state: '',
    country: '',
    owner1FirstName: '',
    owner1LastName: '',
    owner1Email: '',
    owner1Mobile: '',
    owner2FirstName: '',
    owner2LastName: '',
    owner2Email: '',
    owner2Mobile: '',
    previousOwnership: '',
    previousOwner: '',
    legalEntity: '',
    abn: '',
    areaId: 0,
    restaurantManagerOktaId: '',
    restaurantManager: '',
    culinaryOpsCoachOktaId: '',
    culinaryOpsCoach: '',
    cAndOCoachPhoneNumber: '',
    stateManager: '',
    phoneNumber: '',
    extension: '',
    restaurantEmail: '',
    corporateRMEmail: '',
    numberOfTradingDays: '',
    monOpen: '',
    monClose: '',
    tueOpen: '',
    tueClose: '',
    wedOpen: '',
    wedClose: '',
    thuOpen: '',
    thurClose: '',
    friOpen: '',
    friClose: '',
    satOpen: '',
    satClose: '',
    sunOpen: '',
    sunClose: '',
    tradingHourChangeNotes: '',
    format: '',
    priceTier: '',
    doorDash: 0,
    menuLog: 0,
    uberEats: 0,
    breakfast: 0,
    coffee: 0,
    iceMachine: 0,
    icedCoffee: 0,
    liquor: 0,
    churro: 0,
    quesadillas: 0,
    softServe: 0,
    toilet: 0,
    wheelChairAccess: 0,
    courierInstructions: '',
    dineIn: 0,
    driveThru: 0,
    pickUp: 0,
    amexMid: '',
    tyroMid: '',
    subnet: '',
    internetPlan: '',
    coatesLocationId: '',
    nbnLocationId: '',
    crunchTimeLocationId: '',
    longitude: 13.1234,
    latitude: 13.1234,
    posHardware: '',
    posQty: '',
    totalEftposQty: '',
    dtEftposQty: '',
    organics: '',
    cardboard: '',
    containerDepositScheme: '',
    coMingledRecycled: '',
    solar: '',
    evCharging: '',
    otherSustainabilityInitiatives: '',
    comments: '',
    posStoreId: 0,
    oldStoreId: 0,
    description: '',
    timeZone: '',
    city: '',
    postCode: '',
    orderLink: '',
    cateringLink: '',
    storeAlertEmail: '',
    displayOrder: 0,
    isActive: 0,
    isTest: 0,
    inActiveReason: '',
    isFoodCourt: 0,
    maxOrderValue: 0,
    minOrderValue: 0,
    orderAlertValueThreshold: 0,
    syncLoyaltyDollars: 0,
    syncLoyaltyPoints: 0,
    googlePlaceId: '',
    gst: 0,
    isGstIncluded: 0,
    taxOfficeCode: '',
    brandSiteRestaurantLink: '',
    fax: '',
    orderingId: '',
    orderingName: '',
    campaignMonitorCode: '',
    primaryMarketingArea: '',
    trafficVolume: 0,
    additionalDetails: '',
    storeGroup: '',
    longDescription: '',
    formattedStoreName: '',
    disableStoreOrder: 0,
    isPermanentlyClosed: 0,
    pickupInstruction: '',
    groupId: 0,
    channelIds: [1, 2],
    gasType: GasType.LPG,
    seatingCapacity: 0,
  };

  const mockRestoUser = new Resto365User();
  const mockCorrelationId = '6546445-654654-6546546-654654-654654';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Resto365RestaurantService,
        {
          provide: getRepositoryToken(Resto365Restaurant, 'r365'),
          useClass: Repository,
        },
        {
          provide: StoreService,
          useClass: MockStoreService,
        },
        {
          provide: TagService,
          useClass: MockTagService,
        },
        {
          provide: StoreTagService,
          useClass: MockStoreTagService,
        },
        {
          provide: GroupStoreService,
          useClass: MockGroupStoreService,
        },
        {
          provide: StoreChannelService,
          useClass: MockStoreChannelService,
        },
        {
          provide: ChannelGroupStoreService,
          useClass: MockChannelGroupStoreService,
        },
        {
          provide: StoreOrderOffsetService,
          useClass: MockStoreOrderOffsetService,
        },
        {
          provide: MenuTemplateSectionOverrideService,
          useClass: MockMenuTemplateSectionOverrideService,
        },
        {
          provide: SectionService,
          useClass: MockSectionService,
        },
        {
          provide: MenuContainerOverrideService,
          useClass: MockMenuContainerOverrideService,
        },
        {
          provide: MenuContainerService,
          useClass: MockMenuContainerService,
        },
        {
          provide: ConfigService,
          useClass: MockConfigService,
        },
        {
          provide: Resto365JobService,
          useClass: MockResto365JobService,
        },
        {
          provide: ChannelGroupService,
          useClass: MockChannelGroupService,
        },
        {
          provide: ChannelGroupMenuTemplateService,
          useClass: MockChannelGroupMenuTemplateService,
        },
        {
          provide: MenuTemplateService,
          useClass: MockMenuTemplateService,
        },
      ],
    }).compile();

    service = module.get<Resto365RestaurantService>(Resto365RestaurantService);
    repository = module.get<Repository<Resto365Restaurant>>(
      getRepositoryToken(Resto365Restaurant, 'r365'),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a restaurant', async () => {
      jest
        .spyOn(repository, 'create')
        .mockReturnValue(new Resto365Restaurant());
      jest
        .spyOn(repository, 'save')
        .mockResolvedValue(new Resto365Restaurant());
      jest.spyOn(service, 'create').mockResolvedValue(new Resto365Restaurant());

      const result = await service.create(
        mockRestaurantDto,
        mockRestoUser,
        {} as AuditParams,
        '6546445-654654-6546546-654654-654654',
      );
      expect(result).toEqual(new Resto365Restaurant());
    });

    it('should throw an error if the store creation fails', async () => {
      jest
        .spyOn(repository, 'create')
        .mockReturnValue(new Resto365Restaurant());
      jest
        .spyOn(repository, 'save')
        .mockResolvedValue(new Resto365Restaurant());
      jest.spyOn(service, 'create').mockRejectedValue(new Error());

      await expect(
        service.create(
          mockRestaurantDto,
          mockRestoUser,
          {} as AuditParams,
          '6546445-654654-6546546-654654-654654',
        ),
      ).rejects.toThrowError();
    });

    it('should throw an error if the restaurant creation fails', async () => {
      jest
        .spyOn(repository, 'create')
        .mockReturnValue(new Resto365Restaurant());
      jest.spyOn(repository, 'save').mockRejectedValue(new Error());

      await expect(
        service.create(
          mockRestaurantDto,
          mockRestoUser,
          {} as AuditParams,
          '6546445-654654-6546546-654654-654654',
        ),
      ).rejects.toThrowError();
    });
  });

  describe('findAll', () => {
    it('should return an array of restaurants', async () => {
      const mockRestaurants = [
        new Resto365Restaurant(),
        new Resto365Restaurant(),
      ];
      jest.spyOn(repository, 'find').mockResolvedValue(mockRestaurants);

      const result = await service.findAll();
      expect(result).toEqual(mockRestaurants);
    });

    it('should return an empty array if no restaurants are found', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([]);

      const result = await service.findAll();
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a restaurant by id', async () => {
      const mockRestaurant = new Resto365Restaurant();
      mockRestaurant.id = 1;
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockRestaurant);

      const result = await service.findOne(1);
      expect(result).toEqual(mockRestaurant);
    });

    it('should throw NotFoundException if restaurant not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(service.findOne(1)).rejects.toThrowError();
    });
  });

  describe('findOneByBhyveId', () => {
    it('should return a restaurant by bhyveId', async () => {
      const mockRestaurant = new Resto365Restaurant();
      mockRestaurant.bhyveId = '12345';
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockRestaurant);

      const result = await service.findOneByBhyveId('12345');
      expect(result).toEqual(mockRestaurant);
    });

    it('should throw NotFoundException if restaurant not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(service.findOneByBhyveId('12345')).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it.skip('should update a restaurant', async () => {
      const mockRestaurant = new Resto365Restaurant();
      mockRestaurant.id = 1;
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockRestaurant);
      jest.spyOn(repository, 'save').mockResolvedValue(mockRestaurant);

      const result = await service.update(
        1,
        mockRestaurantDto,
        mockRestoUser,
        {} as AuditParams,
        mockCorrelationId,
      );
      expect(result).toEqual(mockRestaurant);
    });
    it('should throw NotFoundException if restaurant not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(
        service.update(
          1,
          mockRestaurantDto,
          mockRestoUser,
          {} as AuditParams,
          mockCorrelationId,
        ),
      ).rejects.toThrowError();
    });

    it('should throw an error if the update fails', async () => {
      const mockRestaurant = new Resto365Restaurant();
      mockRestaurant.id = 1;
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockRestaurant);
      jest.spyOn(repository, 'save').mockRejectedValue(new Error());

      await expect(
        service.update(
          1,
          mockRestaurantDto,
          mockRestoUser,
          {} as AuditParams,
          mockCorrelationId,
        ),
      ).rejects.toThrowError();
    });
  });
});
