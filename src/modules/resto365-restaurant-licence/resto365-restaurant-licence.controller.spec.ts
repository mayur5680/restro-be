import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Resto365RestaurantLicenceController } from './resto365-restaurant-licence.controller';
import { Resto365RestaurantLicenceService } from './resto365-restaurant-licence.service';
import { Resto365RestaurantLicence } from './entities/resto365-restaurant-licence.entity';

import { Resto365RestaurantService } from '@modules/resto365-restaurant/resto365-restaurant.service';
import { CreateResto365RestaurantLicenceDto } from './dto/create-resto365-restaurant-licence.dto';
import { UpdateResto365RestaurantLicenceDto } from './dto/update-resto365-restaurant-licence.dto';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';

class MockResto365RestaurantService {
  async findOne() {
    {
      id: 1;
    }
  }
}

describe('Resto365RestaurantLicenceController', () => {
  let controller: Resto365RestaurantLicenceController;
  let service: Resto365RestaurantLicenceService;

  const mockCreateResto365RestaurantLicenceDto: CreateResto365RestaurantLicenceDto =
    {
      licenceName: 'licenceName',
      licenceNumber: '1212121212',
      issueDate: new Date(),
      expiryDate: new Date(),
      renewalNoticePeriodInDays: 30,
      comments: 'comments',
      restaurantId: 1,
    };

  const mockUpdateResto365RestaurantLicenceDto: UpdateResto365RestaurantLicenceDto =
    {
      licenceName: 'licenceName',
      licenceNumber: '1212121212',
      issueDate: new Date(),
      expiryDate: new Date(),
      renewalNoticePeriodInDays: 30,
      comments: 'comments',
      restaurantId: 1,
    };

  const mockUser = {} as Resto365User;
  const mockCorrelationId = 'string-string-string-string-string';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Resto365RestaurantLicenceController],
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

    controller = module.get<Resto365RestaurantLicenceController>(
      Resto365RestaurantLicenceController,
    );

    // Get the service instance from the testing module
    service = module.get<Resto365RestaurantLicenceService>(
      Resto365RestaurantLicenceService,
    );

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a resto365 restaurant licence', async () => {
      const licence = new Resto365RestaurantLicence();
      licence.id = 1;
      licence.licenceName = 'licenceName';
      licence.licenceNumber = '1212121212';
      licence.issueDate = new Date();
      licence.expiryDate = new Date();
      licence.renewalNoticePeriodInDays = 30;
      licence.comments = 'comments';
      licence.restaurantId = 1;
      jest.spyOn(service, 'create').mockResolvedValueOnce(licence);

      expect(
        await controller.create(
          mockCreateResto365RestaurantLicenceDto,
          mockUser,
          mockCorrelationId,
        ),
      ).toEqual({
        data: licence,
        _metadata: {
          entitySource: 'Restaurant',
          entitySourceId: licence.restaurantId,
          description: `Restaurant licence ${licence.licenceNumber} created`,
        },
      });
    });
  });

  describe('findAll', () => {
    it('should return all resto365 restaurant licences', async () => {
      const licence = new Resto365RestaurantLicence();
      licence.id = 1;
      licence.licenceName = 'licenceName';
      licence.licenceNumber = '1212121212';
      licence.issueDate = new Date();
      licence.expiryDate = new Date();
      licence.renewalNoticePeriodInDays = 30;
      licence.comments = 'comments';
      licence.restaurantId = 1;
      jest.spyOn(service, 'findAll').mockResolvedValueOnce([licence]);

      expect(await controller.findAll(mockUser, mockCorrelationId)).toEqual([
        licence,
      ]);
    });
  });

  describe('findOne', () => {
    it('should return a specific resto365 restaurant licence', async () => {
      const licence = new Resto365RestaurantLicence();
      licence.id = 1;
      licence.licenceName = 'licenceName';
      licence.licenceNumber = '1212121212';
      licence.issueDate = new Date();
      licence.expiryDate = new Date();
      licence.renewalNoticePeriodInDays = 30;
      licence.comments = 'comments';
      licence.restaurantId = 1;
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(licence);

      expect(await controller.findOne(1, mockUser, mockCorrelationId)).toBe(
        licence,
      );
    });
  });

  describe('update', () => {
    it('should update a resto365 restaurant licence', async () => {
      const licence = new Resto365RestaurantLicence();
      licence.id = 1;
      licence.licenceName = 'licenceName';
      licence.licenceNumber = '1212121212';
      licence.issueDate = new Date();
      licence.expiryDate = new Date();
      licence.renewalNoticePeriodInDays = 30;
      licence.comments = 'comments';
      licence.restaurantId = 1;
      jest.spyOn(service, 'update').mockResolvedValueOnce(licence);

      expect(
        await controller.update(
          1,
          mockUpdateResto365RestaurantLicenceDto,
          mockUser,
          mockCorrelationId,
        ),
      ).toEqual({
        data: licence,
        _metadata: {
          entitySource: 'Restaurant',
          entitySourceId: licence.restaurantId,
          description: `Restaurant licence ${licence.licenceName} updated`,
        },
      });
    });
  });
});
