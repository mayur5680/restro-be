import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { Resto365RestaurantLicenceService } from './resto365-restaurant-licence.service';
import { Resto365RestaurantLicence } from './entities/resto365-restaurant-licence.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Resto365RestaurantService } from '@modules/resto365-restaurant/resto365-restaurant.service';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';

class MockResto365RestaurantService {
  async findOne() {
    {
      id: 1;
    }
  }
}

describe('Resto365RestaurantLicenceService', () => {
  let service: Resto365RestaurantLicenceService;

  const mockRestoUser = new Resto365User();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Resto365RestaurantLicenceService,
        {
          provide: getRepositoryToken(Resto365RestaurantLicence, 'r365'),
          useClass: Repository,
        },
        {
          provide: Resto365RestaurantService,
          useClass: MockResto365RestaurantService,
        },
      ],
    }).compile();

    service = module.get<Resto365RestaurantLicenceService>(
      Resto365RestaurantLicenceService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a restaurant licence', async () => {
      const result = {
        id: 1,
        licenceName: 'licenceName',
        licenceNumber: 'licenceNumber',
        issueDate: new Date(),
        expiryDate: new Date(),
        renewalNoticePeriodInDays: 30,
        comments: 'comments',
        restaurantId: 1,
        restaurant: {
          id: 1,
        },
      };

      jest
        .spyOn(service, 'findOne')
        .mockImplementation(async () =>
          Promise.resolve(result as Resto365RestaurantLicence),
        );

      expect(
        await service.findOne(
          1,
          mockRestoUser,
          '765675-6666-67656-876786-65765',
        ),
      ).toBe(result);
    });
  });
});
