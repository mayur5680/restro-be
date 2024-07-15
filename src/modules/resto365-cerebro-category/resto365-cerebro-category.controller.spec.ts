import { Test, TestingModule } from '@nestjs/testing';
import { Resto365CerebroCategoryController } from './resto365-cerebro-category.controller';
import { Resto365CerebroCategoryService } from './resto365-cerebro-category.service';

describe('Resto365CerebroCategoryController', () => {
  let controller: Resto365CerebroCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Resto365CerebroCategoryController],
      providers: [Resto365CerebroCategoryService],
    }).compile();

    controller = module.get<Resto365CerebroCategoryController>(
      Resto365CerebroCategoryController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
