import { Test, TestingModule } from '@nestjs/testing';
import { PaymentSourceController } from './paymentSource.controller';
import { PaymentSourceService } from './paymentSource.service';
import { Repository } from 'typeorm';
import { PaymentSource } from './paymentSource.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { INestApplication } from '@nestjs/common';
import { paymentSourceFactory } from './paymentSource.factory';

describe('PaymentSourceController (e2e)', () => {
  let app: INestApplication;
  let paymentSourceController: PaymentSourceController;
  let paymentSourceService: PaymentSourceService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [PaymentSourceController],
      providers: [
        PaymentSourceService,
        {
          provide: getRepositoryToken(PaymentSource),
          useClass: Repository,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    paymentSourceController = moduleFixture.get<PaymentSourceController>(
      PaymentSourceController,
    );
    paymentSourceService =
      moduleFixture.get<PaymentSourceService>(PaymentSourceService);

    await app.init();
  });

  it('should be defined', () => {
    expect(paymentSourceController).toBeDefined();
  });

  describe('findAll', () => {
    const mockPaymentSources = paymentSourceFactory.buildList(2);
    const mockTotal = mockPaymentSources.length;

    it('should return an array of Payment Sources', async () => {
      jest.spyOn(paymentSourceService, 'findAll').mockResolvedValue({
        paymentSources: mockPaymentSources,
        total: mockTotal,
      });

      const result = await paymentSourceController.findAll();
      expect(result).toEqual({
        paymentSources: mockPaymentSources,
        total: mockTotal,
      });
    });

    it('should throw an error if array of Payment Sources not found or there is an error', async () => {
      jest
        .spyOn(paymentSourceService, 'findAll')
        .mockRejectedValue(new Error());

      await expect(paymentSourceController.findAll()).rejects.toThrowError(
        new Error(),
      );
    });
  });

  describe('findById', () => {
    it('should return a Payment Source by ID', async () => {
      const mockPaymentSource = paymentSourceFactory.build();
      const mockPaymentSourceId = mockPaymentSource.id;

      jest
        .spyOn(paymentSourceService, 'findById')
        .mockResolvedValue(mockPaymentSource);

      const result =
        await paymentSourceController.findById(mockPaymentSourceId);
      expect(result).toEqual(mockPaymentSource);
    });

    it('should throw an error if a Payment Source by ID not found or there is an error', async () => {
      const mockPaymentSourceId = 123;

      jest
        .spyOn(paymentSourceService, 'findById')
        .mockRejectedValue(new Error());

      await expect(
        paymentSourceController.findById(mockPaymentSourceId),
      ).rejects.toThrowError(new Error());
    });
  });

  describe('findByName', () => {
    it('should return a Payment Source by name', async () => {
      const mockPaymentSource = paymentSourceFactory.build();
      const mockPaymentSourceName = mockPaymentSource.name;

      jest
        .spyOn(paymentSourceService, 'findByName')
        .mockResolvedValue(mockPaymentSource);

      const result = await paymentSourceController.findByName(
        mockPaymentSourceName,
      );
      expect(result).toEqual(mockPaymentSource);
    });

    it('should throw an error if a Payment Source by name not found there is an error', async () => {
      const mockPaymentSourceName = 'paymentSource';

      jest
        .spyOn(paymentSourceService, 'findByName')
        .mockRejectedValue(new Error());

      await expect(
        paymentSourceController.findByName(mockPaymentSourceName),
      ).rejects.toThrowError(new Error());
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
