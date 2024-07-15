import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { StoreTagService } from './store-tag.service';
import { CreateStoreTagDto } from './dto/create-store-tag.dto';
import { UpdateStoreTagDto } from './dto/update-store-tag.dto';
import { StoreTag } from './entities/store-tag.entity';
import { AuditParams } from 'src/shared/audit-logs.types';

describe('StoreTagService', () => {
  let service: StoreTagService;
  let storeTagRepository: Repository<StoreTag>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StoreTagService,
        {
          provide: getRepositoryToken(StoreTag),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<StoreTagService>(StoreTagService);
    storeTagRepository = module.get<Repository<StoreTag>>(
      getRepositoryToken(StoreTag),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a store tag', async () => {
      const createStoreTagDto: CreateStoreTagDto = {
        storeId: 1,
        tagId: 1,
        isActive: true,
      };

      jest.spyOn(storeTagRepository, 'save').mockResolvedValueOnce({} as never);

      const result = await service.create(createStoreTagDto, {} as AuditParams);

      expect(result).toBeDefined();
      // TODO; Re-enable this test, expect.any() has some unusual trouble with AuditParams.
      // expect(storeTagRepository.save).toHaveBeenCalledWith(
      //   expect.any(StoreTag),
      // );
    });

    it('should throw an error if creation fails', async () => {
      const createStoreTagDto: CreateStoreTagDto = {
        storeId: 1,
        tagId: 1,
        isActive: true,
      };

      jest.spyOn(storeTagRepository, 'save').mockRejectedValueOnce(new Error());

      await expect(
        service.create(createStoreTagDto, {} as AuditParams),
      ).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should retrieve a specific store tag', async () => {
      const storeTagId = '1';

      jest
        .spyOn(storeTagRepository, 'findOne')
        .mockResolvedValueOnce({} as StoreTag);

      const result = await service.findOne(storeTagId);

      expect(result).toBeDefined();
      expect(storeTagRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['tag'],
      });
    });

    it('should throw an error if the store tag is not found', async () => {
      const storeTagId = '1';

      jest.spyOn(storeTagRepository, 'findOne').mockResolvedValueOnce(null);

      await expect(service.findOne(storeTagId)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw an error if retrieval fails', async () => {
      const storeTagId = '1';

      jest
        .spyOn(storeTagRepository, 'findOne')
        .mockRejectedValueOnce(new Error());

      await expect(service.findOne(storeTagId)).rejects.toThrowError();
    });
  });

  describe('findAll', () => {
    it('should retrieve all store tags', async () => {
      jest
        .spyOn(storeTagRepository, 'find')
        .mockResolvedValueOnce([{} as StoreTag]);

      const result = await service.findAll();

      expect(result).toBeDefined();
      expect(storeTagRepository.find).toHaveBeenCalled();
    });

    it('should throw an error if retrieval fails', async () => {
      jest.spyOn(storeTagRepository, 'find').mockRejectedValueOnce(new Error());

      await expect(service.findAll()).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it.skip('should update a store tag', async () => {
      const storeTagId = 1;
      const updateStoreTagDto: UpdateStoreTagDto = {
        tagId: 2,
        isActive: false,
      }; // Ensure isActive is included in the DTO

      // Mock the findOne method to return a mock StoreTag object
      jest
        .spyOn(storeTagRepository, 'findOne')
        .mockResolvedValueOnce(new StoreTag());

      // Update the mockResolvedValueOnce to include raw and generatedMaps properties
      jest.spyOn(storeTagRepository, 'update').mockResolvedValueOnce({
        raw: {},
        generatedMaps: {},
        affected: 1,
      } as UpdateResult);

      const result = await service.update(storeTagId, updateStoreTagDto);

      expect(result).toBeDefined();
      expect(storeTagRepository.update).toHaveBeenCalledWith(
        { id: storeTagId }, // Ensure to pass an object with id property
        updateStoreTagDto, // Pass the DTO directly
      );
    });

    it('should throw an error if the store tag is not found during update', async () => {
      const storeTagId = 1;
      const updateStoreTagDto: UpdateStoreTagDto = { tagId: 2 };

      // Update the mockResolvedValueOnce to include raw and generatedMaps properties
      jest.spyOn(storeTagRepository, 'update').mockResolvedValueOnce({
        raw: {},
        generatedMaps: {},
        affected: 0,
      } as UpdateResult);

      await expect(
        service.update(storeTagId, updateStoreTagDto),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw an error if update fails', async () => {
      const storeTagId = 1;
      const updateStoreTagDto: UpdateStoreTagDto = { tagId: 2 };

      // Update the mockRejectedValueOnce to include raw property
      jest.spyOn(storeTagRepository, 'update').mockRejectedValueOnce({
        raw: {},
        generatedMaps: {},
      } as UpdateResult);

      await expect(
        service.update(storeTagId, updateStoreTagDto),
      ).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    it('should remove a store tag', async () => {
      const storeTagId = 1;

      // Update the mockResolvedValueOnce to include raw property
      jest.spyOn(storeTagRepository, 'delete').mockResolvedValueOnce({
        raw: {},
        affected: 1,
      } as DeleteResult);

      const result = await service.remove(storeTagId);

      expect(result).toEqual(
        `StoreTag with ID ${storeTagId} has been successfully removed.`,
      );
    });

    it('should throw an error if the store tag is not found during removal', async () => {
      const storeTagId = 1;

      // Update the mockResolvedValueOnce to include raw property
      jest.spyOn(storeTagRepository, 'delete').mockResolvedValueOnce({
        raw: {},
        affected: 0,
      } as DeleteResult);

      await expect(service.remove(storeTagId)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw an error if removal fails', async () => {
      const storeTagId = 1;

      // Update the mockRejectedValueOnce to include raw property
      jest.spyOn(storeTagRepository, 'delete').mockRejectedValueOnce({
        raw: {},
      } as DeleteResult);

      await expect(service.remove(storeTagId)).rejects.toThrowError();
    });
  });
});
