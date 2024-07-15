import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OfferAttributes } from './entities/offer-attributes.entity';
import { OfferAttributeController } from './offer-attribute.controller';
import { OfferAttributeService } from './offer-attribute.service';

describe('OfferAttributeController', () => {
  let controller: OfferAttributeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OfferAttributeController],
      providers: [
        OfferAttributeService,
        {
          provide: getRepositoryToken(OfferAttributes),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<OfferAttributeController>(OfferAttributeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
