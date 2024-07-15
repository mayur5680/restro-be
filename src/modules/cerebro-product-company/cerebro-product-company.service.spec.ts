import { Test, TestingModule } from '@nestjs/testing';
import { CerebroProductCompanyService } from './cerebro-product-company.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CerebroProductCompany } from './entities/cerebro-product-company.entity';
import { Repository } from 'typeorm';

describe('CerebroProductCompanyService', () => {
  let service: CerebroProductCompanyService;
  let repository: Repository<CerebroProductCompany>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CerebroProductCompanyService,
        {
          provide: getRepositoryToken(CerebroProductCompany, 'cerebro'),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CerebroProductCompanyService>(
      CerebroProductCompanyService,
    );
    repository = module.get<Repository<CerebroProductCompany>>(
      getRepositoryToken(CerebroProductCompany, 'cerebro'),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of cerebroProductCompany', async () => {
      const mockResult = [
        new CerebroProductCompany(),
        new CerebroProductCompany(),
      ];
      jest.spyOn(repository, 'find').mockResolvedValue(mockResult);

      const result = await service.findAll();
      expect(result).toEqual(mockResult);
    });

    it('should return an empty array if no cerebroProductCompany are found', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([]);
      const result = await service.findAll();
      expect(result).toEqual([]);
    });
  });
});
