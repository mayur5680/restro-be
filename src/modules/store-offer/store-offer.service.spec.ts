import { Test, TestingModule } from '@nestjs/testing';
import { StoreOfferService } from './store-offer.service';
import { Repository } from 'typeorm';
import { StoreOffer } from './entities/store-offer.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GygQueryOptions } from '@modules/offer/types';
import { NotFoundException } from '@nestjs/common';

describe('StoreOfferService', () => {
  let storeOfferService: StoreOfferService;
  let storeOfferRepository: Repository<StoreOffer>;

  const mockStoreOffer = {
    id: '135d4e5f-2dc9-43e5-8f89-4a1e03f39f78',
    offerId: 'd28b2913-bf7a-4702-8403-0c8f1fdf7fe9',
    storeId: 849,
    isActive: true,
    createdAt: new Date('2023-11-02 14:30:00'),
    createdBy: null,
    updatedAt: new Date('2023-11-02 14:30:00'),
    updatedBy: null,
    deletedAt: null,
    offer: null,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StoreOfferService,
        {
          provide: getRepositoryToken(StoreOffer),
          useClass: Repository,
        },
      ],
    }).compile();

    storeOfferService = module.get<StoreOfferService>(StoreOfferService);
    storeOfferRepository = module.get<Repository<StoreOffer>>(
      getRepositoryToken(StoreOffer),
    );
  });

  it('should be defined', () => {
    expect(storeOfferService).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a store offer by ID', async () => {
      const id = '135d4e5f-2dc9-43e5-8f89-4a1e03f39f78';
      jest
        .spyOn(storeOfferRepository, 'findOne')
        .mockResolvedValue(mockStoreOffer);

      const result = await storeOfferService.findOne(id);
      expect(result).toEqual(mockStoreOffer);
    });
  });

  describe('findAll', () => {
    it('should return an array of store offers if filters[offerId] is not provided', async () => {
      const expectedResult = {
        data: [mockStoreOffer],
        meta: {
          totalRows: 1,
          pages: 1,
        },
      };

      jest
        .spyOn(storeOfferRepository, 'findAndCount')
        .mockResolvedValue([[mockStoreOffer], 1]);

      const query: GygQueryOptions = {
        take: 10,
        skip: 0,
        sortBy: 'id',
      };

      const result = await storeOfferService.findAll(query);
      expect(result).toEqual(expectedResult);
    });

    it('should return an array of stores if filters[offerId] is provided', async () => {
      const expectedResult = {
        data: [mockStoreOffer],
        meta: {
          totalRows: 1,
          pages: 1,
        },
      };

      jest
        .spyOn(storeOfferRepository, 'findAndCount')
        .mockResolvedValue([[mockStoreOffer], 1]);

      const query: GygQueryOptions = {
        filters: {
          offerId: '2',
        },
        take: 10,
        skip: 0,
        sortBy: 'id',
      };

      const result = await storeOfferService.findAll(query);
      expect(result).toEqual(expectedResult);
    });
  });
  describe('update', () => {
    it('should throw an error if the storeOffer does not exist', async () => {
      const id = '123';
      const inputData = {
        offerId: '2de4',
        storeId: 112,
      };
      jest
        .spyOn(storeOfferRepository, 'update')
        .mockResolvedValue({ affected: 0, raw: null, generatedMaps: null });

      try {
        await storeOfferService.update(id, inputData);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe(`Store Offer with ID ${id} not found.`);
      }
    });
    it('should return the updated storeOffer', async () => {
      const id = '123';
      const inputData = {
        offerId: '2de4',
        storeId: 112,
      };

      jest.spyOn(storeOfferRepository, 'update').mockResolvedValue({
        affected: 1,
        raw: mockStoreOffer,
        generatedMaps: [],
      });

      jest
        .spyOn(storeOfferRepository, 'findOne')
        .mockResolvedValue(mockStoreOffer);

      const result = await storeOfferService.update(id, inputData);
      expect(result).toEqual(mockStoreOffer);
    });
  });
  describe('create', () => {
    it('should return the created storeOffer', async () => {
      const inputData = {
        offerId: '2de4',
        storeId: 112,
      };

      jest
        .spyOn(storeOfferRepository, 'create')
        .mockImplementation(() => mockStoreOffer);
      jest
        .spyOn(storeOfferRepository, 'save')
        .mockResolvedValue(mockStoreOffer);

      const result = await storeOfferService.create(inputData);
      expect(result).toEqual(mockStoreOffer);
    });
  });
});
