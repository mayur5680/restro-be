import { Repository } from 'typeorm';
import { Payment, PaymentStatus, PaymentType } from './payment.entity';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@modules/user/user.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  logger = new Logger();
  public async findById(id: string): Promise<Payment | undefined> {
    try {
      const payment = await this.paymentRepository.findOne({
        where: {
          id,
        },
      });
      if (!payment) {
        throw new NotFoundException(`Payment with ID ${id} not found`);
      }
      return payment;
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  public async findByUserId(userId: User['id']): Promise<Payment | undefined> {
    try {
      const payment = await this.paymentRepository.findOne({
        where: {
          user: { id: userId },
        },
      });
      if (!payment) {
        throw new NotFoundException(`Payment for user ID ${userId} not found`);
      }
      return payment;
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  public async findByCheckoutId(
    checkoutId: string,
  ): Promise<Payment | undefined> {
    try {
      const payment = await this.paymentRepository.findOne({
        where: {
          checkoutId,
        },
      });
      if (!payment) {
        throw new NotFoundException(
          `Payment with Checkout ID ${checkoutId} not found`,
        );
      }
      return payment;
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  public async findByPaymentSourceId(
    paymentSourceId: number,
  ): Promise<Payment | undefined> {
    try {
      const payment = await this.paymentRepository.findOne({
        where: {
          paymentSourceId,
        },
      });
      if (!payment) {
        throw new NotFoundException(
          `Payment with Payment Source ID ${paymentSourceId} not found`,
        );
      }
      return payment;
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  public async findByPaymentStatus(
    status: PaymentStatus,
  ): Promise<Payment | undefined> {
    try {
      const payment = await this.paymentRepository.findOne({
        where: {
          status,
        },
      });
      if (!payment) {
        throw new NotFoundException(` Payment with status ${status} not found`);
      }
      return payment;
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  public async findByPaymentType(
    type: PaymentType,
  ): Promise<Payment | undefined> {
    try {
      const payment = await this.paymentRepository.findOne({
        where: {
          type,
        },
      });
      if (!payment) {
        throw new NotFoundException(` Payment with type ${type} not found`);
      }
      return payment;
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  public async findByReferenceId(
    referenceId: string,
  ): Promise<Payment | undefined> {
    try {
      const payment = await this.paymentRepository.findOne({
        where: {
          referenceId,
        },
      });
      if (!payment) {
        throw new NotFoundException(
          `Payment with reference ID ${referenceId} not found`,
        );
      }
      return payment;
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  public async findByOrderId(orderId: string): Promise<Payment[]> {
    try {
      const payments = await this.paymentRepository
        .createQueryBuilder('payment')
        .leftJoinAndSelect('payment.paymentSource', 'paymentSource')
        .leftJoinAndSelect('payment.checkout', 'checkout')
        .leftJoinAndSelect('payment.braintree', 'braintree')
        .select([
          'payment.id',
          'payment.amount',
          'payment.status',
          'payment.createdAt',
          'paymentSource.name',
          'braintree.transactionId',
          'braintree.paymentType',
          'braintree.transactionStatus',
        ])
        .where('checkout.orderId = :orderId', { orderId })
        .getMany();

      return payments;
    } catch (error) {
      throw new InternalServerErrorException(
        `Unable to retrieve payment with orderId: ${orderId}`,
      );
    }
  }
}
