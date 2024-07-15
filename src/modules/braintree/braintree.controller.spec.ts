import { Test, TestingModule } from '@nestjs/testing';
import {
  INestApplication,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import request from 'supertest';
import { ResponseTransformInterceptor } from '@modules/lib/interceptors/responseTransform.interceptor';

import { BraintreeController } from './braintree.controller';
import { BraintreeService } from './braintree.service';
import { Braintree } from './braintree.entity';
import { braintreeFactory } from './braintree.factory';

describe('BraintreeController (e2e)', () => {
  let app: INestApplication;
  let braintreeService: BraintreeService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [BraintreeController],
      providers: [
        BraintreeService,
        {
          provide: getRepositoryToken(Braintree),
          useClass: Repository,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalInterceptors(new ResponseTransformInterceptor());
    braintreeService = moduleFixture.get<BraintreeService>(BraintreeService);
    await app.init();
  });

  describe('GET /braintree', () => {
    it('should return an array of braintree', async () => {
      const mockBraintreeEntries = braintreeFactory.buildList(2);
      jest
        .spyOn(braintreeService, 'findAll')
        .mockResolvedValue(mockBraintreeEntries);
      const mockResponse = {
        data: mockBraintreeEntries,
      };

      await request(app.getHttpServer())
        .get('/braintree')
        .expect(HttpStatus.OK)
        .expect(mockResponse);
    });
  });

  describe('GET /braintree/:id', () => {
    it('should return braintree details for a valid ID', async () => {
      const mockBraintree = braintreeFactory.build();
      jest.spyOn(braintreeService, 'findById').mockResolvedValue(mockBraintree);
      const mockResponse = {
        data: mockBraintree,
      };

      await request(app.getHttpServer())
        .get(`/braintree/${mockBraintree.id}`)
        .expect(HttpStatus.OK)
        .expect(mockResponse);
    });

    it('should throw NotFoundException for an invalid ID', async () => {
      const invalidId = 'invalid-id';
      jest.spyOn(braintreeService, 'findById').mockImplementation(() => {
        throw new NotFoundException('Braintree not found');
      });

      await request(app.getHttpServer())
        .get(`/braintree/${invalidId}`)
        .expect(HttpStatus.NOT_FOUND)
        .expect({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Braintree not found',
          error: 'Not Found',
        });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
