import { Test, TestingModule } from '@nestjs/testing';
import { Resto365CerebroSyncController as Resto365CerebroSyncController } from './resto365-cerebro-sync.controller';
import { Resto365CerebroSyncService } from './resto365-cerebro-sync.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resto365CerebroSync } from './entities/resto365-cerebro-sync.entity';

describe('Resto365CerebroSyncController', () => {
  let controller: Resto365CerebroSyncController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Resto365CerebroSyncController],
      providers: [
        Resto365CerebroSyncService,
        {
          provide: getRepositoryToken(Resto365CerebroSync, 'r365'),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<Resto365CerebroSyncController>(
      Resto365CerebroSyncController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
