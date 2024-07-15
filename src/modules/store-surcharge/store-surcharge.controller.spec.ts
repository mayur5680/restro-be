import { Test, TestingModule } from '@nestjs/testing';
import { StoreSurchargeController } from './store-surcharge.controller';
import { providers } from './store-surcharge.service.spec';

describe('StoreSurchargeController', () => {
  let controller: StoreSurchargeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreSurchargeController],
      providers,
    }).compile();

    controller = module.get<StoreSurchargeController>(StoreSurchargeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
