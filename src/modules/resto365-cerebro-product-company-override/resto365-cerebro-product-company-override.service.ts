import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Resto365CerebroProductCompanyOverride } from './entities/resto365-cerebro-product-company-override.entity';
import { In, Repository } from 'typeorm';
import { CreateResto365CerebroProductCompanyOverrideDto } from './dto/create-resto365-cerebro-product-company-override.dto';

@Injectable()
export class Resto365CerebroProductCompanyOverrideService {
  constructor(
    @InjectRepository(Resto365CerebroProductCompanyOverride, 'r365')
    private readonly Resto365CerebroProductCompanyOverrideRepository: Repository<Resto365CerebroProductCompanyOverride>,
  ) {}

  async findAll(): Promise<Resto365CerebroProductCompanyOverride[]> {
    try {
      return this.Resto365CerebroProductCompanyOverrideRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async upsert(
    createResto365CerebroProductOverrideDto: CreateResto365CerebroProductCompanyOverrideDto[],
  ) {
    await this.Resto365CerebroProductCompanyOverrideRepository.upsert(
      createResto365CerebroProductOverrideDto,
      ['id'],
    );
  }

  async findAllByCerebroProductCompanyIds(
    restaurantId: number,
    cerebroProductCompanyIds: number[],
  ): Promise<Resto365CerebroProductCompanyOverride[]> {
    try {
      const productOverride =
        await this.Resto365CerebroProductCompanyOverrideRepository.find({
          where: {
            restaurantId,
            cerebroProductCompanyId: In(cerebroProductCompanyIds),
          },
        });

      return productOverride;
    } catch (error) {
      throw error;
    }
  }

  async remove(
    restaurantId: number,
    cerebroProductCompanyIds: number[],
  ): Promise<void> {
    try {
      await this.Resto365CerebroProductCompanyOverrideRepository.delete({
        restaurantId,
        cerebroProductCompanyId: In(cerebroProductCompanyIds),
      });
    } catch (error) {
      throw error;
    }
  }
}
