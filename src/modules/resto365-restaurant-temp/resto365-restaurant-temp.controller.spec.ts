import { Test, TestingModule } from '@nestjs/testing';
import { Resto365RestaurantTempController } from './resto365-restaurant-temp.controller';
import { Resto365RestaurantTempService } from './resto365-restaurant-temp.service';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';

describe('Resto365RestaurantTempController', () => {
  let controller: Resto365RestaurantTempController;
  let service: Resto365RestaurantTempService;

  const mockUser = {
    id: 1,
    email: 'test@test.com',
    roleId: 1,
  } as Resto365User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Resto365RestaurantTempController],
      providers: [
        {
          provide: Resto365RestaurantTempService,
          useValue: {
            syncTempRestaurantToRestaurant: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    controller = module.get<Resto365RestaurantTempController>(
      Resto365RestaurantTempController,
    );
    service = module.get<Resto365RestaurantTempService>(
      Resto365RestaurantTempService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('syncTempRestaurantToRestaurant', () => {
    it('should call service and return an array', async () => {
      const result = await controller.syncTempRestaurantToRestaurant(mockUser);
      expect(result).toEqual([]);
      expect(service.syncTempRestaurantToRestaurant).toHaveBeenCalled();
    });
  });
});
