import { Test, TestingModule } from '@nestjs/testing';
import { OktaUserController } from './okta-user.controller';
import { OktaUserService } from './okta-user.service';
import { ConfigService } from '@modules/config/config.service';
import { HttpService } from '@nestjs/axios';

const mockConfigService = {
  get oktaConfig() {
    return {
      oktaApiUrl: '',
      oktaApiToken: '',
    };
  },
};

describe('OktaUsersController', () => {
  let controller: OktaUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OktaUserController],
      providers: [
        OktaUserService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
        {
          provide: HttpService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<OktaUserController>(OktaUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
