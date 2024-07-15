import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository, FindManyOptions } from 'typeorm';

import { Customer } from './customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async findAll(options?: FindManyOptions<Customer>) {
    try {
      return await this.customerRepository.find(options);
    } catch (e) {
      throw new InternalServerErrorException(
        'Unable to fetch list of customers',
      );
    }
  }

  async findById(id: string) {
    try {
      const customer = await this.customerRepository.findOne({ where: { id } });
      if (!customer) {
        throw new NotFoundException('Customer not found');
      }
      return customer;
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw e;
      }
      throw new InternalServerErrorException(
        `Unable to retrieve customer with id: ${id}`,
      );
    }
  }
}
