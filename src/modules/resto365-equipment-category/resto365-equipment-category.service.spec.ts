import { Test, TestingModule } from '@nestjs/testing';
import { Resto365EquipmentCategoryService } from './resto365-equipment-category.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Resto365EquipmentCategory } from './entities/resto365-equipment-category.entity';
import { Repository } from 'typeorm';

describe('Resto365EquipmentCategoryService', () => {
  let service: Resto365EquipmentCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Resto365EquipmentCategoryService,
        {
          provide: getRepositoryToken(Resto365EquipmentCategory, 'r365'),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<Resto365EquipmentCategoryService>(
      Resto365EquipmentCategoryService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
