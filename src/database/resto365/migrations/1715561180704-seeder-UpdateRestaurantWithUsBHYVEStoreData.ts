import { MigrationInterface, Repository } from 'typeorm';
import r365Datasource from '../datasource';
import { Resto365Restaurant } from '@modules/resto365-restaurant/entities/resto365-restaurant.entity';
import usStoreData from '../migrations-data/usStores.json';
import { GygLog } from 'src/shared';
import { Loglevel } from 'src/context';

export class UpdateRestaurantsFromJson1715561180704
  implements MigrationInterface
{
  name = 'UpdateRestaurantsFromJson1715561180704';
  repo: Repository<Resto365Restaurant>;
  logger: GygLog;

  constructor() {
    this.repo = r365Datasource.getRepository(Resto365Restaurant);
    this.logger = new GygLog(UpdateRestaurantsFromJson1715561180704.name);
  }

  public async up(): Promise<void> {
    try {
      const restaurantsToUpdate = await Promise.all(
        usStoreData.map(async (storeData) => {
          const existingRestaurant = await this.repo.findOne({
            where: { bhyveId: storeData.id.toString() },
          });
          if (existingRestaurant) {
            Object.assign(existingRestaurant, {
              // Update existing restaurant data
              posStoreId: storeData.posStoreId,
              oldStoreId: storeData.oldStoreId,
              description: storeData.description,
              timeZone: storeData.timeZone,
              address1: storeData.address1,
              address2: storeData.address2,
              city: storeData.city,
              state: storeData.state,
              postCode: storeData.postCode,
              postalCode: storeData.postCode,
              country: storeData.country,
              phoneNumber: storeData.phone,
              longitude: String(storeData.longitude),
              latitude: String(storeData.latitude),
              orderLink: storeData.orderLink,
              restaurantName: storeData.name,
              cateringLink: storeData.cateringLink,
              restaurantEmail: storeData.email,
              storeAlertEmail: storeData.storeAlertEmail,
              displayOrder: storeData.displayOrder,
              isActive: storeData.isActive,
              isTest: storeData.isTest,
              inActiveReason: storeData.inActiveReason,
              isFoodCourt: storeData.isFoodCourt,
              breakfast: storeData.hasBreakfast,
              coffee: storeData.hasCoffee,
              maxOrderValue: storeData.maxOrderValue,
              minOrderValue: storeData.minOrderValue,
              orderAlertValueThreshold: storeData.orderAlertValueThreshold,
              syncLoyaltyDollars: storeData.syncLoyaltyDollars,
              syncLoyaltyPoints: storeData.syncLoyaltyPoints,
              googlePlaceId: storeData.googlePlaceId,
              createdAt: new Date(storeData.createdAt),
              createdBy: storeData.createdBy,
              updatedAt: new Date(storeData.updatedAt),
              updatedBy: storeData.updatedBy,
              gst: storeData.gst,
              isGstIncluded: storeData.isGstIncluded,
              taxOfficeCode: storeData.taxOfficeCode,
              brandSiteRestaurantLink: storeData.brandSiteRestaurantLink,
              fax: storeData.fax,
              orderingId: storeData.orderingId,
              orderingName: storeData.orderingName,
              campaignMonitorCode: storeData.campaignMonitorCode,
              primaryMarketingArea: storeData.primaryMarketingArea,
              trafficVolume: storeData.trafficVolume,
              additionalDetails: storeData.additionalDetails,
              storeGroup: storeData.storeGroup,
              longDescription: storeData.longDescription,
              formattedStoreName: storeData.formattedStoreName,
              disableStoreOrder: storeData.disableStoreOrder,
              isPermanentlyClosed: storeData.isPermanentlyClosed,
            });
            return existingRestaurant;
          }

          this.logger.writeLog(
            'up',
            `Restaurant with bhyveId: ${storeData.id} not found. Skipping update.`,
            Loglevel.INFO,
          );
          return null;
        }),
      );

      const restaurantsToUpdateFiltered = restaurantsToUpdate.filter(
        (restaurant) => restaurant !== null,
      );
      await this.repo.save(restaurantsToUpdateFiltered);
    } catch (error) {
      this.logger.writeLog(
        'up',
        `Error updating restaurants from JSON: ${error}`,
        Loglevel.ERROR,
      );
      throw error;
    }
  }

  public async down(): Promise<void> {
    try {
      const restaurantIds = usStoreData.map((storeData) =>
        storeData.id.toString(),
      );
      await this.repo.delete(restaurantIds);
    } catch (error) {
      this.logger.writeLog(
        'down',
        `Error reverting restaurant updates from JSON: ${error}`,
        Loglevel.ERROR,
      );
      throw error;
    }
  }
}
