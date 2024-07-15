import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';

import { CustomValidationPipe } from '@modules/lib/pipes/customValidation.pipe';
import { ResponseTransformInterceptor } from '@modules/lib/interceptors/responseTransform.interceptor';

import { LoyaltyController } from './loyalty.controlller';
import { LoyaltyService } from './loyalty.service';
import { Loyalty } from './loyalty.entity';
import { loyaltyFactory } from './loyalty.factory';
import { LoyaltyUserStatsDTO } from './loyalty.dto';
import { ConfigService } from '@modules/config/config.service';

describe('LoyaltyController (e2e)', () => {
  let app: INestApplication;
  let loyaltyService: LoyaltyService;
  let controller: LoyaltyController;
  let configService: ConfigService;

  const mockConfigService = {
    get bhyveConfig() {
      return {
        bhvyeHttp: {
          get: jest.fn(),
        },
      };
    },
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        LoyaltyService,
        {
          provide: getRepositoryToken(Loyalty),
          useClass: Repository,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
      controllers: [LoyaltyController],
    }).compile();

    controller = moduleFixture.get<LoyaltyController>(LoyaltyController);
    configService = moduleFixture.get<ConfigService>(ConfigService);

    app = moduleFixture.createNestApplication();
    app.useGlobalInterceptors(new ResponseTransformInterceptor());
    app.useGlobalPipes(new CustomValidationPipe());
    loyaltyService = moduleFixture.get<LoyaltyService>(LoyaltyService);
    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GET /loyalty/stats', () => {
    it('should return expected results when a valid query parameter is provided', async () => {
      const userId = '1';
      const loyalty = loyaltyFactory.build();

      const mockResponse = plainToInstance(LoyaltyUserStatsDTO, loyalty, {
        excludeExtraneousValues: true,
      });

      jest
        .spyOn(configService.bhyveConfig.bhvyeHttp, 'get')
        .mockImplementation(() => {
          return new Promise((resolve) => {
            resolve('ok');
          });
        });

      jest
        .spyOn(loyaltyService, 'getLoyaltyByUserId')
        .mockImplementation(async () => loyalty);

      expect(await controller.getLoyaltyStatsByUserId(userId)).toStrictEqual(
        mockResponse,
      );
    });
  });
});
