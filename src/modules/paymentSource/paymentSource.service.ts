import { Repository } from 'typeorm';
import { PaymentSource } from './paymentSource.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PaymentSourceService {
  constructor(
    @InjectRepository(PaymentSource)
    private readonly paymentSourceRepository: Repository<PaymentSource>,
  ) {}

  public async findAll(
    page: number = 1,
    pageSize: number = 10,
  ): Promise<{ paymentSources: PaymentSource[]; total: number }> {
    try {
      const [paymentSources, total] =
        await this.paymentSourceRepository.findAndCount({
          take: pageSize,
          skip: (page - 1) * pageSize,
        });

      return { paymentSources, total };
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  public async findById(id: number): Promise<PaymentSource | undefined> {
    try {
      const paymentSource = await this.paymentSourceRepository.findOne({
        where: {
          id,
        },
      });
      if (!paymentSource) {
        throw new NotFoundException(`PaymentSource with ID ${id} not found`);
      }
      return paymentSource;
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  public async findByName(name: string): Promise<PaymentSource | undefined> {
    try {
      const paymentSource = await this.paymentSourceRepository.findOne({
        where: {
          name,
        },
      });
      if (!paymentSource) {
        throw new NotFoundException(
          `PaymentSource with status ${name} not found`,
        );
      }
      return paymentSource;
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }
}
