import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Resto365CerebroProductsController } from './resto365-cerebro-products.controller';
import { Resto365CerebroProductsService } from './resto365-cerebro-products.service';
import { Resto365CerebroProduct } from './entities/resto365-cerebro-product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('Resto365CerebroProductsController', () => {
  let controller: Resto365CerebroProductsController;
  let service: Resto365CerebroProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Resto365CerebroProductsController],
      providers: [
        Resto365CerebroProductsService,
        {
          provide: getRepositoryToken(Resto365CerebroProduct, 'r365'),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<Resto365CerebroProductsController>(
      Resto365CerebroProductsController,
    );
    service = module.get<Resto365CerebroProductsService>(
      Resto365CerebroProductsService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findByComponentProductId', () => {
    it('should return an array of cerebro products', async () => {
      const cerebroProductsMock: Resto365CerebroProduct[] = [
        new Resto365CerebroProduct(),
        new Resto365CerebroProduct(),
      ];
      jest
        .spyOn(service, 'findByComponentProductId')
        .mockResolvedValueOnce(cerebroProductsMock);

      const result = await controller.findByComponentProductId('1');

      expect(result).toEqual(cerebroProductsMock);
    });

    it('should throw NotFoundException if cerebro products are not found', async () => {
      jest.spyOn(service, 'findByComponentProductId').mockResolvedValueOnce([]);

      await expect(
        controller.findByComponentProductId('1'),
      ).rejects.toThrowError(NotFoundException);
    });
  });
});
