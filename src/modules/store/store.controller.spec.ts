import { Test, TestingModule } from '@nestjs/testing';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { Repository } from 'typeorm';
import { Store } from './entities/store.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { GygQueryOptions } from '@modules/offer/types';

describe('StoreController', () => {
  let storeController: StoreController;
  let storeService: StoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreController],
      providers: [
        StoreService,
        {
          provide: getRepositoryToken(Store),
          useClass: Repository,
        },
      ],
    }).compile();

    storeController = module.get<StoreController>(StoreController);
    storeService = module.get<StoreService>(StoreService);
  });

  it('should be defined', () => {
    expect(storeController).toBeDefined();
  });

  describe('findById', () => {
    it('should return a store by ID', async () => {
      const storeId = 1;
      const mockStore = new Store();
      mockStore.id = storeId;
      jest.spyOn(storeService, 'findById').mockResolvedValue(mockStore);

      const result = await storeController.findById(storeId);
      expect(result).toEqual(mockStore);
    });
  });

  describe('findAll', () => {
    it('should return an object of stores as data and meta info', async () => {
      const mockStoresResponse = {
        data: [new Store()],
        meta: {
          totalRows: 1,
          pages: 1,
        },
      };
      jest.spyOn(storeService, 'findAll').mockResolvedValue(mockStoresResponse);

      const query: GygQueryOptions = {
        take: 10,
        skip: 0,
        sortBy: 'id',
      };
      const result = await storeController.findAll(query);
      expect(result).toEqual(mockStoresResponse);
    });
  });

  describe('update', () => {
    it('should update a store by ID', async () => {
      const storeId = 1;
      const mockStore = new Store();
      mockStore.id = storeId;
      jest.spyOn(storeService, 'update').mockResolvedValue(mockStore);

      const result = await storeController.update(storeId, mockStore);
      expect(result).toEqual(mockStore);
    });

    it('should handle NotFoundException when updating a non-existing store', async () => {
      const storeId = 1;
      const mockStore = new Store();
      mockStore.id = storeId;
      jest
        .spyOn(storeService, 'update')
        .mockRejectedValue(new NotFoundException());

      await expect(storeController.update(storeId, mockStore)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('create', () => {
    it('should create a new store', async () => {
      const mockStore = new Store();
      jest.spyOn(storeService, 'create').mockResolvedValue(mockStore);

      const result = await storeController.create(mockStore);
      expect(result).toEqual(mockStore);
    });
  });

  describe('remove', () => {
    it('should remove a store by ID', async () => {
      const storeId = 1;
      jest.spyOn(storeService, 'remove').mockResolvedValue();

      const result = await storeController.hardDelete(storeId);
      expect(result).toBeUndefined();
    });

    it('should handle NotFoundException when removing a non-existing store', async () => {
      const storeId = 1;
      jest
        .spyOn(storeService, 'remove')
        .mockRejectedValue(new NotFoundException());

      await expect(storeController.hardDelete(storeId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
