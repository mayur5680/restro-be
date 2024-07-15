import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMerchandiseDto } from './dto/create-merchandise.dto';
import { UpdateMerchandiseDto } from './dto/update-merchandise.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Merchandise } from './entities/merchandise.entity';
import { Repository } from 'typeorm';
import { GygQueryOptions } from '@modules/offer/types';
import { getFilteredWhere, getSortFieldAndDir } from '@modules/offer/utils';

@Injectable()
export class MerchandiseService {
  constructor(
    @InjectRepository(Merchandise)
    private merchandiseRepository: Repository<Merchandise>,
  ) {}

  create(createMerchandiseDto: CreateMerchandiseDto) {
    return this.merchandiseRepository.save(createMerchandiseDto);
  }

  async findAll(options?: GygQueryOptions) {
    const { take = 10, skip = 0 } = options;

    // Do the filtering from ?filters[name]=abc&filters[age]=21
    const where = getFilteredWhere(options);

    // Do the sorting
    const order = getSortFieldAndDir(options, {
      createdAt: 'DESC',
    });

    const [result, total] = await this.merchandiseRepository.findAndCount({
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

  async findOne(id: number) {
    const merchandise = await this.merchandiseRepository.findOne({
      where: { id },
    });

    if (!merchandise) {
      throw new NotFoundException(`Merchandise with ID ${id} not found.`);
    }
    return merchandise;
  }

  async update(id: number, updateMerchandiseDto: UpdateMerchandiseDto) {
    const result = await this.merchandiseRepository.update(
      { id },
      updateMerchandiseDto,
    );

    if (result.affected === 0) {
      throw new NotFoundException(`Merchandise with ID ${id} not found.`);
    }

    return this.findOne(id);
  }

  remove(id: number) {
    return `This action removes a #${id} merchandise`;
  }
}
