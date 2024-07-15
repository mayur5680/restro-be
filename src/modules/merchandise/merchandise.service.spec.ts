import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MerchandiseService } from './merchandise.service';
import { Merchandise } from './entities/merchandise.entity';

describe('MerchandiseService', () => {
  let service: MerchandiseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MerchandiseService,
        {
          provide: getRepositoryToken(Merchandise),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<MerchandiseService>(MerchandiseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
