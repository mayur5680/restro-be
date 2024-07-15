import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GygLog } from 'src/shared';
import { Loglevel } from 'src/context';

import { TempRestaurant } from './entities/resto365-restaurant-temp.entity';
import { Resto365RestaurantService } from '../resto365-restaurant/resto365-restaurant.service';
import { UpdateResto365RestaurantDto } from '@modules/resto365-restaurant/dto/update-resto365-restaurant.dto';

@Injectable()
export class Resto365RestaurantTempService {
  logger: GygLog;
  constructor(
    @InjectRepository(TempRestaurant, 'r365')
    private restaurantTempRepository: Repository<TempRestaurant>,
    private restaurantService: Resto365RestaurantService,
  ) {
    this.logger = new GygLog(Resto365RestaurantTempService.name);
  }

  async syncTempRestaurantToRestaurant(): Promise<
    UpdateResto365RestaurantDto[]
  > {
    try {
      const updatedResto365Restaurants: UpdateResto365RestaurantDto[] = [];
      const tempRestaurants = await this.restaurantTempRepository.find();

      for (const tempRestaurant of tempRestaurants) {
        const mapTempRestaurantToUpdateResto365RestaurantDto = (
          tempRestaurant: TempRestaurant,
        ): UpdateResto365RestaurantDto => {
          return {
            restaurantName: tempRestaurant.restaurantName,
            address1: tempRestaurant.address1,
            address2: tempRestaurant.address2,
            city: tempRestaurant.city,
            suburb: tempRestaurant.suburb,
            postCode: tempRestaurant.postCode,
            postalCode: tempRestaurant.postalCode,
            state: tempRestaurant.state,
            country: tempRestaurant.country_name,
            areaId: tempRestaurant.areaId,
            phoneNumber: tempRestaurant.phone,
            restaurantEmail: tempRestaurant.email,
            priceTier: tempRestaurant.priceTier,
            breakfast: tempRestaurant.breakfast ? 1 : 0,
            coffee: tempRestaurant.coffee ? 1 : 0,
            iceMachine: tempRestaurant.icedCoffee ? 1 : 0,
            icedCoffee: tempRestaurant.icedCoffee ? 1 : 0,
            liquor: tempRestaurant.liquor ? 1 : 0,
            churro: tempRestaurant.churro ? 1 : 0,
            quesadillas: 1,
            softServe: tempRestaurant.softServe ? 1 : 0,
            wheelChairAccess: tempRestaurant.wheelChairAccess ? 1 : 0,
            dineIn: tempRestaurant.dineIn ? 1 : 0,
            driveThru: tempRestaurant.driveThru ? 1 : 0,
            pickUp: tempRestaurant.pickUp ? 1 : 0,
            longitude: tempRestaurant.longitude,
            latitude: tempRestaurant.latitude,
            posStoreId: tempRestaurant.posStoreId,
            oldStoreId: tempRestaurant.oldStoreId,
            description: tempRestaurant.description,
            timeZone: tempRestaurant.timeZone,
            orderLink: tempRestaurant.orderLink,
            cateringLink: tempRestaurant.cateringLink,
            storeAlertEmail: tempRestaurant.storeAlertEmail,
            displayOrder: tempRestaurant.displayOrder,
            isActive: tempRestaurant.isActive ? 1 : 0,
            isTest: tempRestaurant.isTest ? 1 : 0,
            isInAppDeliveryEnabled: tempRestaurant.isInAppDeliveryEnabled
              ? 1
              : 0,
            inActiveReason: tempRestaurant.inActiveReason,
            isFoodCourt: tempRestaurant.isFoodCourt ? 1 : 0,
            maxOrderValue: tempRestaurant.maxOrderValue,
            minOrderValue: tempRestaurant.minOrderValue,
            orderAlertValueThreshold: tempRestaurant.orderAlertValueThreshold,
            syncLoyaltyDollars: tempRestaurant.syncLoyaltyDollars ? 1 : 0,
            syncLoyaltyPoints: tempRestaurant.syncLoyaltyPoints ? 1 : 0,
            googlePlaceId: tempRestaurant.googlePlaceId,
            gst: tempRestaurant.gst,
            isGstIncluded: tempRestaurant.isGstIncluded ? 1 : 0,
            taxOfficeCode: tempRestaurant.taxOfficeCode,
            brandSiteRestaurantLink: tempRestaurant.brandSiteRestaurantLink,
            fax: tempRestaurant.fax,
            orderingId: tempRestaurant.orderingId,
            orderingName: tempRestaurant.orderingName,
            campaignMonitorCode: tempRestaurant.campaignMonitorCode,
            primaryMarketingArea: tempRestaurant.primaryMarketingArea,
            trafficVolume: tempRestaurant.trafficVolume,
            additionalDetails: tempRestaurant.additionalDetails,
            storeGroup: tempRestaurant.storeGroup,
            longDescription: tempRestaurant.longDescription,
            formattedStoreName: tempRestaurant.formattedStoreName,
            disableStoreOrder: tempRestaurant.disableStoreOrder ? 1 : 0,
            isPermanentlyClosed: tempRestaurant.isPermanentlyClosed ? 1 : 0,
            pickupInstruction: tempRestaurant.pickupInstruction,
            comments: `Synced from Temp Restaurant at ${new Date().toISOString()} by Moji`,
            channelIds: tempRestaurant.isInAppDeliveryEnabled ? [1, 4] : [1],
          };
        };

        const updateResto365RestaurantDto =
          await this.restaurantService.syncWithBhyve(
            tempRestaurant.bhyveId.toString(),
            mapTempRestaurantToUpdateResto365RestaurantDto(tempRestaurant),
          );

        if (updateResto365RestaurantDto) {
          this.logger.writeLog(
            'Sync Temp Restaurant to Restaurant',
            `Synced restaurant with bhyveId: ${tempRestaurant.bhyveId} successfully`,
            null,
            Loglevel.DEBUG,
          );
          await this.restaurantTempRepository.delete(tempRestaurant.bhyveId);
          this.logger.writeLog(
            'Sync Temp Restaurant to Restaurant',
            `Deleted temp restaurant with bhyveId: ${tempRestaurant.bhyveId} from TempRestaurant table successfully`,
            null,
            Loglevel.DEBUG,
          );
          updatedResto365Restaurants.push(updateResto365RestaurantDto);
        }

        this.logger.writeLog(
          'Sync Temp Restaurant to Restaurant',
          `Failed to sync restaurant with bhyveId: ${tempRestaurant.bhyveId}`,
          null,
          Loglevel.ERROR,
        );
      }

      return updatedResto365Restaurants;
    } catch (error) {
      this.logger.writeLog(
        'Sync Temp Restaurant to Restaurant',
        error.message,
        null,
        Loglevel.ERROR,
      );
      throw error;
    }
  }
}
