import { Test, TestingModule } from '@nestjs/testing';
import { StoreSectionTimeSlotOverrideService } from './store-section-time-slot-override.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoreSectionTimeSlotOverride } from './entities/store-section-time-slot-override.entity';
import { CreateStoreSectionTimeSlotOverrideDto } from './dto/create-store-section-time-slot-override.dto';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';
import { AuditParams } from 'src/shared/audit-logs.types';

describe('StoreSectionTimeSlotOverrideService', () => {
  let service: StoreSectionTimeSlotOverrideService;
  let repository: Repository<StoreSectionTimeSlotOverride>;

  const storeSectionTimeSlotOverrideDto: CreateStoreSectionTimeSlotOverrideDto =
    {
      storeSectionTimeSlotId: 1,
      openingTime: '10:00:00',
      closingTime: '20:00:00',
      effectiveFrom: new Date(),
      effectiveTo: new Date(),
      reasonForOverride: 'Test',
      storeStatus: 'OPEN',
    };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StoreSectionTimeSlotOverrideService,
        {
          provide: getRepositoryToken(StoreSectionTimeSlotOverride),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<StoreSectionTimeSlotOverrideService>(
      StoreSectionTimeSlotOverrideService,
    );
    repository = module.get<Repository<StoreSectionTimeSlotOverride>>(
      getRepositoryToken(StoreSectionTimeSlotOverride),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a store section time slot override', async () => {
      const storeSectionTimeSlotOverrideId = 1;
      const mockStoreSectionTimeSlotOverride =
        new StoreSectionTimeSlotOverride();
      mockStoreSectionTimeSlotOverride.id = storeSectionTimeSlotOverrideId;

      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(mockStoreSectionTimeSlotOverride);

      const result = await service.findOne(storeSectionTimeSlotOverrideId);

      expect(result).toEqual(mockStoreSectionTimeSlotOverride);
    });

    it('should throw NotFoundException if store section time slot override is not found', async () => {
      const storeSectionTimeSlotOverrideId = 1;

      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(
        service.findOne(storeSectionTimeSlotOverrideId),
      ).rejects.toThrowError(
        `StoreSectionTimeSlotOverride with id ${storeSectionTimeSlotOverrideId} not found`,
      );
    });
  });

  describe('findAllByStoreSectionTimeSlotId', () => {
    it('should return store section time slot overrides by storeSectionTimeSlotId', async () => {
      const storeSectionTimeSlotId = 1;
      const mockStoreSectionTimeSlotOverrides = [
        new StoreSectionTimeSlotOverride(),
        new StoreSectionTimeSlotOverride(),
      ];

      jest
        .spyOn(repository, 'find')
        .mockResolvedValue(mockStoreSectionTimeSlotOverrides);

      const result = await service.findAllByStoreSectionTimeSlotId(
        storeSectionTimeSlotId,
      );

      expect(result).toEqual(mockStoreSectionTimeSlotOverrides);
    });
  });

  describe('create', () => {
    it.skip('should create store section time slot overrides', async () => {
      const createStoreSectionTimeSlotOverrideDto = [
        storeSectionTimeSlotOverrideDto,
      ];
      const mockRestoUser = new Resto365User();
      mockRestoUser.id = 1;
      const mockStoreSectionTimeSlotOverride =
        new StoreSectionTimeSlotOverride();
      mockStoreSectionTimeSlotOverride.id = 1;

      // Mock repository methods
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(undefined); // No existing record
      jest
        .spyOn(repository, 'create')
        .mockReturnValue(mockStoreSectionTimeSlotOverride); // Mock create
      jest
        .spyOn(repository, 'save')
        .mockResolvedValue(mockStoreSectionTimeSlotOverride); // Mock save

      const result = await service.create(
        createStoreSectionTimeSlotOverrideDto,
        mockRestoUser,
        {} as AuditParams,
      );

      expect(result).toEqual([mockStoreSectionTimeSlotOverride]);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: {
          storeSectionTimeSlotId:
            storeSectionTimeSlotOverrideDto.storeSectionTimeSlotId,
          openingTime: storeSectionTimeSlotOverrideDto.openingTime,
          closingTime: storeSectionTimeSlotOverrideDto.closingTime,
          effectiveFrom: storeSectionTimeSlotOverrideDto.effectiveFrom,
          effectiveTo: storeSectionTimeSlotOverrideDto.effectiveTo,
          reasonForOverride: storeSectionTimeSlotOverrideDto.reasonForOverride,
          storeStatus: storeSectionTimeSlotOverrideDto.storeStatus as
            | 'OPEN'
            | 'CLOSE',
        },
      });
      expect(repository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          ...storeSectionTimeSlotOverrideDto,
        }),
      );
      expect(repository.save).toHaveBeenCalledWith(
        mockStoreSectionTimeSlotOverride,
      );
    });
  });

  describe('findByIds', () => {
    it('should return store section time slot overrides by ids', async () => {
      const ids = [1, 2];
      const mockStoreSectionTimeSlotOverrides = [
        new StoreSectionTimeSlotOverride(),
        new StoreSectionTimeSlotOverride(),
      ];

      jest
        .spyOn(repository, 'find')
        .mockResolvedValue(mockStoreSectionTimeSlotOverrides);

      const result = await service.findByIds(ids);

      expect(result).toEqual(mockStoreSectionTimeSlotOverrides);
    });
  });

  describe('remove', () => {
    it('should remove a store section time slot override', async () => {
      const storeSectionTimeSlotOverrideId = 1;
      const mockStoreSectionTimeSlotOverride =
        new StoreSectionTimeSlotOverride();
      mockStoreSectionTimeSlotOverride.id = storeSectionTimeSlotOverrideId;

      jest
        .spyOn(service, 'findOne')
        .mockResolvedValue(mockStoreSectionTimeSlotOverride);
      jest.spyOn(repository, 'remove').mockResolvedValue(undefined);

      await service.remove(storeSectionTimeSlotOverrideId);

      expect(repository.remove).toHaveBeenCalledWith(
        mockStoreSectionTimeSlotOverride,
      );
    });
  });
});
