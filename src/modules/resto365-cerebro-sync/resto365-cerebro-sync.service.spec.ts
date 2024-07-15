import { Test, TestingModule } from '@nestjs/testing';
import { Resto365CerebroSyncService as Resto365CerebroSyncService } from './resto365-cerebro-sync.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Resto365CerebroSync } from './entities/resto365-cerebro-sync.entity';
import { Repository } from 'typeorm';

describe('Resto365CerebroSyncService', () => {
  let service: Resto365CerebroSyncService;
  let repository: Repository<Resto365CerebroSync>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Resto365CerebroSyncService,
        {
          provide: getRepositoryToken(Resto365CerebroSync, 'r365'),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<Resto365CerebroSyncService>(
      Resto365CerebroSyncService,
    );
    repository = module.get<Repository<Resto365CerebroSync>>(
      getRepositoryToken(Resto365CerebroSync, 'r365'),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a cerebroSync record by name', async () => {
      const mockResult = new Resto365CerebroSync();
      mockResult.name = 'productCompany';
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockResult);

      const result = await service.findOne('productCompany');
      expect(result).toEqual(mockResult);
    });

    it.skip('should throw NotFoundException if cerebroSync record  not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(service.findOne('productCompany')).rejects.toThrowError();
    });
  });
});
