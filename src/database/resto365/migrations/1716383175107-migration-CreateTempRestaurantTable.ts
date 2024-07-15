import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTempRestaurantTable1716383175107
  implements MigrationInterface
{
  name = 'CreateTempRestaurantTable1716383175107';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`Temp_Restaurant\` (\`bhyveId\` int NOT NULL AUTO_INCREMENT, \`posStoreId\` int NULL, \`oldStoreId\` int NULL, \`restaurantName\` varchar(255) NULL, \`description\` text NULL, \`timeZone\` varchar(255) NULL, \`address1\` varchar(255) NULL, \`address2\` varchar(255) NULL, \`city\` varchar(255) NULL, \`suburb\` varchar(255) NULL, \`postCode\` varchar(10) NULL, \`postalCode\` varchar(10) NULL, \`country_code\` int NULL, \`country_name\` varchar(255) NULL, \`state\` varchar(255) NULL, \`areaId\` int NULL, \`priceTier\` varchar(10) NULL, \`longitude\` decimal(10,7) NULL, \`latitude\` decimal(10,7) NULL, \`orderLink\` varchar(255) NULL, \`cateringLink\` varchar(255) NULL, \`phone\` varchar(20) NULL, \`email\` varchar(255) NULL, \`storeAlertEmail\` varchar(255) NULL, \`displayOrder\` int NULL, \`isActive\` tinyint NULL, \`isTest\` tinyint NULL, \`inActiveReason\` text NULL, \`isFoodCourt\` tinyint NULL, \`maxOrderValue\` decimal(10,2) NULL, \`minOrderValue\` decimal(10,2) NULL, \`orderAlertValueThreshold\` decimal(10,2) NULL, \`syncLoyaltyDollars\` tinyint NULL, \`syncLoyaltyPoints\` tinyint NULL, \`googlePlaceId\` varchar(255) NULL, \`createdAt\` timestamp NULL, \`createdBy\` varchar(255) NULL, \`updatedAt\` timestamp NULL, \`updatedBy\` varchar(255) NULL, \`gst\` decimal(5,2) NULL, \`isGstIncluded\` tinyint NULL, \`taxOfficeCode\` varchar(255) NULL, \`brandSiteRestaurantLink\` varchar(255) NULL, \`fax\` varchar(20) NULL, \`orderingId\` varchar(255) NULL, \`orderingName\` varchar(255) NULL, \`campaignMonitorCode\` varchar(255) NULL, \`primaryMarketingArea\` varchar(255) NULL, \`trafficVolume\` int NULL, \`additionalDetails\` text NULL, \`storeGroup\` varchar(255) NULL, \`longDescription\` text NULL, \`formattedStoreName\` varchar(255) NULL, \`disableStoreOrder\` tinyint NULL, \`isPermanentlyClosed\` tinyint NULL, \`pickupInstruction\` text NULL, \`isInAppDeliveryEnabled\` tinyint NULL, \`liquor\` tinyint NULL, \`coffee\` tinyint NULL, \`icedCoffee\` tinyint NULL, \`breakfast\` tinyint NULL, \`driveThru\` tinyint NULL, \`wheelChairAccess\` tinyint NULL, \`pickUp\` tinyint NULL, \`dineIn\` tinyint NULL, \`softServe\` tinyint NULL, \`churro\` tinyint NULL, PRIMARY KEY (\`bhyveId\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`Temp_Restaurant\``);
  }
}
