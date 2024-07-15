import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CerebroProduct } from './entities/cerebro-product.entity';
import { IsNull, MoreThanOrEqual, Not, Repository } from 'typeorm';

@Injectable()
export class CerebroProductService {
  constructor(
    @InjectRepository(CerebroProduct, 'cerebro')
    private readonly cerebroProductRepository: Repository<CerebroProduct>,
  ) {}

  async findAll() {
    return await this.cerebroProductRepository.find({
      where: {
        productCompanyNameNumber: Not(IsNull()),
      },
    });
  }

  async getDataByLastTouchDate(
    LAST_TOUCH_DATE: Date,
  ): Promise<CerebroProduct[]> {
    try {
      return await this.cerebroProductRepository.find({
        where: { lastTouchDate: MoreThanOrEqual(LAST_TOUCH_DATE) },
      });
    } catch (error) {
      throw error;
    }
  }
}
