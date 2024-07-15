import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TempRestaurant } from './entities/resto365-restaurant-temp.entity';
import { Resto365RestaurantTempService } from './resto365-restaurant-temp.service';
import { Resto365RestaurantService } from '../resto365-restaurant/resto365-restaurant.service';
import { Resto365Restaurant } from '@modules/resto365-restaurant/entities/resto365-restaurant.entity';

describe('Resto365RestaurantTempService', () => {
  let service: Resto365RestaurantTempService;
  let repository: Repository<TempRestaurant>;
  let restaurantService: Resto365RestaurantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Resto365RestaurantTempService,
        {
          provide: getRepositoryToken(TempRestaurant, 'r365'),
          useClass: Repository,
        },
        {
          provide: Resto365RestaurantService,
          useValue: {
            syncWithBhyve: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<Resto365RestaurantTempService>(
      Resto365RestaurantTempService,
    );
    repository = module.get<Repository<TempRestaurant>>(
      getRepositoryToken(TempRestaurant, 'r365'),
    );
    restaurantService = module.get<Resto365RestaurantService>(
      Resto365RestaurantService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('syncTempRestaurantToRestaurant', () => {
    it('should sync temp restaurants to main restaurants and delete them from temp table', async () => {
      const tempRestaurants = [
        {
          bhyveId: 1,
          restaurantName: 'Test Restaurant',
          address1: 'Address 1',
          city: 'City',
          state: 'State',
          postCode: '12345',
          country_name: 'Country',
          areaId: 1,
          phone: '123456789',
          email: 'test@example.com',
          priceTier: 'T1',
          breakfast: 1,
          coffee: 1,
          icedCoffee: 1,
          liquor: 1,
          churro: 1,
          softServe: 1,
          wheelChairAccess: 1,
          dineIn: 1,
          driveThru: 1,
          pickUp: 1,
          longitude: 123.456,
          latitude: 78.901,
          posStoreId: 'POS1',
          oldStoreId: 'OLD1',
          description: 'Description',
          timeZone: 'Timezone',
          orderLink: 'Order Link',
          cateringLink: 'Catering Link',
          storeAlertEmail: 'alert@example.com',
          displayOrder: 1,
          isActive: 1,
          isTest: 0,
          isInAppDeliveryEnabled: 1,
          inActiveReason: 'None',
          isFoodCourt: 1,
          maxOrderValue: 100,
          minOrderValue: 10,
          orderAlertValueThreshold: 50,
          syncLoyaltyDollars: 1,
          syncLoyaltyPoints: 1,
          googlePlaceId: 'Google Place ID',
          gst: 10,
          isGstIncluded: 1,
          taxOfficeCode: 'Tax Code',
          brandSiteRestaurantLink: 'Brand Link',
          fax: '123456789',
          orderingId: 'Order ID',
          orderingName: 'Order Name',
          campaignMonitorCode: 'Campaign Code',
          primaryMarketingArea: 'Primary Area',
          trafficVolume: 100,
          additionalDetails: 'Additional Details',
          storeGroup: 'Group',
          longDescription: 'Long Description',
          formattedStoreName: 'Formatted Name',
          disableStoreOrder: 0,
          isPermanentlyClosed: 0,
          pickupInstruction: 'Instruction',
          comments: `Synced from Temp Restaurant at ${new Date().toISOString()} by Moji`,
          channelIds: [1, 2],
        },
      ] as unknown as TempRestaurant[];

      jest.spyOn(repository, 'find').mockResolvedValue(tempRestaurants);
      jest.spyOn(repository, 'delete').mockResolvedValue(undefined);
      jest
        .spyOn(restaurantService, 'syncWithBhyve')
        .mockResolvedValue({} as Resto365Restaurant);

      const result = await service.syncTempRestaurantToRestaurant();

      expect(result.length).toBe(tempRestaurants.length);
      expect(repository.find).toHaveBeenCalledTimes(1);
      expect(restaurantService.syncWithBhyve).toHaveBeenCalledTimes(
        tempRestaurants.length,
      );
      expect(repository.delete).toHaveBeenCalledTimes(tempRestaurants.length);
    });

    it('should handle errors gracefully', async () => {
      jest.spyOn(repository, 'find').mockRejectedValue(new Error('Error'));

      await expect(service.syncTempRestaurantToRestaurant()).rejects.toThrow(
        Error,
      );
    });
  });
});
