import { Test, TestingModule } from '@nestjs/testing';
import { LoyaltyHistoryService } from './loyaltyHistory.service';
import { Repository } from 'typeorm';
import {
  LoyaltyHistory,
  LoyaltyHistoryTypeEnum,
  LoyaltyHistoryActionEnum,
  LoyaltyHistoryStatusEnum,
  LoyaltyHistorySourceTypeEnum,
} from './loyaltyHistory.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('LoyaltyHistoryService', () => {
  let loyaltyHistoryService: LoyaltyHistoryService;
  let loyaltyHistoryRepository: Repository<LoyaltyHistory>;

  // todo(jhudiel) - move to factories
  const mockLoyaltyHistoryArray: LoyaltyHistory[] = [
    {
      id: 1,
      userId: 1,
      storeId: 1,
      posMemberId: 1,
      cardNumber: '123456789',
      totalValue: 100,
      value: 100,
      type: LoyaltyHistoryTypeEnum.POINTS,
      action: LoyaltyHistoryActionEnum.CREDITED,
      status: LoyaltyHistoryStatusEnum.CREATED,
      comments: '',
      syncBraze: false,
      sourceId: '',
      requestIdentifier: '',
      sourceType: LoyaltyHistorySourceTypeEnum.ORDER,
      createdAt: new Date(),
      createdBy: '1',
      updatedAt: new Date(),
      updatedBy: '1',
      deletedAt: null,
    },
    {
      id: 2,
      userId: 1,
      storeId: 1,
      posMemberId: 1,
      cardNumber: '123456789',
      totalValue: 150,
      value: 50,
      type: LoyaltyHistoryTypeEnum.POINTS,
      action: LoyaltyHistoryActionEnum.CREDITED,
      status: LoyaltyHistoryStatusEnum.CREATED,
      comments: '',
      syncBraze: false,
      sourceId: '',
      requestIdentifier: '',
      sourceType: LoyaltyHistorySourceTypeEnum.ORDER,
      createdAt: new Date(),
      createdBy: '1',
      updatedAt: new Date(),
      updatedBy: '1',
      deletedAt: null,
    },
  ];

  const mockLoyaltyHistoryRepository = {
    find: jest.fn().mockResolvedValue(mockLoyaltyHistoryArray),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoyaltyHistoryService,
        {
          provide: getRepositoryToken(LoyaltyHistory),
          useValue: mockLoyaltyHistoryRepository,
        },
      ],
    }).compile();

    loyaltyHistoryService = module.get<LoyaltyHistoryService>(
      LoyaltyHistoryService,
    );
    loyaltyHistoryRepository = module.get<Repository<LoyaltyHistory>>(
      getRepositoryToken(LoyaltyHistory),
    );
  });

  it('should be defined', () => {
    expect(loyaltyHistoryService).toBeDefined();
  });

  describe('findByUserId', () => {
    it('should return an array of loyalty histories retrieved by userId', async () => {
      const loyaltyHistories = await loyaltyHistoryService.findByUserId(1);
      expect(loyaltyHistories).toBe(mockLoyaltyHistoryArray);
    });

    it('should call the find method from the loyaltyHistoryRepository retrieved by userId', async () => {
      await loyaltyHistoryService.findByUserId(1);
      expect(loyaltyHistoryRepository.find).toHaveBeenCalled();
    });
  });

  describe('findByCardNumber', () => {
    it('should return an array of loyalty histories retrieved by cardNumber', async () => {
      const loyaltyHistories =
        await loyaltyHistoryService.findByCardNumber('123456789');
      expect(loyaltyHistories).toBe(mockLoyaltyHistoryArray);
    });

    it('should call the find method from the loyaltyHistoryRepository retrieved by cardNumber', async () => {
      await loyaltyHistoryService.findByCardNumber('123456789');
      expect(loyaltyHistoryRepository.find).toHaveBeenCalled();
    });
  });

  describe('findByPosMemberId', () => {
    it('should return an array of loyalty histories retrieved by posMemberId', async () => {
      const loyaltyHistories = await loyaltyHistoryService.findByPosMemberId(1);
      expect(loyaltyHistories).toBe(mockLoyaltyHistoryArray);
    });

    it('should call the find method from the loyaltyHistoryRepository retrieved by posMemberId', async () => {
      await loyaltyHistoryService.findByPosMemberId(1);
      expect(loyaltyHistoryRepository.find).toHaveBeenCalled();
    });
  });
});
