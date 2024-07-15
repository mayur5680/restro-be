import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MerchandiseInventoryController } from './merchandise-inventory.controller';
import { MerchandiseInventoryService } from './merchandise-inventory.service';
import { MerchandiseInventory } from './entities/merchandise-inventory.entity';

describe('MerchandiseInventoryController', () => {
  let controller: MerchandiseInventoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MerchandiseInventoryController],
      providers: [
        MerchandiseInventoryService,
        {
          provide: getRepositoryToken(MerchandiseInventory),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<MerchandiseInventoryController>(
      MerchandiseInventoryController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
