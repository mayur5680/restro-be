import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRewardDto } from './dto/create-reward.dto';
import { UpdateRewardDto } from './dto/update-reward.dto';
import { GygQueryOptions } from '@modules/offer/types';
import { getFilteredWhere, getSortFieldAndDir } from '@modules/offer/utils';
import { InjectRepository } from '@nestjs/typeorm';
import { Reward } from './entities/reward.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RewardService {
  constructor(
    @InjectRepository(Reward)
    private rewardsRepository: Repository<Reward>,
  ) {}
  create(createRewardDto: CreateRewardDto) {
    const createdReward = this.rewardsRepository.create(createRewardDto);
    return this.rewardsRepository.save(createdReward);
  }

  async findAll(options?: GygQueryOptions) {
    const { take = 10, skip = 0 } = options;

    // Do the filtering from ?filters[name]=abc&filters[age]=21
    const where = getFilteredWhere(options);

    // Do the sorting
    const order = getSortFieldAndDir(options, {
      createdAt: 'DESC',
    });

    const [result, total] = await this.rewardsRepository.findAndCount({
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
    const result = await this.rewardsRepository.findOne({ where: { id } });

    if (!result) {
      throw new NotFoundException(`Reward with ID ${id} not found.`);
    }

    return result;
  }

  async update(id: number, updateRewardDto: UpdateRewardDto) {
    const result = await this.rewardsRepository.update({ id }, updateRewardDto);

    if (result.affected === 0) {
      throw new NotFoundException(`Reward with ID ${id} not found.`);
    }

    return this.findOne(id);
  }

  remove(id: number) {
    return `This action removes a #${id} reward`;
  }
}
