import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CerebroProductCompany } from './entities/cerebro-product-company.entity';
import { MoreThanOrEqual, Repository } from 'typeorm';

@Injectable()
export class CerebroProductCompanyService {
  constructor(
    @InjectRepository(CerebroProductCompany, 'cerebro')
    private readonly cerebroProductCompanyRepository: Repository<CerebroProductCompany>,
  ) {}

  async findAll() {
    try {
      return await this.cerebroProductCompanyRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async getDataByLastTouchDate(
    LAST_TOUCH_DATE: Date,
  ): Promise<CerebroProductCompany[]> {
    try {
      return await this.cerebroProductCompanyRepository.find({
        where: { lastTouchDate: MoreThanOrEqual(LAST_TOUCH_DATE) },
      });
    } catch (error) {
      throw error;
    }
  }
}
