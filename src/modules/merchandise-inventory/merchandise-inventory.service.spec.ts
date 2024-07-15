import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MerchandiseInventoryService } from './merchandise-inventory.service';
import { MerchandiseInventory } from './entities/merchandise-inventory.entity';

describe('MerchandiseInventoryService', () => {
  let service: MerchandiseInventoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MerchandiseInventoryService,
        {
          provide: getRepositoryToken(MerchandiseInventory),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<MerchandiseInventoryService>(
      MerchandiseInventoryService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
