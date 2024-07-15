import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
// import { plainToInstance, instanceToPlain } from 'class-transformer';
import request from 'supertest';

import { CustomValidationPipe } from '@modules/lib/pipes/customValidation.pipe';
import { ResponseTransformInterceptor } from '@modules/lib/interceptors/responseTransform.interceptor';
// import { Store } from '@modules/store/store.entity';

import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Order } from './order.entity';
import { orderFactory } from './order.factory';
// import { OrderByUserIdResponseDTO } from './order.dto';

describe('OrderController', () => {
  let app: INestApplication;
  let orderService: OrderService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        OrderService,
        {
          provide: getRepositoryToken(Order),
          useClass: Repository,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalInterceptors(new ResponseTransformInterceptor());
    app.useGlobalPipes(new CustomValidationPipe());
    orderService = moduleFixture.get<OrderService>(OrderService);

    await app.init();
  });

  describe('GET /orders', () => {
    it('should get orders by user id when passed a userId query param', async () => {
      const orders = orderFactory.buildList(2);
      // Move this to utlity
      // const transformedOrders = instanceToPlain(
      //   plainToInstance(OrderByUserIdResponseDTO, orders, {
      //     excludeExtraneousValues: true,
      //   }),
      // );
      // const mockResponse = {
      //   data: transformedOrders,
      // };

      jest
        .spyOn(orderService, 'findByUserId')
        .mockImplementation(async () => orders);

      await request(app.getHttpServer())
        .get('/orders?userId=1')
        .expect(HttpStatus.OK);
      // todo(jhudiel) - refactor service to be testable
      // .expect(mockResponse);
    });
  });

  // it('should be defined', () => {
  //   expect(orderController).toBeDefined();
  // });

  // describe('findById', () => {
  //   it('should return a order by ID', async () => {
  //     const orderId = '1';
  //     const mockOrder = new Order();
  //     mockOrder.id = orderId;
  //     jest.spyOn(orderController, 'findById').mockResolvedValue(mockOrder);

  //     const result = await orderController.findById(orderId);
  //     expect(result).toEqual(mockOrder);
  //   });
  // });

  // describe('findByUserId', () => {
  //   it('should return a order by user ID', async () => {
  //     const userId = '1';
  //     const mockOrder = new Order();
  //     mockOrder.createdBy = userId;
  //     jest
  //       .spyOn(orderController, 'findByUserId')
  //       .mockResolvedValue([mockOrder]);

  //     const result = await orderController.findByUserId(userId);
  //     expect(result).toEqual([mockOrder]);
  //   });
  // });

  // describe('getOrdersByStatus', () => {
  //   it('should return orders by status', async () => {
  //     const status = 'COMPLETED';
  //     const mockResult = {
  //       orders: [new Order()],
  //       total: 1,
  //       page: 1,
  //       pageSize: 10,
  //     };

  //     jest.spyOn(orderService, 'findByStatus').mockResolvedValue(mockResult);

  //     const result = await orderController.getOrdersByStatus(status);
  //     expect(result).toEqual(mockResult);
  //   });

  //   it('should handle errors', async () => {
  //     const status = 'INVALID_STATUS';
  //     const errorMessage = 'Invalid status';

  //     jest
  //       .spyOn(orderService, 'findByStatus')
  //       .mockRejectedValue(new Error(errorMessage));

  //     const result = await orderController.getOrdersByStatus(status);
  //     expect(result).toEqual({ error: errorMessage });
  //   });
  // });

  // describe('findByPosOrderId', () => {
  //   it('should return a order by posOrderId', async () => {
  //     const posOrderId = 123;
  //     const mockOrder = new Order();
  //     mockOrder.orderNumber = posOrderId;
  //     jest
  //       .spyOn(orderController, 'findByPosOrderId')
  //       .mockResolvedValue([mockOrder]);

  //     const result = await orderController.findByPosOrderId(posOrderId);
  //     expect(result).toEqual([mockOrder]);
  //   });
  // });

  // describe('findBySupportTicketId', () => {
  //   it('should return a order by supportTicketId', async () => {
  //     const supportTicketId = 123;
  //     const mockOrder = new Order();
  //     mockOrder.supportTicketId = supportTicketId;
  //     jest
  //       .spyOn(orderController, 'findBySupportTicketId')
  //       .mockResolvedValue([mockOrder]);

  //     const result =
  //       await orderController.findBySupportTicketId(supportTicketId);
  //     expect(result).toEqual([mockOrder]);
  //   });
  // });

  // describe('findByParentOrderId', () => {
  //   it('should return a order by parentOrderId', async () => {
  //     const parentOrderId = '123';
  //     const mockOrder = new Order();
  //     mockOrder.parentOrderId = parentOrderId;
  //     jest
  //       .spyOn(orderController, 'findByParentOrderId')
  //       .mockResolvedValue([mockOrder]);

  //     const result = await orderController.findByParentOrderId(parentOrderId);
  //     expect(result).toEqual([mockOrder]);
  //   });
  // });

  // describe('getOrdersByStoreId', () => {
  //   it('should return orders by storeId', async () => {
  //     const storeId = new Store().id;
  //     const mockResult = {
  //       orders: [new Order()],
  //       total: 1,
  //       page: 1,
  //       pageSize: 10,
  //     };

  //     jest.spyOn(orderService, 'findByStoreId').mockResolvedValue(mockResult);

  //     const result = await orderController.getOrdersByStoreId(storeId);
  //     expect(result).toEqual(mockResult);
  //   });

  //   it('should handle errors', async () => {
  //     const storeId = null;
  //     const errorMessage = 'Invalid storeId';

  //     jest
  //       .spyOn(orderService, 'findByStoreId')
  //       .mockRejectedValue(new Error(errorMessage));

  //     const result = await orderController.getOrdersByStoreId(storeId);
  //     expect(result).toEqual({ error: errorMessage });
  //   });
  // });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
