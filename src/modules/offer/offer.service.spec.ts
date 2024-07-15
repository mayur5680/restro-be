import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';

import { Reward } from '@modules/reward/entities/reward.entity';
import { Merchandise } from '@modules/merchandise/entities/merchandise.entity';
import { Product } from '@modules/product/entities/product.entity';

import { OfferService } from './offer.service';
import { Offer } from './entities/offer.entity';
import { OfferAttributes } from '@modules/offer-attribute/entities/offer-attributes.entity';
import { Store } from '@modules/store/entities/store.entity';
import { StoreOffer } from '@modules/store-offer/entities/store-offer.entity';
import { CreateOfferDto } from './dto/create-offer.dto';
import {
  OfferType,
  RewardConfig,
  RewardDiscountType,
  RewardMultiplierCriteria,
  RewardRewardType,
  RewardType,
  TriggerCondition,
  TriggerCriteria,
  UserType,
} from './types';
import { StoreFactory } from './mocks/store.factory';
import { OfferFactory } from './mocks/offer.factory';
import { OfferMeta } from '@modules/offer-meta/entities/offer-meta.entity';
import { OfferMetaSection } from '@modules/offer-meta/entities/offer-meta-section.entity';
import { OfferMetaService } from '@modules/offer-meta/offer-meta.service';

export const providers = [
  OfferService,
  OfferMetaService,
  {
    provide: getRepositoryToken(Offer),
    useClass: Repository,
  },
  {
    provide: getRepositoryToken(OfferAttributes),
    useClass: Repository,
  },
  {
    provide: getRepositoryToken(Store),
    useClass: Repository,
  },
  {
    provide: getRepositoryToken(StoreOffer),
    useClass: Repository,
  },
  {
    provide: getRepositoryToken(Reward),
    useClass: Repository,
  },
  {
    provide: getRepositoryToken(Merchandise),
    useClass: Repository,
  },
  {
    provide: getRepositoryToken(Product),
    useClass: Repository,
  },
  {
    provide: getRepositoryToken(OfferMeta),
    useClass: Repository,
  },
  {
    provide: getRepositoryToken(OfferMetaSection),
    useClass: Repository,
  },
];

describe('OfferService', () => {
  let service: OfferService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let offerMetaService: OfferMetaService;
  let repository: Repository<Offer>;
  let rewardsRepository: Repository<Reward>;
  let offerAttributesRepository: Repository<OfferAttributes>;
  let storeOfferRepository: Repository<StoreOffer>;
  let storesRepository: Repository<Store>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers,
    }).compile();

    service = module.get<OfferService>(OfferService);
    offerMetaService = module.get<OfferMetaService>(OfferMetaService);
    repository = module.get<Repository<Offer>>(getRepositoryToken(Offer));
    rewardsRepository = module.get<Repository<Reward>>(
      getRepositoryToken(Reward),
    );
    offerAttributesRepository = module.get<Repository<OfferAttributes>>(
      getRepositoryToken(OfferAttributes),
    );
    storeOfferRepository = module.get<Repository<StoreOffer>>(
      getRepositoryToken(StoreOffer),
    );
    storesRepository = module.get<Repository<Store>>(getRepositoryToken(Store));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an offer', async () => {
      const createOfferDto: CreateOfferDto = {
        name: 'Demo first offer',
        hook: 'OFFER',
        offerType: OfferType.PRODUCT,
        userType: UserType.REGISTERED,
        oneOff: true,
        offerStores: [899],
        startDate: '2024-02-14T13:00:00.000Z',
        endDate: '2024-02-15T13:00:00.000Z',
        triggerType: null,
        priority: 0,
        rewardTypeId: null,
        offerAttributes: {
          offerDetails: {
            offerBrackets: [
              {
                rewards: [
                  {
                    config: RewardConfig.MULTIPLIER,
                    isDefault: true,
                    multiplier: 2,
                    rewardType: RewardRewardType.GYGPOINTS,
                    description: 'some description',
                    multiplierCriteria:
                      RewardMultiplierCriteria.MIN_ORDER_VALUE,
                    notAvailableDescription: null,
                    type: RewardType.LOYALTY,
                    discountType: RewardDiscountType['NON-DISCOUNTING'],
                  },
                ],
                triggers: [
                  {
                    criteria: TriggerCriteria.MIN_ORDER_VALUE,
                    condition: TriggerCondition.BASKET_TOTAL,
                    minimumOrderValue: 0,
                  },
                ],
                application: 'allMatching',
                shouldMultiply: false,
                shouldDiscountSourceItems: false,
              },
            ],
            bracketApplication: 'all',
          },
          maxAllowedPerUser: 100,
          maxAllowedPerOrder: 100,
        },
      };

      const createdOffer = OfferFactory.getOffer();

      jest
        .spyOn(repository, 'create')
        .mockReturnValue(createdOffer as unknown as Offer);
      jest
        .spyOn(repository, 'save')
        .mockResolvedValue(createdOffer as unknown as Offer);

      jest.spyOn(rewardsRepository, 'create').mockReturnValue({} as Reward);
      jest.spyOn(rewardsRepository, 'save').mockResolvedValue({} as Reward);

      jest
        .spyOn(offerAttributesRepository, 'create')
        .mockReturnValue({} as OfferAttributes);
      jest
        .spyOn(offerAttributesRepository, 'save')
        .mockResolvedValue({} as OfferAttributes);

      jest
        .spyOn(storeOfferRepository, 'insert')
        .mockResolvedValue({} as InsertResult);

      const mockStores = [StoreFactory.getStore()];

      jest.spyOn(storesRepository, 'find').mockResolvedValue(mockStores);

      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValueOnce(createdOffer as unknown as Offer);

      const offer = await service.create(createOfferDto);

      const dataForCreate = { ...createOfferDto, status: 'INACTIVE' };

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { offerStores, offerAttributes, ...rest } = dataForCreate;

      expect(repository.create).toHaveBeenCalledWith(rest);
      expect(offer).toEqual(createdOffer);
    });

    it('should not create an offer', async () => {
      const createOfferDto: CreateOfferDto = {
        name: 'Demo first offer',
        hook: 'OFFER',
        offerType: OfferType.PRODUCT,
        userType: UserType.REGISTERED,
        oneOff: true,
        offerStores: [111899, 223344],
        startDate: '2024-02-14T13:00:00.000Z',
        endDate: '2024-02-15T13:00:00.000Z',
        triggerType: null,
        priority: 0,
        rewardTypeId: null,
        offerAttributes: {
          offerDetails: {
            offerBrackets: [
              {
                rewards: [
                  {
                    config: RewardConfig.MULTIPLIER,
                    isDefault: true,
                    multiplier: 2,
                    rewardType: RewardRewardType.GYGPOINTS,
                    description: 'some description',
                    multiplierCriteria:
                      RewardMultiplierCriteria.MIN_ORDER_VALUE,
                    notAvailableDescription: null,
                    type: RewardType.LOYALTY,
                    discountType: RewardDiscountType['NON-DISCOUNTING'],
                  },
                ],
                triggers: [
                  {
                    criteria: TriggerCriteria.MIN_ORDER_VALUE,
                    condition: TriggerCondition.BASKET_TOTAL,
                    minimumOrderValue: 0,
                  },
                ],
                application: 'allMatching',
                shouldMultiply: false,
                shouldDiscountSourceItems: false,
              },
            ],
            bracketApplication: 'all',
          },
          maxAllowedPerUser: 100,
          maxAllowedPerOrder: 100,
        },
      };

      jest.spyOn(rewardsRepository, 'create').mockReturnValue({} as Reward);
      jest.spyOn(rewardsRepository, 'save').mockResolvedValue({} as Reward);

      jest
        .spyOn(offerAttributesRepository, 'create')
        .mockReturnValue({} as OfferAttributes);
      jest
        .spyOn(offerAttributesRepository, 'save')
        .mockResolvedValue({} as OfferAttributes);

      jest
        .spyOn(storeOfferRepository, 'insert')
        .mockResolvedValue({} as InsertResult);

      const mockStores = [StoreFactory.getStore()];

      jest.spyOn(storesRepository, 'find').mockResolvedValue(mockStores);

      await expect(service.create(createOfferDto)).rejects.toThrow(
        'Cannot find stores with Ids: 111899, 223344',
      );
    });
  });
});
