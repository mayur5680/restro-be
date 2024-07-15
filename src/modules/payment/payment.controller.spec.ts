import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';

import { orderFactory } from '@modules/order/order.factory';
import { CustomValidationPipe } from '@modules/lib/pipes/customValidation.pipe';
import { ResponseTransformInterceptor } from '@modules/lib/interceptors/responseTransform.interceptor';

import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { Payment } from './payment.entity';
import { paymentFactory } from './payment.factory';

describe('PaymentController', () => {
  let app: INestApplication;
  let paymentService: PaymentService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [
        PaymentService,
        {
          provide: getRepositoryToken(Payment),
          useClass: Repository,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalInterceptors(new ResponseTransformInterceptor());
    app.useGlobalPipes(new CustomValidationPipe());
    paymentService = moduleFixture.get<PaymentService>(PaymentService);

    await app.init();
  });

  describe('GET /payments', () => {
    it('should get details of payments made against an order', async () => {
      const order = orderFactory.build();
      const payments = paymentFactory.buildList(1);
      jest
        .spyOn(paymentService, 'findByOrderId')
        .mockResolvedValue(Promise.resolve(payments));
      // todo(jhudiel)
      // const mockResponse = {
      //   data: payments
      // }
      await request(app.getHttpServer())
        .get(`/payments?orderId=${order.id}`)
        .expect(HttpStatus.OK);
      // todo(jhudiel)
      // .expect(mockResponse)
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
