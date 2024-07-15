import { Controller, Get, Param, Query } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { Store } from '@modules/store/entities/store.entity';
import { OrderService } from './order.service';
import { OrderByUserIdResponseDTO } from './order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get(':id')
  public async findById(@Param('id') id: string) {
    return this.orderService.findById(id);
  }

  @Get()
  public async findByUserId(@Query('userId') userId: number | string) {
    const orders = await this.orderService.findByUserId(userId);
    return plainToInstance(OrderByUserIdResponseDTO, orders, {
      excludeExtraneousValues: true,
    });
  }

  @Get()
  async getOrdersByStatus(
    @Query('status') status: string,
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    try {
      const result = await this.orderService.findByStatus(
        status,
        page,
        pageSize,
      );
      return {
        orders: result.orders,
        total: result.total,
        page,
        pageSize,
      };
    } catch (error) {
      // Handle or log the error
      return { error: error.message };
    }
  }

  @Get()
  public async findByPosOrderId(@Query('posOrderId') posOrderId: number) {
    return this.orderService.findByPosOrderId(posOrderId);
  }

  @Get()
  public async findBySupportTicketId(
    @Query('supportTicketId') supportTicketId: number,
  ) {
    return this.orderService.findBySupportTicketId(supportTicketId);
  }

  @Get(':parentOrderId/child-orders')
  public async findByParentOrderId(
    @Param('parentOrderId') parentOrderId: string,
  ) {
    return this.orderService.findByParentOrderId(parentOrderId);
  }

  @Get()
  async getOrdersByStoreId(
    @Query('storeId') storeId: Store['id'],
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    try {
      const result = await this.orderService.findByStoreId(
        storeId,
        page,
        pageSize,
      );
      return {
        orders: result.orders,
        total: result.total,
        page,
        pageSize,
      };
    } catch (error) {
      // Handle or log the error
      return { error: error.message };
    }
  }
}
