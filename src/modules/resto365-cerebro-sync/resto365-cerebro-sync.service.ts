import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resto365CerebroSync } from './entities/resto365-cerebro-sync.entity';
import { UpdateResto365CerebroSyncDto } from './dto/update-resto365-cerebro-sync.dto';

@Injectable()
export class Resto365CerebroSyncService {
  constructor(
    @InjectRepository(Resto365CerebroSync, 'r365')
    private readonly cerebroSyncRepository: Repository<Resto365CerebroSync>,
  ) {}

  async findOne(name: string): Promise<Resto365CerebroSync> {
    try {
      const cerebroSync = await this.cerebroSyncRepository.findOne({
        where: { name },
      });

      if (!cerebroSync) {
        throw new NotFoundException(`cerebroSync with name ${name} not found.`);
      }

      return cerebroSync;
    } catch (error) {
      throw error;
    }
  }

  async update(
    name: string,
    updateResto365cerebroSyncDto: UpdateResto365CerebroSyncDto,
  ) {
    try {
      await this.cerebroSyncRepository.update(
        name,
        updateResto365cerebroSyncDto,
      );
    } catch (error) {
      throw error;
    }
  }
}
