import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMerchandiseInventoryDto } from './dto/create-merchandise-inventory.dto';
import { UpdateMerchandiseInventoryDto } from './dto/update-merchandise-inventory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MerchandiseInventory } from './entities/merchandise-inventory.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { GygQueryOptions } from '@modules/offer/types';
import { getFilteredWhere, getSortFieldAndDir } from '@modules/offer/utils';

@Injectable()
export class MerchandiseInventoryService {
  constructor(
    @InjectRepository(MerchandiseInventory)
    private merchandiseInventoryRepository: Repository<MerchandiseInventory>,
  ) {}
  create(createMerchandiseInventoryDto: CreateMerchandiseInventoryDto) {
    return this.merchandiseInventoryRepository.create(
      createMerchandiseInventoryDto,
    );
  }

  async findAll(options?: GygQueryOptions) {
    const { take = 10, skip = 0 } = options;

    // Do the filtering from ?filters[name]=abc&filters[age]=21
    const where = getFilteredWhere(options);

    // Do the sorting
    const order = getSortFieldAndDir(options, {
      createdAt: 'DESC',
    });

    const queryOptions: FindManyOptions = {
      where,
      take,
      skip,
      order,
      relations: {
        store: true,
        merchandise: true,
      },
      select: {
        store: {
          id: true,
          name: true,
          city: true,
          state: true,
          postCode: true,
        },
        merchandise: {
          id: true,
          name: true,
        },
      },
    };

    // If the filter options includes offerId, then search stores only for that offerId
    if (options?.filters?.['offerId']) {
      // queryOptions.relations = {
      //   ...queryOptions.relations,
      //   store: {
      //     offers: true,
      //   },
      // };
      delete where['offerId'];
      queryOptions.where = {
        ...where,
        store: {
          offers: {
            id: options.filters['offerId'],
          },
        },
      };
    }

    const [result, total] =
      await this.merchandiseInventoryRepository.findAndCount(queryOptions);

    return {
      data: result,
      meta: {
        totalRows: total,
        pages: Math.ceil(total / take),
      },
    };
  }

  async findOne(id: string) {
    const merchandiseInventory =
      await this.merchandiseInventoryRepository.findOne({
        where: { id },
        relations: {
          store: true,
          merchandise: true,
        },
        select: {
          store: {
            id: true,
            name: true,
            city: true,
            state: true,
            postCode: true,
          },
          merchandise: {
            id: true,
            name: true,
          },
        },
      });

    if (!merchandiseInventory) {
      throw new NotFoundException(
        `Merchandise Inventory with ID ${id} not found.`,
      );
    }
  }

  async update(
    id: string,
    updateMerchandiseInventoryDto: UpdateMerchandiseInventoryDto,
  ) {
    const result = await this.merchandiseInventoryRepository.update(
      { id },
      updateMerchandiseInventoryDto,
    );

    if (result.affected === 0) {
      throw new NotFoundException(
        `Merchandise Inventory with ID ${id} not found.`,
      );
    }

    return this.findOne(id);
  }

  remove(id: string) {
    return `This action removes a #${id} merchandiseInventory`;
  }
}
