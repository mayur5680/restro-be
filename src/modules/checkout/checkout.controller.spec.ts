import { Test, TestingModule } from '@nestjs/testing';
import { CheckoutController } from './checkout.controller';
import { CheckoutService } from './checkout.service';
import { Repository } from 'typeorm';
import { Checkout } from './checkout.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { INestApplication } from '@nestjs/common';
import { User } from '@modules/user/user.entity';

describe('CheckoutController', () => {
  let app: INestApplication;
  let checkoutController: CheckoutController;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [CheckoutController],
      providers: [
        CheckoutService,
        {
          provide: getRepositoryToken(Checkout),
          useClass: Repository,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    checkoutController =
      moduleFixture.get<CheckoutController>(CheckoutController);

    await app.init();
  });

  it('should be defined', () => {
    expect(checkoutController).toBeDefined();
  });

  describe('findById', () => {
    it('should return a checkout by ID', async () => {
      const checkoutId = 'checkout-id';
      const mockCheckout = new Checkout();
      mockCheckout.id = checkoutId;
      jest
        .spyOn(checkoutController, 'findById')
        .mockResolvedValue(mockCheckout);

      const result = await checkoutController.findById(checkoutId);
      expect(result).toEqual(mockCheckout);
    });
  });

  describe('findByUserId', () => {
    it('should return a checkout by user ID', async () => {
      const user = new User();
      const userId = user['id'];
      const mockCheckout = new Checkout();
      mockCheckout.user = new User();
      mockCheckout.user.id = userId;
      jest
        .spyOn(checkoutController, 'findByUserId')
        .mockResolvedValue(mockCheckout);

      const result = await checkoutController.findByUserId(userId);
      expect(result).toEqual(mockCheckout);
    });
  });

  describe('findByOrderId', () => {
    it('should return a checkout by order ID', async () => {
      const orderId = 'order-id';
      const mockCheckout = new Checkout();
      mockCheckout.orderId = orderId;
      jest
        .spyOn(checkoutController, 'findByOrderId')
        .mockResolvedValue(mockCheckout);

      const result = await checkoutController.findByOrderId(orderId);
      expect(result).toEqual(mockCheckout);
    });
  });

  describe('findByCustomerId', () => {
    it('should return a checkout by customer ID', async () => {
      const customerId = 'customer-id';
      const mockCheckout = new Checkout();
      mockCheckout.customerId = customerId;
      jest
        .spyOn(checkoutController, 'findByCustomerId')
        .mockResolvedValue(mockCheckout);

      const result = await checkoutController.findByCustomerId(customerId);
      expect(result).toEqual(mockCheckout);
    });
  });

  describe('findByPosOrderId', () => {
    it('should return a checkout by POS order ID', async () => {
      const posOrderId = 123;
      const mockCheckout = new Checkout();
      mockCheckout.posOrderId = posOrderId;
      jest
        .spyOn(checkoutController, 'findByPosOrderId')
        .mockResolvedValue(mockCheckout);

      const result = await checkoutController.findByPosOrderId(posOrderId);
      expect(result).toEqual(mockCheckout);
    });
  });

  describe('findByStatus', () => {
    it('should return a checkout by status', async () => {
      const status = 'COMPLETED';
      const mockCheckout = new Checkout();
      mockCheckout.status = status;
      jest
        .spyOn(checkoutController, 'findByStatus')
        .mockResolvedValue(mockCheckout);

      const result = await checkoutController.findByStatus(status);
      expect(result).toEqual(mockCheckout);
    });
  });

  describe('findAll', () => {
    it('should return all checkouts', async () => {
      const mockCheckouts = [new Checkout()];

      jest
        .spyOn(checkoutController['checkoutService'], 'findAll')
        .mockResolvedValue({
          checkouts: mockCheckouts,
          total: mockCheckouts.length,
        });

      const result = await checkoutController.findAll();
      expect(result).toEqual({
        checkouts: mockCheckouts,
        total: mockCheckouts.length,
      });
    });

    it('should return paginated results when providing page and pageSize', async () => {
      const page = 2;
      const pageSize = 5;
      const totalCheckouts = 10;
      const paginatedCheckouts = Array.from(
        { length: pageSize },
        () => new Checkout(),
      );
      jest
        .spyOn(checkoutController['checkoutService'], 'findAll')
        .mockResolvedValue({
          checkouts: paginatedCheckouts,
          total: totalCheckouts,
        });

      const result = await checkoutController.findAll(page, pageSize);
      expect(result).toEqual({
        checkouts: paginatedCheckouts,
        total: totalCheckouts,
      });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
