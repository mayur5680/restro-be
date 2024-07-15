import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { Checkout } from './checkout.entity';
import { CheckoutService } from './checkout.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { checkoutFactory } from './checkout.factory';

describe('CheckoutService', () => {
  let checkoutService: CheckoutService;
  let checkoutRepository: Repository<Checkout>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CheckoutService,
        {
          provide: getRepositoryToken(Checkout),
          useClass: Repository,
        },
      ],
    }).compile();

    checkoutService = module.get<CheckoutService>(CheckoutService);
    checkoutRepository = module.get<Repository<Checkout>>(
      getRepositoryToken(Checkout),
    );
  });

  it('should be defined', () => {
    expect(checkoutService).toBeDefined();
  });

  describe('findById', () => {
    it('should return a Checkout by ID', async () => {
      const mockCheckout = checkoutFactory.build();
      jest.spyOn(checkoutRepository, 'findOne').mockResolvedValue(mockCheckout);

      const result = await checkoutService.findById(mockCheckout.id);
      expect(result).toEqual(mockCheckout);
    });

    it('should throw NotFoundException if checkout is not found', async () => {
      const checkoutId = 'nonexistent-id';
      jest.spyOn(checkoutRepository, 'findOne').mockResolvedValue(undefined);

      await expect(checkoutService.findById(checkoutId)).rejects.toThrowError(
        new NotFoundException(`Checkout with ID ${checkoutId} not found`),
      );
    });
  });

  describe('findByUserId', () => {
    it('should return a Checkout by User', async () => {
      const mockCheckout = checkoutFactory.build();
      jest.spyOn(checkoutRepository, 'findOne').mockResolvedValue(mockCheckout);

      const result = await checkoutService.findByUserId(mockCheckout.user.id);
      expect(result).toEqual(mockCheckout);
    });

    it('should throw NotFoundException if checkout is not found for the user', async () => {
      const userId = 123;
      jest.spyOn(checkoutRepository, 'findOne').mockResolvedValue(undefined);

      await expect(checkoutService.findByUserId(userId)).rejects.toThrowError(
        new NotFoundException(`Checkout for user ID ${userId} not found`),
      );
    });
  });

  describe('findByCustomerId', () => {
    it('should return a Checkout by Customer ID', async () => {
      const mockCheckout = checkoutFactory.build();
      jest.spyOn(checkoutRepository, 'findOne').mockResolvedValue(mockCheckout);

      const result = await checkoutService.findByCustomerId(
        mockCheckout.customerId,
      );
      expect(result).toEqual(mockCheckout);
    });

    it('should throw NotFoundException if checkout is not found for the customer ID', async () => {
      const customerId = 'nonexistent-customer-id';
      jest.spyOn(checkoutRepository, 'findOne').mockResolvedValue(undefined);

      await expect(
        checkoutService.findByCustomerId(customerId),
      ).rejects.toThrowError(
        new NotFoundException(
          `Checkout with customer ID ${customerId} not found`,
        ),
      );
    });
  });

  describe('findByOrderId', () => {
    it('should return a Checkout by Order ID', async () => {
      const mockCheckout = checkoutFactory.build();
      jest.spyOn(checkoutRepository, 'findOne').mockResolvedValue(mockCheckout);

      const result = await checkoutService.findByOrderId(mockCheckout.orderId);
      expect(result).toEqual(mockCheckout);
    });

    it('should throw NotFoundException if checkout is not found for the order ID', async () => {
      const orderId = 'nonexistent-order-id';
      jest.spyOn(checkoutRepository, 'findOne').mockResolvedValue(undefined);

      await expect(checkoutService.findByOrderId(orderId)).rejects.toThrowError(
        new NotFoundException(`Checkout with order ID ${orderId} not found`),
      );
    });
  });

  describe('findByPosOrderId', () => {
    it('should return a Checkout by POS Order ID', async () => {
      const mockCheckout = checkoutFactory.build();
      jest.spyOn(checkoutRepository, 'findOne').mockResolvedValue(mockCheckout);

      const result = await checkoutService.findByPosOrderId(
        mockCheckout.posOrderId,
      );
      expect(result).toEqual(mockCheckout);
    });

    it('should throw NotFoundException if checkout is not found for the POS order ID', async () => {
      const posOrderId = 999;
      jest.spyOn(checkoutRepository, 'findOne').mockResolvedValue(undefined);

      await expect(
        checkoutService.findByPosOrderId(posOrderId),
      ).rejects.toThrowError(
        new NotFoundException(
          `Checkout with POS order ID ${posOrderId} not found`,
        ),
      );
    });
  });

  describe('findByStatus', () => {
    it('should return a Checkout by Status', async () => {
      const status = 'COMPLETED';
      const mockCheckout = checkoutFactory.build();
      jest.spyOn(checkoutRepository, 'findOne').mockResolvedValue(mockCheckout);

      const result = await checkoutService.findByStatus(status);
      expect(result).toEqual(mockCheckout);
    });

    it('should throw NotFoundException if checkout is not found for the status', async () => {
      const status = 'nonexistent-status';
      jest.spyOn(checkoutRepository, 'findOne').mockResolvedValue(undefined);

      await expect(checkoutService.findByStatus(status)).rejects.toThrowError(
        new NotFoundException(`Checkout with status ${status} not found`),
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of Checkouts', async () => {
      const mockCheckouts = checkoutFactory.buildList(3);
      jest.spyOn(checkoutRepository, 'find').mockResolvedValue(mockCheckouts);

      jest
        .spyOn(checkoutRepository, 'findAndCount')
        .mockImplementation(async () => [mockCheckouts, mockCheckouts.length]);

      const result = await checkoutService.findAll();
      expect(result.checkouts).toEqual(mockCheckouts);
    });

    it('should return paginated results when providing page and pageSize', async () => {
      const page = 2;
      const pageSize = 5;
      const totalCheckouts = 10;
      const paginatedCheckouts = checkoutFactory
        .buildList(pageSize)
        .map((checkout, i) => ({
          ...checkout,
          id: `paginated-id-${i + (page - 1) * pageSize + 1}`,
        }));
      jest
        .spyOn(checkoutRepository, 'findAndCount')
        .mockImplementation(async () => [paginatedCheckouts, totalCheckouts]);

      const result = await checkoutService.findAll(page, pageSize);
      expect(result.checkouts).toEqual(paginatedCheckouts);
      expect(result.total).toEqual(totalCheckouts);
    });
  });
});
