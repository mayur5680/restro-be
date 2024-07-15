import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoreOrderOffset } from './entities/store-order-offset.entity';
import { UpdateStoreOrderOffsetDto } from './dto/update-store-order-offset.dto';
import { StoreOrderOffsetService } from './store-order-offset.service';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';
import { AuditParams } from 'src/shared/audit-logs.types';

describe('StoreOrderOffsetService', () => {
  let service: StoreOrderOffsetService;
  let repository: Repository<StoreOrderOffset>;

  const expectedResult: StoreOrderOffset[] = [
    {
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
        auditUser: new Resto365User(),
        correlationId: 'string-string-string-string-string',
      },
    },
  ];
  const mockRestoUser = new Resto365User();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StoreOrderOffsetService,
        {
          provide: getRepositoryToken(StoreOrderOffset),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<StoreOrderOffsetService>(StoreOrderOffsetService);
    repository = module.get<Repository<StoreOrderOffset>>(
      getRepositoryToken(StoreOrderOffset),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAllWithOverrides', () => {
    it('should return an array of store order offsets with overrides', async () => {
      const queryParams = { stores: [1] };
      jest.spyOn(repository, 'find').mockResolvedValue(expectedResult);

      const result = await service.findAllWithOverrides(
        queryParams,
        mockRestoUser,
        '564654-6546546-654654-654654-654654',
      );
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findAllByStoreId', () => {
    it('should return an array of store order offsets by store ID', async () => {
      const storeId = 1;
      jest.spyOn(repository, 'find').mockResolvedValue(expectedResult);

      const result = await service.findAllByStoreId(
        storeId,
        mockRestoUser,
        '564654-6546546-654654-654654-654654',
      );
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should return a store order offset by ID', async () => {
      const id = 1;
      jest.spyOn(repository, 'findOne').mockResolvedValue(expectedResult[0]);

      const result = await service.findOne(
        id,
        mockRestoUser,
        '564654-6546546-654654-654654-654654',
      );
      expect(result).toEqual(expectedResult[0]);
    });
  });

  describe('create', () => {
    it('should create a new store order offset', async () => {
      const data = {
        storeId: 1,
        value: 100,
        offset: 10,
        isActive: true,
        createdAt: new Date(),
        createdBy: 1,
        updatedAt: new Date(),
        updatedBy: 1,
      };
      const expectedResult = { id: 1, ...data };
      jest
        .spyOn(repository, 'create')
        .mockReturnValue(expectedResult as StoreOrderOffset);
      jest
        .spyOn(repository, 'save')
        .mockResolvedValue(expectedResult as StoreOrderOffset);

      const result = await service.create(
        data,
        mockRestoUser,
        '564654-6546546-654654-654654-654654',
        {} as AuditParams,
      );
      expect(result).toEqual(expectedResult);
    });
  });

  describe('update', () => {
    it('should update an existing store order offset', async () => {
      const id = 1;
      const data: UpdateStoreOrderOffsetDto = { value: 200 };
      const updatedStoreOrderOffset = {
        ...expectedResult[0],
        ...data,
        updatedBy: mockRestoUser.id,
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(expectedResult[0]);
      jest
        .spyOn(repository, 'save')
        .mockResolvedValue(updatedStoreOrderOffset as StoreOrderOffset);

      const result = await service.update(
        id,
        data,
        mockRestoUser,
        '564654-6546546-654654-654654-654654',
        {} as AuditParams,
      );
      expect(result).toEqual(updatedStoreOrderOffset);
    });
  });

  describe('delete', () => {
    it('should delete an existing store order offset', async () => {
      const id = 1;
      jest.spyOn(service, 'findOne').mockResolvedValue(expectedResult[0]);
      jest.spyOn(repository, 'remove').mockResolvedValue(undefined);

      await expect(
        service.delete(
          id,
          mockRestoUser,
          '564654-6546546-654654-654654-654654',
        ),
      ).resolves.not.toThrow();
    });
  });
});
