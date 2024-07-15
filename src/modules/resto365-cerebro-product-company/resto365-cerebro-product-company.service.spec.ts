import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resto365CerebroProductCompanyService } from './resto365-cerebro-product-company.service';
import { Resto365CerebroProductCompany } from './entities/resto365-cerebro-product-company.entity';
import { NotFoundException } from '@nestjs/common';

describe('Resto365CerebroProductCompanyService', () => {
  let service: Resto365CerebroProductCompanyService;
  let repository: Repository<Resto365CerebroProductCompany>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Resto365CerebroProductCompanyService,
        {
          provide: getRepositoryToken(Resto365CerebroProductCompany, 'r365'),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<Resto365CerebroProductCompanyService>(
      Resto365CerebroProductCompanyService,
    );
    repository = module.get<Repository<Resto365CerebroProductCompany>>(
      getRepositoryToken(Resto365CerebroProductCompany, 'r365'),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const productsMock = [
        new Resto365CerebroProductCompany(),
        new Resto365CerebroProductCompany(),
      ];
      jest.spyOn(repository, 'find').mockResolvedValueOnce(productsMock);

      const result = await service.findAll();

      expect(result).toEqual(productsMock);
    });
  });

  describe('findById', () => {
    it('should return a product', async () => {
      const productMock = new Resto365CerebroProductCompany();
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(productMock);

      const result = await service.findById(1);

      expect(result).toEqual(productMock);
    });

    it('should throw NotFoundException if no product is found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(undefined);

      await expect(service.findById(1)).rejects.toThrowError(NotFoundException);
    });
  });
});
