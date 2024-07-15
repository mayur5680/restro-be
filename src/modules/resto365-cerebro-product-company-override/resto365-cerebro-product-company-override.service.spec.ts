import { Test, TestingModule } from '@nestjs/testing';
import { Resto365CerebroProductCompanyOverrideService } from './resto365-cerebro-product-company-override.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Resto365CerebroProductCompanyOverride } from './entities/resto365-cerebro-product-company-override.entity';
import { Repository } from 'typeorm';

describe('Resto365CerebroProductCompanyOverrideService', () => {
  let service: Resto365CerebroProductCompanyOverrideService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Resto365CerebroProductCompanyOverrideService,
        {
          provide: getRepositoryToken(
            Resto365CerebroProductCompanyOverride,
            'r365',
          ),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<Resto365CerebroProductCompanyOverrideService>(
      Resto365CerebroProductCompanyOverrideService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
