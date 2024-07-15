import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MerchandiseController } from './merchandise.controller';
import { MerchandiseService } from './merchandise.service';
import { Merchandise } from './entities/merchandise.entity';

describe('MerchandiseController', () => {
  let controller: MerchandiseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MerchandiseController],
      providers: [
        MerchandiseService,
        { provide: getRepositoryToken(Merchandise), useClass: Repository },
      ],
    }).compile();

    controller = module.get<MerchandiseController>(MerchandiseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
