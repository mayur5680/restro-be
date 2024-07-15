import { Test, TestingModule } from '@nestjs/testing';
import { Resto365UserService } from './resto365-user.service';
import { getEntityManagerToken, getRepositoryToken } from '@nestjs/typeorm';
import { Resto365User } from './entities/resto365-user.entity';
import { EntityManager, Repository } from 'typeorm';
import { Resto365CountryService } from '@modules/resto365-country/resto365-country.service';
import { AuthService } from '@modules/auth/auth.service';
import { OktaUserService } from '@modules/okta-user/okta-user.service';
import { Resto365RestaurantService } from '@modules/resto365-restaurant/resto365-restaurant.service';
import { Resto365AreaService } from '@modules/resto365-area/resto365-area.service';

describe('Resto365UserService', () => {
  let service: Resto365UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        Resto365UserService,
        {
          provide: Resto365CountryService,
          useValue: {},
        },
        {
          provide: getRepositoryToken(Resto365User, 'r365'),
          useValue: Repository,
        },
        {
          provide: OktaUserService,
          useValue: {},
        },
        {
          provide: getEntityManagerToken('r365'),
          useValue: EntityManager,
        },
        {
          provide: Resto365RestaurantService,
          useValue: {},
        },
        {
          provide: Resto365AreaService,
          useValue: {},
        },
        {
          provide: AuthService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<Resto365UserService>(Resto365UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
