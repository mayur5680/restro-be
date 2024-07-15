import { Test, TestingModule } from '@nestjs/testing';
import { StoreOrderOffsetOverrideService } from './store-order-offset-override.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoreOrderOffsetOverride } from './entities/store-order-offset-override.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateStoreOrderOffsetOverrideDto } from './dto/create-store-order-offset-override.dto';
import { UpdateStoreOrderOffsetOverrideDto } from './dto/update-store-order-offset-override.dto';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';
import { AuditParams } from 'src/shared/audit-logs.types';

describe('StoreOrderOffsetOverrideService', () => {
  let service: StoreOrderOffsetOverrideService;
  let repository: Repository<StoreOrderOffsetOverride>;

  const mockRestoUser = new Resto365User();

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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StoreOrderOffsetOverrideService,
        {
          provide: getRepositoryToken(StoreOrderOffsetOverride),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<StoreOrderOffsetOverrideService>(
      StoreOrderOffsetOverrideService,
    );
    repository = module.get<Repository<StoreOrderOffsetOverride>>(
      getRepositoryToken(StoreOrderOffsetOverride),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a store order offset override', async () => {
      // Test Data
      const createStoreOrderOffsetOverrideDto = [toreOrderOffsetOverrideDto];

      const mockStoreOrderOffsetOverrides = [
        new StoreOrderOffsetOverride(),
        new StoreOrderOffsetOverride(),
      ];

      jest.spyOn(repository, 'upsert').mockResolvedValue(
        Promise.resolve({
          generatedMaps: [],
          raw: {},
          identifiers: [], // Add empty identifiers property
        }),
      );
      jest
        .spyOn(service, 'findByIds')
        .mockResolvedValue(mockStoreOrderOffsetOverrides);

      const result = await service.create(
        createStoreOrderOffsetOverrideDto,
        mockRestoUser,
        {} as AuditParams,
      );
      expect(result).toEqual(mockStoreOrderOffsetOverrides);
    });
  });

  describe('findAll', () => {
    it('should return all store order offset overrides', async () => {
      // Test Data
      const mockedEntities = [
        new StoreOrderOffsetOverride(),
        new StoreOrderOffsetOverride(),
      ];

      // Mock Repository Method
      jest.spyOn(repository, 'find').mockResolvedValue(mockedEntities);

      // Expected Result
      const expectedResult = mockedEntities;

      const result = await service.findAll();
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findAllByStoreIdAndDayOfWeek', () => {
    it('should return all store order offset overrides by store ID', async () => {
      // Test Data
      const storeId = 1;
      const daysOfWeek = [1];
      const mockedEntities = [
        new StoreOrderOffsetOverride(),
        new StoreOrderOffsetOverride(),
      ];

      // Mock Repository Method
      jest.spyOn(repository, 'find').mockResolvedValue(mockedEntities);

      // Expected Result
      const expectedResult = mockedEntities;

      const result = await service.findAllByStoreIdAndDayOfWeek({
        store: storeId,
        daysOfWeek,
      });
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should return a store order offset override by ID', async () => {
      // Test Data
      const id = '1';
      const mockedEntity = new StoreOrderOffsetOverride();

      // Mock Repository Method
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockedEntity);

      // Expected Result
      const expectedResult = mockedEntity;

      const result = await service.findOne(id);
      expect(result).toEqual(expectedResult);
    });

    it('should throw an error if store order offset override not found', async () => {
      // Test Data
      const id = '1';

      // Mock Repository Method
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      // Expected Result
      const expectedError = new NotFoundException(
        `StoreOrderOffsetOverride with ID ${id} not found`,
      );

      try {
        await service.findOne(id);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(expectedError.message);
      }
    });
  });
  describe('update', () => {
    it('should throw an error if store order offset override to update is not found', async () => {
      // Test Data
      const id = '1';
      const updateStoreOrderOffsetOverrideDto: UpdateStoreOrderOffsetOverrideDto =
        {
          /* Provide update data */
        };

      // Mock Repository Method
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      // Expected Result
      const expectedError = new NotFoundException(
        `StoreOrderOffsetOverride with ID ${id} not found`,
      );

      try {
        await service.update(
          id,
          updateStoreOrderOffsetOverrideDto,
          mockRestoUser,
          {} as AuditParams,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(expectedError.message);
      }
    });
  });

  describe('remove', () => {
    it('should throw an error if store order offset override to remove is not found', async () => {
      // Test Data
      const id = '1';

      // Mock Repository Method
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      // Expected Result
      const expectedError = new NotFoundException(
        `StoreOrderOffsetOverride with ID ${id} not found`,
      );

      try {
        await service.remove(id);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(expectedError.message);
      }
    });
  });
});
