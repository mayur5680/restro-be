import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Resto365CerebroProductCompany } from './entities/resto365-cerebro-product-company.entity';
import { CreateResto365CerebroProductCompanyDto } from './dto/create-resto365-cerebro-product-company.dto';
import { IsNull, Not, Repository, InsertResult, In } from 'typeorm';

@Injectable()
export class Resto365CerebroProductCompanyService {
  constructor(
    @InjectRepository(Resto365CerebroProductCompany, 'r365')
    private readonly resto365CerebroProductCompanyRepository: Repository<Resto365CerebroProductCompany>,
  ) {}

  async findAll(): Promise<Resto365CerebroProductCompany[]> {
    try {
      return this.resto365CerebroProductCompanyRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async findAllOrderByName(
    restaurantId: number,
  ): Promise<Resto365CerebroProductCompany[]> {
    try {
      return this.resto365CerebroProductCompanyRepository
        .createQueryBuilder('productCompany')
        .innerJoinAndSelect(
          'productCompany.resto365CerebroCategory',
          'resto365CerebroCategory',
          'resto365CerebroCategory.isActive = :isActive',
          { isActive: true },
        )
        .innerJoinAndSelect(
          'productCompany.resto365CerebroProduct',
          'resto365CerebroProduct',
        )
        .leftJoinAndSelect(
          'productCompany.resto365CerebroProductCompanyOverride',
          'resto365CerebroProductCompanyOverride',
          'resto365CerebroProductCompanyOverride.restaurantId = :restaurantId',
          { restaurantId },
        )
        .orderBy('productCompany.productName', 'ASC')
        .getMany();
    } catch (error) {
      throw error;
    }
  }

  async getCerebroProductCompany(): Promise<Resto365CerebroProductCompany[]> {
    try {
      return this.resto365CerebroProductCompanyRepository.find({
        order: {
          productName: 'ASC',
        },
        relations: ['resto365CerebroCategory', 'resto365CerebroProduct'],
        where: {
          resto365CerebroCategory: Not(IsNull()),
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findAllByGroup() {
    try {
      await this.resto365CerebroProductCompanyRepository.find({
        where: {
          productName: Not(IsNull()),
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findById(
    id: number,
  ): Promise<Resto365CerebroProductCompany | undefined> {
    try {
      const product =
        await this.resto365CerebroProductCompanyRepository.findOne({
          where: { id },
        });
      if (!product) {
        throw new NotFoundException(`Product with id ${id} not found`);
      }
      return product;
    } catch (error) {
      throw error;
    }
  }

  async upsert(
    cerebroProductCompany: CreateResto365CerebroProductCompanyDto[],
  ): Promise<InsertResult> {
    try {
      return await this.resto365CerebroProductCompanyRepository.upsert(
        cerebroProductCompany,
        ['productId'],
      );
    } catch (error) {
      throw error;
    }
  }

  async findAllByIds(ids: number[]): Promise<Resto365CerebroProductCompany[]> {
    try {
      const products = await this.resto365CerebroProductCompanyRepository.find({
        where: { id: In(ids) },
        relations: ['resto365CerebroProduct'],
      });

      return products;
    } catch (error) {
      throw error;
    }
  }
}
