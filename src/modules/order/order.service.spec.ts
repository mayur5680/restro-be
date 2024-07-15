import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Store } from '@modules/store/entities/store.entity';
import { checkoutFactory } from '@modules/checkout/checkout.factory';

import { Order } from './order.entity';
import { OrderService } from './order.service';

describe('OrderService', () => {
  let orderService: OrderService;
  let orderRepository: Repository<Order>;

  const mockOrderArray: Order[] = []; // Move to factories as todo suggests

  const mockOrderRepository = {
    find: jest.fn().mockResolvedValue(mockOrderArray),
    findOne: jest.fn().mockResolvedValue(undefined),
    findAndCount: jest
      .fn()
      .mockResolvedValue([mockOrderArray, mockOrderArray.length]),
    createQueryBuilder: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: getRepositoryToken(Order),
          useValue: mockOrderRepository,
        },
      ],
    }).compile();

    orderService = module.get<OrderService>(OrderService);
    orderRepository = module.get<Repository<Order>>(getRepositoryToken(Order));
  });

  it('should be defined', () => {
    expect(orderService).toBeDefined();
  });

  describe('findByUserId', () => {
    it('should return an array of Orders retrieved by userId', async () => {
      const queryBuilder = {
        select: jest.fn().mockReturnThis(),
        innerJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue(mockOrderArray),
      };

      jest
        .spyOn(orderRepository, 'createQueryBuilder')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .mockReturnValue(queryBuilder as any);

      const orders = await orderService.findByUserId(1);
      expect(orders).toBe(mockOrderArray);
    });
  });

  describe('findById', () => {
    it('should return an Order retrieved by id', async () => {
      const orderId = 'someId';
      const mockOrder: Order = {
        id: '',
        status: '',
        type: 0,
        tableNumber: 0,
        store: new Store(),
        channelId: 0,
        createdAt: undefined,
        createdBy: '',
        updatedAt: undefined,
        updatedBy: 0,
        deletedAt: undefined,
        collectionType: '',
        orderStage: 0,
        items: undefined,
        isCheckedOut: false,
        paymentToken: '',
        paymentTokenTimestamp: undefined,
        productType: '',
        amountIncludingGst: 0,
        amountExcludingGst: 0,
        gstAmount: 0,
        itemsResponse: undefined,
        offers: undefined,
        offerTrail: undefined,
        pickUpTime: undefined,
        activeUntil: undefined,
        posMenuId: 0,
        parentOrderId: '',
        orderNumber: 0,
        hash: '',
        orderRatingScheduleId: '',
        supportTicketId: 0,
        clientPlatformType: '',
        clientVersion: '',
        checkout: checkoutFactory.build(),
      };

      jest.spyOn(orderRepository, 'findOne').mockResolvedValue(mockOrder);

      const order = await orderService.findById(orderId);

      expect(order).toBe(mockOrder);
    });
  });

  describe('findByStatus', () => {
    it('should return an object with orders and total retrieved by status', async () => {
      // Arrange
      const status = 'someStatus';
      const page = 1;
      const pageSize = 10;

      // Act
      const result = await orderService.findByStatus(status, page, pageSize);

      // Assert
      expect(result).toEqual({
        orders: mockOrderArray,
        total: mockOrderArray.length,
      });
      expect(mockOrderRepository.findAndCount).toHaveBeenCalledWith({
        where: { status },
        take: pageSize,
        skip: (page - 1) * pageSize,
      });
    });

    it('should throw an error if findAndCount fails', async () => {
      // Arrange
      const status = 'someStatus';
      const page = 1;
      const pageSize = 10;
      const errorMessage = 'Database error';

      mockOrderRepository.findAndCount.mockRejectedValueOnce(
        new Error(errorMessage),
      );

      // Act and Assert
      await expect(
        orderService.findByStatus(status, page, pageSize),
      ).rejects.toThrowError(
        `Failed to find orders by status: ${errorMessage}`,
      );

      expect(mockOrderRepository.findAndCount).toHaveBeenCalledWith({
        where: { status },
        take: pageSize,
        skip: (page - 1) * pageSize,
      });
    });
  });

  describe('findByPosOrderId', () => {
    it('should return an array of Orders retrieved by orderNumber', async () => {
      const orderNumber = 12345;
      const orders = await orderService.findByPosOrderId(orderNumber);

      expect(orders).toBe(mockOrderArray);
      expect(orderRepository.find).toHaveBeenCalledWith({
        where: {
          orderNumber,
        },
      });
    });
  });

  describe('findBySupportTicketId', () => {
    it('should return an array of Orders retrieved by supportTicketId', async () => {
      const supportTicketId = 67890;
      const orders = await orderService.findBySupportTicketId(supportTicketId);

      expect(orders).toBe(mockOrderArray);
      expect(orderRepository.find).toHaveBeenCalledWith({
        where: {
          supportTicketId,
        },
      });
    });
  });

  describe('findByParentOrderId', () => {
    it('should return an array of Orders retrieved by parentOrderId', async () => {
      const parentOrderId = 'parent123';
      const orders = await orderService.findByParentOrderId(parentOrderId);

      expect(orders).toBe(mockOrderArray);
      expect(orderRepository.find).toHaveBeenCalledWith({
        where: {
          parentOrderId,
        },
      });
    });
  });

  describe('findByStoreId', () => {
    it('should return an object with orders and total retrieved by storeId', async () => {
      // Arrange
      const storeId = new Store().id;
      const page = 1;
      const pageSize = 10;

      // Act
      const result = await orderService.findByStoreId(storeId, page, pageSize);

      // Assert
      expect(result).toEqual({
        orders: mockOrderArray,
        total: mockOrderArray.length,
      });
      expect(mockOrderRepository.findAndCount).toHaveBeenCalledWith({
        where: { store: { id: storeId } },
        take: pageSize,
        skip: (page - 1) * pageSize,
      });
    });

    it('should throw an error if findAndCount fails', async () => {
      // Arrange
      const storeId = null;
      const page = 1;
      const pageSize = 10;
      const errorMessage = 'Database error';

      mockOrderRepository.findAndCount.mockRejectedValueOnce(
        new Error(errorMessage),
      );

      // Act and Assert
      await expect(
        orderService.findByStoreId(storeId, page, pageSize),
      ).rejects.toThrowError(
        `Failed to find orders by store ID: ${errorMessage}`,
      );

      expect(mockOrderRepository.findAndCount).toHaveBeenCalledWith({
        where: { store: { id: storeId } },
        take: pageSize,
        skip: (page - 1) * pageSize,
      });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
