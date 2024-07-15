import { Test, TestingModule } from '@nestjs/testing';
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

describe('OktaUsersService', () => {
  let service: OktaUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<OktaUserService>(OktaUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
