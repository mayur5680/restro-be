import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, IsNull, Not, Repository, In } from 'typeorm';
import { Resto365CerebroProduct } from './entities/resto365-cerebro-product.entity';
import { CreateResto365CerebroProductDto } from './dto/create-cerebro-product.dto';

@Injectable()
export class Resto365CerebroProductsService {
  constructor(
    @InjectRepository(Resto365CerebroProduct, 'r365')
    private readonly cerebroProductRepository: Repository<Resto365CerebroProduct>,
  ) {}

  async findByComponentProductId(
    productCompanyNameNumber: string,
  ): Promise<Resto365CerebroProduct[]> {
    try {
      const cerebroProducts = await this.cerebroProductRepository.find({
        where: { productCompanyNameNumber },
      });

      return cerebroProducts;
    } catch (error) {
      throw error;
    }
  }

  async findByPosPLU(posPLU: number): Promise<Resto365CerebroProduct[]> {
    try {
      const cerebroProducts = await this.cerebroProductRepository.find({
        where: { posPLU },
      });

      return cerebroProducts;
    } catch (error) {
      throw error;
    }
  }

  async upsert(
    cerebroProduct: CreateResto365CerebroProductDto[],
  ): Promise<InsertResult> {
    try {
      return await this.cerebroProductRepository.upsert(cerebroProduct, ['id']);
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<Resto365CerebroProduct[]> {
    try {
      return this.cerebroProductRepository.find({
        where: {
          productCompanyNameNumber: Not(IsNull()),
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findAllComponentProductId(
    productCompanyNameNumber: string[],
  ): Promise<Resto365CerebroProduct[]> {
    try {
      const cerebroProducts = await this.cerebroProductRepository.find({
        where: { productCompanyNameNumber: In(productCompanyNameNumber) },
      });

      return cerebroProducts;
    } catch (error) {
      throw error;
    }
  }
}
