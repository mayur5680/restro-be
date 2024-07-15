import { Test, TestingModule } from '@nestjs/testing';
import { Resto365CerebroCategoryService } from './resto365-cerebro-category.service';

describe('Resto365CerebroCategoryService', () => {
  let service: Resto365CerebroCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Resto365CerebroCategoryService],
    }).compile();

    service = module.get<Resto365CerebroCategoryService>(
      Resto365CerebroCategoryService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
