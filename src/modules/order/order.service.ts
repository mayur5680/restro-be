import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { Store } from '@modules/store/entities/store.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  public async findById(id: string): Promise<Order> {
    try {
      return this.orderRepository.findOne({ where: { id } });
    } catch (error) {
      // Handle or log the error
      throw new Error(`Failed to find order by ID: ${error.message}`);
    }
  }

  public async findByUserId(
    userId: number | string,
  ): Promise<Partial<Order>[]> {
    try {
      return this.orderRepository
        .createQueryBuilder('order')
        .innerJoinAndSelect(
          'order.checkout',
          'checkout',
          'checkout.orderId = order.id',
        )
        .innerJoinAndSelect('order.store', 'store', 'store.id = order.storeId')
        .select([
          'order.id AS id',
          'store.name AS storeName',
          'order.createdAt AS createdAt',
          'order.status AS status',
          'order.amountIncludingGst as amountIncludingGst',
          'order.amountExcludingGst as amountExcludingGst',
          'order.pickUpTime AS pickUpTime',
          'order.clientPlatformType AS clientPlatformType',
          'order.clientVersion AS clientVersion',
          'checkout.id AS checkoutId',
          'collectionType AS collectionType',
          'checkout.posOrderId AS posOrderId',
          'checkout.posOrderTimeStamp AS posOrderTimestamp',
          "IFNULL(JSON_EXTRACT(order.itemsResponse, '$.loyalty.accruedPoints'), '')  AS accruedPoints",
          "IFNULL(JSON_EXTRACT(order.itemsResponse, '$.loyalty.convertedDollars'), '')  AS convertedDollars",
          "IFNULL(JSON_EXTRACT(order.itemsResponse, '$.loyalty.actualPointsBalance'), '')  AS actualPointsBalance",
          "IFNULL(JSON_EXTRACT(order.itemsResponse, '$.loyalty.actualDollarsBalance'), '')  AS actualDollarsBalance",
        ])
        .where('checkout.userId = :userId', { userId })
        .orderBy('checkout.createdAt', 'DESC')
        .getRawMany();
    } catch (error) {
      throw new Error(`Failed to find orders by user ID: ${error.message}`);
    }
  }

  public async findByStatus(
    status: string,
    page: number = 1,
    pageSize: number = 10,
  ): Promise<{ orders: Order[]; total: number }> {
    try {
      const [orders, total] = await this.orderRepository.findAndCount({
        where: { status },
        take: pageSize,
        skip: (page - 1) * pageSize,
      });
      return { orders, total };
    } catch (error) {
      // Handle or log the error
      throw new Error(`Failed to find orders by status: ${error.message}`);
    }
  }

  public async findByPosOrderId(posOrderId: number): Promise<Order[]> {
    try {
      return this.orderRepository.find({
        where: { orderNumber: posOrderId },
      });
    } catch (error) {
      // Handle or log the error
      throw new Error(
        `Failed to find orders by POS order ID: ${error.message}`,
      );
    }
  }

  public async findBySupportTicketId(
    supportTicketId: number,
  ): Promise<Order[]> {
    try {
      return this.orderRepository.find({
        where: { supportTicketId },
      });
    } catch (error) {
      // Handle or log the error
      throw new Error(
        `Failed to find orders by support ticket ID: ${error.message}`,
      );
    }
  }

  public async findByParentOrderId(parentOrderId: string): Promise<Order[]> {
    try {
      return this.orderRepository.find({
        where: { parentOrderId },
      });
    } catch (error) {
      // Handle or log the error
      throw new Error(
        `Failed to find orders by parent order ID: ${error.message}`,
      );
    }
  }

  public async findByStoreId(
    storeId: Store['id'],
    page: number = 1,
    pageSize: number = 10,
  ): Promise<{ orders: Order[]; total: number }> {
    try {
      const [orders, total] = await this.orderRepository.findAndCount({
        where: { store: { id: storeId } },
        take: pageSize,
        skip: (page - 1) * pageSize,
      });

      return { orders, total };
    } catch (error) {
      // Handle or log the error
      throw new Error(`Failed to find orders by store ID: ${error.message}`);
    }
  }
}
