import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { INestApplication, HttpStatus } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CustomValidationPipe } from '@modules/lib/pipes/customValidation.pipe';
import { ResponseTransformInterceptor } from '@modules/lib/interceptors/responseTransform.interceptor';

import { LoyaltyHistoryController } from './loyaltyHistory.controller';
import { LoyaltyHistoryService } from './loyaltyHistory.service';
import { LoyaltyHistory } from './loyaltyHistory.entity';
import { loyaltyHistoryFactory } from './loyaltyHistory.factory';

describe('LoyaltyHistoryController (e2e)', () => {
  let app: INestApplication;
  let loyaltyHistoryService: LoyaltyHistoryService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [LoyaltyHistoryController],
      providers: [
        LoyaltyHistoryService,
        {
          provide: getRepositoryToken(LoyaltyHistory),
          useClass: Repository,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalInterceptors(new ResponseTransformInterceptor());
    app.useGlobalPipes(new CustomValidationPipe());
    loyaltyHistoryService = moduleFixture.get<LoyaltyHistoryService>(
      LoyaltyHistoryService,
    );

    await app.init();
  });

  describe('GET /loyalty-history/', () => {
    it('should get loyalty history by user id', async () => {
      const loyaltyHistory = loyaltyHistoryFactory.buildList(2);
      const mockResponse = {
        data: loyaltyHistory,
      };

      jest
        .spyOn(loyaltyHistoryService, 'findByUserId')
        .mockResolvedValue(loyaltyHistory);
      await request(app.getHttpServer())
        .get('/loyalty-history?userId=test')
        .expect(HttpStatus.OK)
        .expect(mockResponse);
    });

    it('should get all loyalty history if no query params passed', async () => {
      const loyaltyHistory = loyaltyHistoryFactory.buildList(2);
      const mockResponse = {
        data: loyaltyHistory,
      };

      jest
        .spyOn(loyaltyHistoryService, 'findAll')
        .mockResolvedValue(loyaltyHistory);
      await request(app.getHttpServer())
        .get('/loyalty-history')
        .expect(HttpStatus.OK)
        .expect(mockResponse);
    });

    it('should throw a BadRequestException if wrong query params is pass', async () => {
      await request(app.getHttpServer())
        .get('/loyalty-history?unknown=1')
        .expect(HttpStatus.BAD_REQUEST)
        .expect({
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Bad Request',
          message: 'Invalid query parameter(s) provided',
        });
    });
  });

  describe('GET loyalty-history/:id', () => {
    it('should return a loyalty history by ID', async () => {
      const loyaltyHistory = loyaltyHistoryFactory.build();
      const mockResponse = {
        data: loyaltyHistory,
      };

      jest
        .spyOn(loyaltyHistoryService, 'findById')
        .mockResolvedValue(loyaltyHistory);
      await request(app.getHttpServer())
        .get('/loyalty-history/1')
        .expect(HttpStatus.OK)
        .expect(mockResponse);
    });

    it('should return a NotFoundException if no loyalty history of ID', async () => {
      jest
        .spyOn(loyaltyHistoryService, 'findById')
        .mockResolvedValue(undefined);
      await request(app.getHttpServer())
        .get('/loyalty-history/1')
        .expect(HttpStatus.NOT_FOUND)
        .expect({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Loyalty History not found',
          error: 'Not Found',
        });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
