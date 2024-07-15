import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from './entities/store.entity';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { GygQueryOptions } from '@modules/offer/types';
import { getFilteredWhere, getSortFieldAndDir } from '@modules/offer/utils';
import { AuditParams } from 'src/shared/audit-logs.types';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
  ) {}

  private readonly defaultRelations = ['tags', 'tags.tag'];

  public async findById(id: number): Promise<Store> {
    try {
      return await this.storeRepository.findOne({
        where: {
          id,
        },
        relations: this.defaultRelations,
      });
    } catch (error) {
      throw error;
    }
  }

  async findAll(options?: GygQueryOptions) {
    const { take = 10, skip = 0 } = options;

    const where = getFilteredWhere(options);
    const order = getSortFieldAndDir(options, {
      createdAt: 'DESC',
    });

    const queryOptions = {
      where,
      take,
      skip,
      order,
      relations: this.defaultRelations,
    };

    if (options?.filters?.['offerId']) {
      queryOptions.relations = ['offers', 'tags'];
      delete where['offerId'];
      queryOptions.where = {
        ...where,
        offers: {
          id: options.filters['offerId'],
        },
      };
    }

    const [result, total] =
      await this.storeRepository.findAndCount(queryOptions);

    return {
      data: result,
      meta: {
        totalRows: total,
        pages: Math.ceil(total / take),
      },
    };
  }

  async create(createStoreDto: CreateStoreDto): Promise<Store> {
    const store = this.storeRepository.create(createStoreDto);
    return this.storeRepository.save(store);
  }

  async update(
    id: number,
    updateStoreDto: UpdateStoreDto,
    auditParams: AuditParams,
  ): Promise<Store> {
    try {
      await this.storeRepository.save({
        ...updateStoreDto,
        ...auditParams,
        id,
      });
    } catch (error) {
      throw new NotFoundException(`Store with id ${id} not found`);
    }

    return this.findById(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.storeRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Store with id ${id} not found`);
    }

    return;
  }
}
