import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { Payment, PaymentStatus, PaymentType } from './payment.entity';
import { PaymentService } from './payment.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { paymentFactory } from './payment.factory';

describe('PaymentService', () => {
  let paymentService: PaymentService;
  let paymentRepository: Repository<Payment>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        {
          provide: getRepositoryToken(Payment),
          useClass: Repository,
        },
      ],
    }).compile();

    paymentService = module.get<PaymentService>(PaymentService);
    paymentRepository = module.get<Repository<Payment>>(
      getRepositoryToken(Payment),
    );
  });

  it('should be defined', () => {
    expect(paymentService).toBeDefined();
  });

  describe('findById', () => {
    it('should return a Payment by ID', async () => {
      const mockPayment = paymentFactory.build();
      jest.spyOn(paymentRepository, 'findOne').mockResolvedValue(mockPayment);

      const result = await paymentService.findById(mockPayment.id);
      expect(result).toEqual(mockPayment);
    });

    it('should throw NotFoundException if payment is not found', async () => {
      const paymentId = 'nonexistent-id';
      jest.spyOn(paymentRepository, 'findOne').mockResolvedValue(undefined);

      await expect(paymentService.findById(paymentId)).rejects.toThrowError(
        new NotFoundException(`Payment with ID ${paymentId} not found`),
      );
    });
  });

  describe('findByUserId', () => {
    it('should return a Payment by User ID', async () => {
      const mockPayment = paymentFactory.build();
      jest.spyOn(paymentRepository, 'findOne').mockResolvedValue(mockPayment);

      const result = await paymentService.findByUserId(mockPayment.user.id);
      expect(result).toEqual(mockPayment);
    });

    it('should throw NotFoundException if payment is not found for the user', async () => {
      const userId = 123;
      jest.spyOn(paymentRepository, 'findOne').mockResolvedValue(undefined);

      await expect(paymentService.findByUserId(userId)).rejects.toThrowError(
        new NotFoundException(`Payment for user ID ${userId} not found`),
      );
    });
  });

  describe('findByCheckoutId', () => {
    it('should return a Payment by Checkout ID', async () => {
      const mockPayment = paymentFactory.build();
      jest.spyOn(paymentRepository, 'findOne').mockResolvedValue(mockPayment);

      const result = await paymentService.findByCheckoutId(
        mockPayment.checkoutId,
      );
      expect(result).toEqual(mockPayment);
    });

    it('should throw NotFoundException if payment is not found for the checkout ID', async () => {
      const checkoutId = 'nonexistent-checkout-id';
      jest.spyOn(paymentRepository, 'findOne').mockResolvedValue(undefined);

      await expect(
        paymentService.findByCheckoutId(checkoutId),
      ).rejects.toThrowError(
        new NotFoundException(
          `Payment with Checkout ID ${checkoutId} not found`,
        ),
      );
    });
  });

  describe('findByPaymentSourceId', () => {
    it('should return a Payment by Payment Source ID', async () => {
      const mockPayment = paymentFactory.build();
      jest.spyOn(paymentRepository, 'findOne').mockResolvedValue(mockPayment);

      const result = await paymentService.findByPaymentSourceId(
        mockPayment.paymentSourceId,
      );
      expect(result).toEqual(mockPayment);
    });

    it('should throw NotFoundException if payment is not found for the payment source ID', async () => {
      const paymentSourceId = 999;
      jest.spyOn(paymentRepository, 'findOne').mockResolvedValue(undefined);

      await expect(
        paymentService.findByPaymentSourceId(paymentSourceId),
      ).rejects.toThrowError(
        new NotFoundException(
          `Payment with Payment Source ID ${paymentSourceId} not found`,
        ),
      );
    });
  });

  describe('findByPaymentStatus', () => {
    it('should return a Payment by Payment Status', async () => {
      const status = PaymentStatus.COMPLETED;
      const mockPayment = paymentFactory.build();
      jest.spyOn(paymentRepository, 'findOne').mockResolvedValue(mockPayment);

      const result = await paymentService.findByPaymentStatus(status);
      expect(result).toEqual(mockPayment);
    });

    it('should throw NotFoundException if payment is not found for the status', async () => {
      const status = PaymentStatus.FAILED;
      jest.spyOn(paymentRepository, 'findOne').mockResolvedValue(undefined);

      await expect(
        paymentService.findByPaymentStatus(status),
      ).rejects.toThrowError(
        new NotFoundException(` Payment with status ${status} not found`),
      );
    });
  });

  describe('findByPaymentType', () => {
    it('should return a Payment by Payment Type', async () => {
      const type = PaymentType.CREDIT;
      const mockPayment = paymentFactory.build();
      jest.spyOn(paymentRepository, 'findOne').mockResolvedValue(mockPayment);

      const result = await paymentService.findByPaymentType(type);
      expect(result).toEqual(mockPayment);
    });

    it('should throw NotFoundException if payment is not found for the type', async () => {
      const type = PaymentType.DEBIT;
      jest.spyOn(paymentRepository, 'findOne').mockResolvedValue(undefined);

      await expect(paymentService.findByPaymentType(type)).rejects.toThrowError(
        new NotFoundException(` Payment with type ${type} not found`),
      );
    });
  });

  describe('findByReferenceId', () => {
    it('should return a Payment by Reference ID', async () => {
      const mockPayment = paymentFactory.build();
      jest.spyOn(paymentRepository, 'findOne').mockResolvedValue(mockPayment);

      const result = await paymentService.findByReferenceId(
        mockPayment.referenceId,
      );
      expect(result).toEqual(mockPayment);
    });

    it('should throw NotFoundException if payment is not found for the reference ID', async () => {
      const referenceId = 'nonexistent-reference-id';
      jest.spyOn(paymentRepository, 'findOne').mockResolvedValue(undefined);

      await expect(
        paymentService.findByReferenceId(referenceId),
      ).rejects.toThrowError(
        new NotFoundException(
          `Payment with reference ID ${referenceId} not found`,
        ),
      );
    });
  });
});
