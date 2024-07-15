/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { PaymentSource } from './paymentSource.entity';
import { PaymentSourceService } from './paymentSource.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { paymentSourceFactory } from './paymentSource.factory';

describe('PaymentSourceService', () => {
  let paymentSourceService: PaymentSourceService;
  let paymentSourceRepository: Repository<PaymentSource>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentSourceService,
        {
          provide: getRepositoryToken(PaymentSource),
          useClass: Repository,
        },
      ],
    }).compile();

    paymentSourceService =
      module.get<PaymentSourceService>(PaymentSourceService);
    paymentSourceRepository = module.get<Repository<PaymentSource>>(
      getRepositoryToken(PaymentSource),
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(paymentSourceService).toBeDefined();
  });

  describe('findAll', () => {
    const mockPaymentSources = paymentSourceFactory.buildList(2);
    const mockTotal = mockPaymentSources.length;

    it('should return an array of paymentSources', async () => {
      jest
        .spyOn(paymentSourceRepository, 'findAndCount')
        .mockResolvedValue([mockPaymentSources, mockTotal]);

      const result = await paymentSourceService.findAll();
      expect(result).toEqual({
        paymentSources: mockPaymentSources,
        total: mockTotal,
      });
    });

    it('should throw an error if there is an error', async () => {
      jest
        .spyOn(paymentSourceRepository, 'findAndCount')
        .mockRejectedValue(new Error());

      await expect(paymentSourceService.findAll()).rejects.toThrowError(
        new Error(),
      );
    });
  });

  describe('findById', () => {
    it('should return a paymentSource by ID', async () => {
      const mockPaymentSource = paymentSourceFactory.build();
      jest
        .spyOn(paymentSourceRepository, 'findOne')
        .mockResolvedValue(mockPaymentSource);

      const result = await paymentSourceService.findById(mockPaymentSource.id);
      expect(result).toEqual(mockPaymentSource);
    });

    it('should throw NotFoundException if paymentSource is not found', async () => {
      const paymentSourceId = 2;
      jest
        .spyOn(paymentSourceRepository, 'findOne')
        .mockResolvedValue(undefined);

      await expect(
        paymentSourceService.findById(paymentSourceId),
      ).rejects.toThrowError(
        new NotFoundException(
          `PaymentSource with ID ${paymentSourceId} not found`,
        ),
      );
    });
  });

  describe('findByName', () => {
    it('should return a paymentSource by name', async () => {
      const mockPaymentSource = paymentSourceFactory.build();
      jest
        .spyOn(paymentSourceRepository, 'findOne')
        .mockResolvedValue(mockPaymentSource);

      const result = await paymentSourceService.findByName(
        mockPaymentSource.name,
      );
      expect(result).toEqual(mockPaymentSource);
    });

    it('should throw NotFoundException if paymentSource is not found', async () => {
      const paymentSourceName = 'paymentSource';
      jest
        .spyOn(paymentSourceRepository, 'findOne')
        .mockResolvedValue(undefined);

      await expect(
        paymentSourceService.findByName(paymentSourceName),
      ).rejects.toThrowError(
        new NotFoundException(
          `PaymentSource with status ${paymentSourceName} not found`,
        ),
      );
    });
  });
});
