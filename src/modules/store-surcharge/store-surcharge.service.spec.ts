import { Test, TestingModule } from '@nestjs/testing';
import { StoreSurchargeService } from './store-surcharge.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { StoreSurcharge } from './entities/store-surcharge.entity';
import { Repository } from 'typeorm';
import { Store } from '@modules/store/entities/store.entity';
import { CreateStoreSurchargeDto } from './dto/create-store-surcharge.dto';

export const providers = [
  StoreSurchargeService,
  {
    provide: getRepositoryToken(StoreSurcharge),
    useClass: Repository,
  },
  {
    provide: getRepositoryToken(Store),
    useClass: Repository,
  },
];

describe('StoreSurchargeService', () => {
  let service: StoreSurchargeService;
  let storeSurchargeRepository: Repository<StoreSurcharge>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers,
    }).compile();

    service = module.get<StoreSurchargeService>(StoreSurchargeService);
    storeSurchargeRepository = module.get<Repository<StoreSurcharge>>(
      getRepositoryToken(StoreSurcharge),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create', () => {
    it('should create a store surcharge', async () => {
      const date = new Date();
      const storeSurcharge = {
        storeId: 1,
        name: 'Test Surcharge',
        amount: 10,
        startDateTime: date,
        endDateTime: date,
      };

      const store = {
        id: 1,
        timeZone: 'Australia/Sydney',
      };

      jest
        .spyOn(storeSurchargeRepository, 'create')
        .mockReturnValue(storeSurcharge as unknown as StoreSurcharge);

      jest
        .spyOn(storeSurchargeRepository, 'save')
        .mockResolvedValue(storeSurcharge as unknown as StoreSurcharge);

      jest
        .spyOn(service['storeRepository'], 'findOne')
        .mockResolvedValue(store as Store);

      const result = await service.create(
        storeSurcharge as unknown as CreateStoreSurchargeDto,
      );

      expect(result).toEqual({
        ...storeSurcharge,
        startDateTime: storeSurcharge.startDateTime,
        endDateTime: storeSurcharge.endDateTime,
      });
    });

    it('should throw an error if store is not found', async () => {
      const date = new Date();
      const storeSurcharge = {
        storeId: 1,
        name: 'Test Surcharge',
        amount: 10,
        startDateTime: date,
        endDateTime: date,
      };

      jest
        .spyOn(service['storeRepository'], 'findOne')
        .mockResolvedValue(undefined);

      await expect(
        service.create(storeSurcharge as unknown as CreateStoreSurchargeDto),
      ).rejects.toThrowError('Invalid Store: 1');
    });
  });
  describe('findAll', () => {
    it('should return all store surcharges', async () => {
      const storeSurcharges: StoreSurcharge[] = [
        {
          id: '11223344-5556-7788-9999-000000000000',
          storeId: 1,
          name: 'Test Surcharge',
          description: 'Test Surcharge',
          surchargePercentage: 15,
          surchargeAmount: 10,
          startDateTime: new Date().toDateString(),
          endDateTime: new Date().toDateString(),
          isActive: true,
          isVisibleForCustomer: true,
          definitionId: 1,
          posPlu: 1,
          createdAt: new Date(),
          createdBy: 1,
          updatedAt: new Date(),
          updatedBy: 1,
          deletedAt: null,
          store: null,
        },
      ];

      const response = {
        data: storeSurcharges,
        meta: {
          totalRows: 1,
          pages: 1,
        },
      };

      jest
        .spyOn(storeSurchargeRepository, 'findAndCount')
        .mockResolvedValue([storeSurcharges, 1]);

      const result = await service.findAll({
        take: 10,
        skip: 0,
        sortBy: 'name',
      });

      expect(result).toEqual(response);
    });
  });
});
