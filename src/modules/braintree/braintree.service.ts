import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository, FindManyOptions } from 'typeorm';

import { Braintree } from './braintree.entity';

@Injectable()
export class BraintreeService {
  constructor(
    @InjectRepository(Braintree)
    private readonly braintreeRepository: Repository<Braintree>,
  ) {}

  async findAll(options?: FindManyOptions<Braintree>) {
    try {
      return await this.braintreeRepository.find(options);
    } catch (e) {
      throw new InternalServerErrorException(
        'Unable to fetch list of braintree',
      );
    }
  }

  async findById(id: string) {
    try {
      const braintree = await this.braintreeRepository.findOne({
        where: { id },
      });
      if (!braintree) {
        throw new NotFoundException('Braintree entry not found');
      }
      return braintree;
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw e;
      }
      throw new InternalServerErrorException(
        `Unable to retrieve braintree with id: ${id}`,
      );
    }
  }
}
