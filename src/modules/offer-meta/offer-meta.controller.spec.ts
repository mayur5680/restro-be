import { Test, TestingModule } from '@nestjs/testing';
import { OfferMetaController } from './offer-meta.controller';
import { OfferMetaService } from './offer-meta.service';
import { OfferMeta } from './entities/offer-meta.entity';
import { providers } from './offer-meta.service.spec';

describe('OfferMetaController', () => {
  let controller: OfferMetaController;
  let service: OfferMetaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OfferMetaController],
      providers,
    }).compile();

    controller = module.get<OfferMetaController>(OfferMetaController);
    service = module.get<OfferMetaService>(OfferMetaService);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a offer meta ID', async () => {
      const offerMetaId = '0587e577-0a9b-4742-82d3-c4d925aa314f';
      const offerId = '0587e577-0a9b-4742-82d3-c4d925aa314e';
      const mockOfferMeta = new OfferMeta();
      mockOfferMeta.offerId = offerId;
      jest.spyOn(service, 'findOne').mockResolvedValue(mockOfferMeta);

      const result = await controller.findOne(offerMetaId);
      expect(result).toEqual(mockOfferMeta);
    });
  });
});
