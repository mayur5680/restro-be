import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resto365CerebroProductsService } from './resto365-cerebro-products.service';
import { Resto365CerebroProduct } from './entities/resto365-cerebro-product.entity';

describe('Resto365CerebroProductsService', () => {
  let service: Resto365CerebroProductsService;
  let repository: Repository<Resto365CerebroProduct>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Resto365CerebroProductsService,
        {
          provide: getRepositoryToken(Resto365CerebroProduct, 'r365'),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<Resto365CerebroProductsService>(
      Resto365CerebroProductsService,
    );
    repository = module.get<Repository<Resto365CerebroProduct>>(
      getRepositoryToken(Resto365CerebroProduct, 'r365'),
    );
  });

  describe('findByComponentProductId', () => {
    it('should return an array of cerebro products', async () => {
      const cerebroProductsMock = [
        new Resto365CerebroProduct(),
        new Resto365CerebroProduct(),
      ];
      jest.spyOn(repository, 'find').mockResolvedValueOnce(cerebroProductsMock);

      const result = await service.findByComponentProductId('1');

      expect(result).toEqual(cerebroProductsMock);
    });
  });

  describe('findByPosPLU', () => {
    it('should return an array of cerebro products', async () => {
      const cerebroProductsMock = [
        new Resto365CerebroProduct(),
        new Resto365CerebroProduct(),
      ];
      jest.spyOn(repository, 'find').mockResolvedValueOnce(cerebroProductsMock);

      const result = await service.findByPosPLU(1);

      expect(result).toEqual(cerebroProductsMock);
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
