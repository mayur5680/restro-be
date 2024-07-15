import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OfferAttributeService } from './offer-attribute.service';
import { OfferAttributes } from './entities/offer-attributes.entity';

describe('OfferAttributeService', () => {
  let service: OfferAttributeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OfferAttributeService,
        {
          provide: getRepositoryToken(OfferAttributes),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<OfferAttributeService>(OfferAttributeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
