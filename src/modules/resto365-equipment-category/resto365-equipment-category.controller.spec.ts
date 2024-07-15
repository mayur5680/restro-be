import { Test, TestingModule } from '@nestjs/testing';
import { Resto365EquipmentCategoryController } from './resto365-equipment-category.controller';
import { Resto365EquipmentCategoryService } from './resto365-equipment-category.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Resto365EquipmentCategory } from './entities/resto365-equipment-category.entity';
import { Repository } from 'typeorm';

describe('Resto365EquipmentCategoryController', () => {
  let controller: Resto365EquipmentCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Resto365EquipmentCategoryController],
      providers: [
        Resto365EquipmentCategoryService,
        {
          provide: getRepositoryToken(Resto365EquipmentCategory, 'r365'),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<Resto365EquipmentCategoryController>(
      Resto365EquipmentCategoryController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
