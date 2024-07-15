import { Test, TestingModule } from '@nestjs/testing';
import { StoreTagController } from './store-tag.controller';
import { StoreTagService } from './store-tag.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoreTag } from './entities/store-tag.entity';

describe('StoreTagController', () => {
  let controller: StoreTagController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreTagController],
      providers: [
        StoreTagService,
        {
          provide: getRepositoryToken(StoreTag),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<StoreTagController>(StoreTagController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
