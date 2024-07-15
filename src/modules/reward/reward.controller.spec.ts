import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RewardController } from './reward.controller';
import { RewardService } from './reward.service';
import { Reward } from './entities/reward.entity';

describe('RewardController', () => {
  let controller: RewardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RewardController],
      providers: [
        RewardService,
        { provide: getRepositoryToken(Reward), useClass: Repository },
      ],
    }).compile();

    controller = module.get<RewardController>(RewardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
