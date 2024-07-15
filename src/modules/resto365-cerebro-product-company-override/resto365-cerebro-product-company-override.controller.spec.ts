import { Test, TestingModule } from '@nestjs/testing';
import { Resto365CerebroProductCompanyOverrideController } from './resto365-cerebro-product-company-override.controller';
import { Resto365CerebroProductCompanyOverrideService } from './resto365-cerebro-product-company-override.service';
import { Resto365CerebroProductCompanyOverride } from './entities/resto365-cerebro-product-company-override.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('Resto365CerebroProductCompanyOverrideController', () => {
  let controller: Resto365CerebroProductCompanyOverrideController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Resto365CerebroProductCompanyOverrideController],
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

    controller = module.get<Resto365CerebroProductCompanyOverrideController>(
      Resto365CerebroProductCompanyOverrideController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
