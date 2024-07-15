/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { OfferMetaService } from './offer-meta.service';
import { Repository } from 'typeorm';
import { OfferMeta } from './entities/offer-meta.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Offer } from '@modules/offer/entities/offer.entity';
import { OfferMetaSection } from './entities/offer-meta-section.entity';

export const providers = [
  OfferMetaService,
  {
    provide: getRepositoryToken(OfferMeta),
    useClass: Repository,
  },
  {
    provide: getRepositoryToken(Offer),
    useClass: Repository,
  },
  {
    provide: getRepositoryToken(OfferMetaSection),
    useClass: Repository,
  },
];

describe('OfferMetaService', () => {
  let service: OfferMetaService;
  let offerMetaRepository: Repository<OfferMeta>;
  let offerRepository: Repository<Offer>;
  let offerMetaSectionRepository: Repository<OfferMetaSection>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers,
    }).compile();

    service = module.get<OfferMetaService>(OfferMetaService);
    offerMetaRepository = module.get<Repository<OfferMeta>>(
      getRepositoryToken(OfferMeta),
    );
    offerRepository = module.get<Repository<Offer>>(getRepositoryToken(Offer));
    offerMetaSectionRepository = module.get<Repository<OfferMetaSection>>(
      getRepositoryToken(OfferMetaSection),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a offer meta by ID', async () => {
      const offerMetaId = randomUUID();
      const mockOfferMeta = {
        id: offerMetaId,
        subTitle:
          'For a limited time we are rewarding GOMEX Members with double GOMEX Points every Monday! 150 GOMEX Points = 10 GYG $ to spend on all your faves.',
        alwaysShow: true,
        callToActionText: 'Order Now',
        callToActionlink: 'gygapp://Menu?',
        webImage: 'https://assets/image_assets/images/original.jpg?1709856917',
        dashboardImageUrl:
          'https://assets/image_assets/images/original.jpg?1709856917',
        dashboardWebImageUrl:
          'https://assets/image_assets/images/original.jpg?1709856917',
        tocTitle: 'Terms and Conditions',
        tocUrl: 'https://www.guzmanygomez.com.au/double-gomex-mondays/',
        brazePromotionId: '455c041e',
        createdAt: new Date(),
        createdBy: 1,
        updatedAt: null,
        updatedBy: null,
        deletedAt: null,
        offerId: '455c041e-3348-4a02-b17d-65240d294449',
        offerMetaSection: {
          title: 'STEPS TO REDEEM',
          description:
            'Jump into the GYG App and log into your GOMEX account.,Add items to your cart (GOMEX Points will be automatically applied).,Checkout and enjoy those bonus points!',
        },
      };
      jest
        .spyOn(offerMetaRepository, 'findOne')
        .mockResolvedValue(mockOfferMeta as OfferMeta);

      const result = await service.findOne(offerMetaId);
      expect(result).toEqual(mockOfferMeta);
    });
  });
});
