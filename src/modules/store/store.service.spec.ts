import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { AuditMetadata, Store } from './entities/store.entity';
import { StoreService } from './store.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { AuditParams } from 'src/shared/audit-logs.types';

describe('StoreService', () => {
  let storeService: StoreService;
  let storeRepository: Repository<Store>;

  const mockStoreArray: Store[] = [
    {
      id: 1,
      posStoreId: 123,
      oldStoreId: 456,
      name: 'Test Store',
      description: 'Test Description',
      timeZone: 'GMT',
      address1: '123 Main Street',
      address2: 'Apt 4B',
      city: 'Test City',
      postCode: '12345',
      country: 'Test Country',
      state: 'TS',
      longitude: 12.3456789,
      latitude: 23.45678901,
      orderLink: 'https://example.com/order',
      cateringLink: 'https://example.com/catering',
      phone: '123-456-7890',
      email: 'test@store.com',
      storeAlertEmail: 'alert@store.com',
      displayOrder: 1,
      isActive: true,
      isTest: false,
      inActiveReason: 'Not active',
      isFoodCourt: true,
      hasBreakfast: true,
      hasCoffee: true,
      maxOrderValue: 100,
      minOrderValue: 10,
      orderAlertValueThreshold: 50,
      syncLoyaltyDollars: true,
      syncLoyaltyPoints: true,
      googlePlaceId: 'google-place-id',
      createdAt: new Date(),
      createdBy: 1,
      updatedAt: new Date(),
      updatedBy: 1,
      gst: 7.5,
      isGstIncluded: true,
      taxOfficeCode: 'TO123',
      brandSiteRestaurantLink: 'https://example.com/brand-site',
      fax: '123-456-7890',
      orderingId: 'order123',
      orderingName: 'Ordering Name',
      campaignMonitorCode: 'CM123',
      primaryMarketingArea: 'Marketing Area',
      trafficVolume: 5000,
      additionalDetails: 'Additional Details',
      storeGroup: 'Store Group',
      longDescription: 'Long Description',
      formattedStoreName: 'Formatted Store Name',
      disableStoreOrder: false,
      isPermanentlyClosed: false,
      pickupInstruction: 'Pickup Instructions',
      tags: [], // Add the 'tags' property here
      _metadata: {} as AuditMetadata,
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StoreService,
        {
          provide: getRepositoryToken(Store),
          useClass: Repository,
        },
      ],
    }).compile();

    storeService = module.get<StoreService>(StoreService);
    storeRepository = module.get<Repository<Store>>(getRepositoryToken(Store));
  });

  it('should be defined', () => {
    expect(storeService).toBeDefined();
  });

  describe('findById', () => {
    it('should return a store by ID', async () => {
      const storeId = 1;
      const mockStore = mockStoreArray[0];
      jest.spyOn(storeRepository, 'findOne').mockResolvedValue(mockStore);

      const result = await storeService.findById(storeId);
      expect(result).toEqual(mockStore);
    });
  });

  describe('findAll', () => {
    it('should return an array of stores if filters[offerId] is not provided', async () => {
      const expectedResult = {
        data: mockStoreArray,
        meta: {
          totalRows: 1,
          pages: 1,
        },
      };

      jest
        .spyOn(storeRepository, 'findAndCount')
        .mockResolvedValue([mockStoreArray, 1]);

      const query = {
        take: 10,
        skip: 0,
        sortBy: 'id',
      };

      const result = await storeService.findAll(query);
      expect(result).toEqual(expectedResult);
    });

    it('should return an array of stores if filters[offerId] is provided', async () => {
      const expectedResult = {
        data: mockStoreArray,
        meta: {
          totalRows: 1,
          pages: 1,
        },
      };

      jest
        .spyOn(storeRepository, 'findAndCount')
        .mockResolvedValue([mockStoreArray, 1]);

      const query = {
        filters: {
          offerId: '2',
        },
        take: 10,
        skip: 0,
        sortBy: 'id',
      };

      const result = await storeService.findAll(query);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('update', () => {
    it('should update a store by ID', async () => {
      const storeId = 1;
      const updateData = {
        name: 'Updated Store Name',
      };
      const mockStore = mockStoreArray[0];
      jest.spyOn(storeRepository, 'save').mockResolvedValue({
        ...mockStore,
        ...updateData,
      });

      jest.spyOn(storeRepository, 'update').mockResolvedValue({
        affected: 1,
        raw: {},
        generatedMaps: [],
      });
      jest.spyOn(storeRepository, 'findOne').mockResolvedValue(mockStore);

      const result = await storeService.update(
        storeId,
        updateData,
        {} as AuditParams,
      );
      expect(result).toEqual(mockStore);
    });

    it('should throw NotFoundException if store is not found', async () => {
      const storeId = 1;
      const updateData = {
        name: 'Updated Store Name',
      };
      jest.spyOn(storeRepository, 'update').mockResolvedValue({
        affected: 0,
        raw: {},
        generatedMaps: [],
      });

      await expect(
        storeService.update(storeId, updateData, {} as AuditParams),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a store', async () => {
      const createData = {
        posStoreId: 123,
        oldStoreId: 456,
        name: 'Test Store',
        description: 'Test Description',
        timeZone: 'GMT',
        address1: '123 Main Street',
        address2: 'Apt 4B',
        city: 'Test City',
        postCode: '12345',
        country: 'Test Country',
        state: 'TS',
        longitude: 12.3456789,
        latitude: 23.45678901,
        orderLink: 'https://example.com/order',
        cateringLink: 'https://example.com/catering',
        phone: '123-456-7890',
        email: 'testStore@gyg.com.au',
        storeAlertEmail: 'testStore@gyg.com.au',
        displayOrder: 1,
        isActive: true,
        isTest: false,
        inActiveReason: 'Not active',
        isFoodCourt: true,
        hasBreakfast: true,
        hasCoffee: true,
        maxOrderValue: 100,
        minOrderValue: 10,
        orderAlertValueThreshold: 50,
        syncLoyaltyDollars: true,
        syncLoyaltyPoints: true,
        googlePlaceId: 'google-place-id',
        gst: 10,
        isGstIncluded: true,
        taxOfficeCode: 'TO123',
        brandSiteRestaurantLink: 'https://example.com/brand-site',
        fax: '123-456-7890',
        ordering: {
          id: 1,
        },
        campaignMonitorCode: 'CM123',
        primaryMarketingArea: 'Marketing Area',
        trafficVolume: 5000,
        additionalDetails: 'Additional Details',
        storeGroup: 'Store Group',
        longDescription: 'Long Description',
        formattedStoreName: 'Formatted Store Name',
        disableStoreOrder: false,
        isPermanentlyClosed: false,
        pickupInstruction: 'Pickup Instructions',
      };
      const mockStore = mockStoreArray[0];
      jest.spyOn(storeRepository, 'create').mockReturnValue(mockStore);
      jest.spyOn(storeRepository, 'save').mockResolvedValue(mockStore);

      const result = await storeService.create(createData);
      expect(result).toEqual(mockStore);
    });
  });

  describe('remove', () => {
    it('should remove a store by ID', async () => {
      const storeId = 1;
      const mockStore = mockStoreArray[0];

      jest.spyOn(storeRepository, 'delete').mockResolvedValue({
        affected: 1,
        raw: {},
      });
      jest.spyOn(storeRepository, 'findOne').mockResolvedValue(mockStore);

      await storeService.remove(storeId);
      expect(storeRepository.delete).toHaveBeenCalledWith({ id: storeId });
    });

    it('should throw NotFoundException if store is not found', async () => {
      const storeId = 1;
      jest.spyOn(storeRepository, 'delete').mockResolvedValue({
        affected: 0,
        raw: {},
      });

      await expect(storeService.remove(storeId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
