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

import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { Customer } from './customer.entity';
import { customerFactory } from './customer.factory';

describe('CustomerController (e2e)', () => {
  let app: INestApplication;
  let customerService: CustomerService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [
        CustomerService,
        {
          provide: getRepositoryToken(Customer),
          useClass: Repository,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalInterceptors(new ResponseTransformInterceptor());
    customerService = moduleFixture.get<CustomerService>(CustomerService);
    await app.init();
  });

  describe('GET /customers', () => {
    it('should return an array of customers', async () => {
      const mockCustomers = customerFactory.buildList(2);
      jest.spyOn(customerService, 'findAll').mockResolvedValue(mockCustomers);
      const mockResponse = {
        data: mockCustomers,
      };

      await request(app.getHttpServer())
        .get('/customers')
        .expect(HttpStatus.OK)
        .expect(mockResponse);
    });
  });

  describe('GET /customers/:id', () => {
    it('should return customer details for a valid ID', async () => {
      const mockCustomer = customerFactory.build();
      jest.spyOn(customerService, 'findById').mockResolvedValue(mockCustomer);
      const mockResponse = {
        data: mockCustomer,
      };

      await request(app.getHttpServer())
        .get(`/customers/${mockCustomer.id}`)
        .expect(HttpStatus.OK)
        .expect(mockResponse);
    });

    it('should throw NotFoundException for an invalid ID', async () => {
      const invalidId = 'invalid-id';
      jest.spyOn(customerService, 'findById').mockImplementation(() => {
        throw new NotFoundException('Customer not found');
      });

      await request(app.getHttpServer())
        .get(`/customers/${invalidId}`)
        .expect(HttpStatus.NOT_FOUND)
        .expect({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Customer not found',
          error: 'Not Found',
        });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
