import { Test, TestingModule } from '@nestjs/testing';
import { StoreOfferController } from './store-offer.controller';
import { StoreOfferService } from './store-offer.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { StoreOffer } from './entities/store-offer.entity';
import { Repository } from 'typeorm';
import { INestApplication } from '@nestjs/common';

describe('StoreOfferController', () => {
  let app: INestApplication;
  let storeOfferController: StoreOfferController;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [StoreOfferController],
      providers: [
        StoreOfferService,
        {
          provide: getRepositoryToken(StoreOffer),
          useClass: Repository,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    storeOfferController =
      moduleFixture.get<StoreOfferController>(StoreOfferService);

    await app.init();
  });

  it('should be defined', () => {
    expect(storeOfferController).toBeDefined();
  });
});
