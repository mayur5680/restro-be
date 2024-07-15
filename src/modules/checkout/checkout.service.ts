import { Repository } from 'typeorm';
import { Checkout } from './checkout.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@modules/user/user.entity';

@Injectable()
export class CheckoutService {
  constructor(
    @InjectRepository(Checkout)
    private readonly checkoutRepository: Repository<Checkout>,
  ) {}

  public async findById(id: string): Promise<Checkout | undefined> {
    try {
      const checkout = await this.checkoutRepository.findOne({
        where: {
          id,
        },
      });
      if (!checkout) {
        throw new NotFoundException(`Checkout with ID ${id} not found`);
      }
      return checkout;
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  public async findByUserId(userId: User['id']): Promise<Checkout | undefined> {
    try {
      const checkout = await this.checkoutRepository.findOne({
        where: {
          user: { id: userId },
        },
      });
      if (!checkout) {
        throw new NotFoundException(`Checkout for user ID ${userId} not found`);
      }
      return checkout;
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  public async findByCustomerId(
    customerId: string,
  ): Promise<Checkout | undefined> {
    try {
      const checkout = await this.checkoutRepository.findOne({
        where: {
          customerId,
        },
      });
      if (!checkout) {
        throw new NotFoundException(
          `Checkout with customer ID ${customerId} not found`,
        );
      }
      return checkout;
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  public async findByOrderId(orderId: string): Promise<Checkout | undefined> {
    try {
      const checkout = await this.checkoutRepository.findOne({
        where: {
          orderId,
        },
      });
      if (!checkout) {
        throw new NotFoundException(
          `Checkout with order ID ${orderId} not found`,
        );
      }
      return checkout;
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  public async findByPosOrderId(
    posOrderId: number,
  ): Promise<Checkout | undefined> {
    try {
      const checkout = await this.checkoutRepository.findOne({
        where: {
          posOrderId,
        },
      });
      if (!checkout) {
        throw new NotFoundException(
          `Checkout with POS order ID ${posOrderId} not found`,
        );
      }
      return checkout;
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  public async findByStatus(status: string): Promise<Checkout | undefined> {
    try {
      const checkout = await this.checkoutRepository.findOne({
        where: {
          status,
        },
      });
      if (!checkout) {
        throw new NotFoundException(`Checkout with status ${status} not found`);
      }
      return checkout;
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  public async findAll(
    page: number = 1,
    pageSize: number = 10,
  ): Promise<{ checkouts: Checkout[]; total: number }> {
    try {
      const [checkouts, total] = await this.checkoutRepository.findAndCount({
        take: pageSize,
        skip: (page - 1) * pageSize,
      });

      return { checkouts, total };
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }
}
