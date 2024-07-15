import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Resto365EquipmentCategory } from './entities/resto365-equipment-category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class Resto365EquipmentCategoryService {
  constructor(
    @InjectRepository(Resto365EquipmentCategory, 'r365')
    private readonly equipmentCategoryRepository: Repository<Resto365EquipmentCategory>,
  ) {}

  async findAll(): Promise<Resto365EquipmentCategory[]> {
    try {
      const equipmentCategory = await this.equipmentCategoryRepository.find({
        where: { isActive: true },
      });

      return equipmentCategory;
    } catch (error) {
      throw error;
    }
  }
}
