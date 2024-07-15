import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { Repository } from 'typeorm';
import { getFilteredWhere, getSortFieldAndDir } from './utils';
import { GygQueryOptions } from './types';
import { exceptionWrapper } from 'src/shared';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagsRepository: Repository<Tag>,
  ) {}

  async findAll(options?: GygQueryOptions) {
    try {
      const { take = 10, skip = 0 } = options || {};

      // Do the filtering from ?filters[name]=abc&filters[age]=21
      const where = getFilteredWhere(options);

      // Do the sorting
      const order = getSortFieldAndDir(options, {
        createdAt: 'DESC',
      });

      const [result, total] = await this.tagsRepository.findAndCount({
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
    } catch (error) {
      exceptionWrapper(error);
    }
  }

  async findOne(id: number) {
    const tag = await this.tagsRepository.findOne({
      where: { id },
    });
    return tag;
  }
}
