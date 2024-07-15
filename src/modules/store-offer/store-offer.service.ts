import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStoreOfferDto } from './dto/create-store-offer.dto';
import { UpdateStoreOfferDto } from './dto/update-store-offer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StoreOffer } from './entities/store-offer.entity';
import { Repository } from 'typeorm';
import { GygQueryOptions } from '@modules/offer/types';
import { getFilteredWhere, getSortFieldAndDir } from '@modules/offer/utils';

@Injectable()
export class StoreOfferService {
  constructor(
    @InjectRepository(StoreOffer)
    private storeOfferRepository: Repository<StoreOffer>,
  ) {}

  async create(createStoreOfferDto: CreateStoreOfferDto) {
    const storeOffer = this.storeOfferRepository.create(createStoreOfferDto);

    return this.storeOfferRepository.save(storeOffer);
  }

  async findAll(options?: GygQueryOptions) {
    const { take = 10, skip = 0 } = options;

    // Do the filtering from ?filters[name]=abc&filters[age]=21
    const where = getFilteredWhere(options);

    // Do the sorting
    const order = getSortFieldAndDir(options, {
      createdAt: 'DESC',
    });

    const [result, total] = await this.storeOfferRepository.findAndCount({
      where,
      take,
      skip,
      order,
    });

    return {
      data: result,
      meta: {
        totalRows: total,
        pages: Math.ceil(total / take),
      },
    };
  }
  async findOne(id: string) {
    const result = await this.storeOfferRepository.findOne({ where: { id } });

    if (!result) {
      throw new NotFoundException(`Store Offer with ID ${id} not found.`);
    }

    return result;
  }

  async update(id: string, updateStoreOfferDto: UpdateStoreOfferDto) {
    const result = await this.storeOfferRepository.update(
      { id },
      updateStoreOfferDto,
    );

    if (result.affected === 0) {
      throw new NotFoundException(`Store Offer with ID ${id} not found.`);
    }

    return this.findOne(id);
  }

  remove(id: string) {
    return `This action removes a #${id} storeOffer`;
  }
}
