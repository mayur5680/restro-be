import { Test, TestingModule } from '@nestjs/testing';
import { CerebroProductService } from './cerebro-product.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CerebroProduct } from './entities/cerebro-product.entity';
import { Repository } from 'typeorm';

describe('CerebroProductService', () => {
  let service: CerebroProductService;
  let repository: Repository<CerebroProduct>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CerebroProductService,
        {
          provide: getRepositoryToken(CerebroProduct, 'cerebro'),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CerebroProductService>(CerebroProductService);
    repository = module.get<Repository<CerebroProduct>>(
      getRepositoryToken(CerebroProduct, 'cerebro'),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of cerebro products', async () => {
      const mockResult = [new CerebroProduct(), new CerebroProduct()];
      jest.spyOn(repository, 'find').mockResolvedValue(mockResult);

      const result = await service.findAll();
      expect(result).toEqual(mockResult);
    });

    it('should return an empty array if no cerebro products are found', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([]);
      const result = await service.findAll();
      expect(result).toEqual([]);
    });
  });
});
