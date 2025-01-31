import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateResto365Restaurant1635162577743
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS \`Restaurant\` (
                id INT NOT NULL AUTO_INCREMENT,
                bhyveId VARCHAR(32) NULL,
                restaurantName VARCHAR(255) NULL,
                shortRestaurantName VARCHAR(255) NULL,
                fullRestaurantName TEXT NULL,
                code CHAR(15) NULL,
                newCode CHAR(15) NULL,
                acronym VARCHAR(16) NULL,
                openingDate VARCHAR(16) NULL,
                refurbishmentStartDate VARCHAR(16) NULL,
                refurbishmentEndDate VARCHAR(16) NULL,
                freeBurritos VARCHAR(16) NULL,
                closingDate VARCHAR(16) NULL,
                address1 VARCHAR(255) NULL,
                notableBuildingLocation VARCHAR(255) NULL,
                address2 VARCHAR(255) NULL,
                suburb VARCHAR(64) NULL,
                postalCode VARCHAR(16) NULL,
                state VARCHAR(16) NULL,
                country VARCHAR(255) NULL,
                ownership ENUM('Corporate', 'Franchise') NULL,
                owner1FirstName VARCHAR(255) NULL,
                owner1LastName VARCHAR(255) NULL,
                owner1Email VARCHAR(255) NULL,
                owner1Mobile VARCHAR(255) NULL,
                owner2FirstName VARCHAR(255) NULL,
                owner2LastName VARCHAR(255) NULL,
                owner2Email VARCHAR(255) NULL,
                owner2Mobile VARCHAR(255) NULL,
                previousOwnership TEXT NULL,
                previousOwner VARCHAR(255) NULL,
                legalEntity TEXT NULL,
                abn VARCHAR(32) NULL,
                areaId INT NOT NULL,
                restaurantManagerOktaId VARCHAR(32) NULL,
                restaurantManager VARCHAR(255) NULL,
                culinaryOpsCoachOktaId VARCHAR(32) NULL,
                culinaryOpsCoach VARCHAR(255) NULL,
                cAndOCoachPhoneNumber VARCHAR(255) NULL,
                stateManagerOktaId VARCHAR(32) NULL,
                stateManager VARCHAR(255) NULL,
                phoneNumber VARCHAR(16) NULL,
                extension VARCHAR(10) NULL,
                restaurantEmail VARCHAR(255) NULL,
                corporateRMEmail VARCHAR(255) NULL,
                numberOfTradingDays VARCHAR(10) NULL,
                monOpen VARCHAR(32) NULL,
                monClose VARCHAR(32) NULL,
                tueOpen VARCHAR(32) NULL,
                tueClose VARCHAR(32) NULL,
                wedOpen VARCHAR(32) NULL,
                wedClose VARCHAR(32) NULL,
                thuOpen VARCHAR(32) NULL,
                thurClose VARCHAR(32) NULL,
                friOpen VARCHAR(32) NULL,
                friClose VARCHAR(32) NULL,
                satOpen VARCHAR(32) NULL,
                satClose VARCHAR(32) NULL,
                sunOpen VARCHAR(32) NULL,
                sunClose VARCHAR(32) NULL,
                tradingHourChangeNotes TEXT NULL,
                format VARCHAR(255) NULL,
                priceTier VARCHAR(16) NULL,
                doorDash TINYINT NULL,
                menuLog TINYINT NULL,
                uberEats TINYINT NULL,
                breakfast TINYINT NULL,
                coffee TINYINT NULL,
                iceMachine TINYINT NULL,
                icedCoffee TINYINT NULL,
                liquor TINYINT NULL,
                churro TINYINT NULL,
                quesadillas TINYINT NULL,
                softServe TINYINT NULL,
                toilet TINYINT NULL,
                wheelChairAccess TINYINT NULL,
                courierInstructions TEXT NULL,
                dineIn TINYINT NULL,
                amexMid VARCHAR(255) NULL,
                tyroMid VARCHAR(255) NULL,
                subnet VARCHAR(16) NULL,
                internetPlan VARCHAR(255) NULL COMMENT 'Alpha.Net Internet Plan - 50 mbps/100 mbps',
                coatesLocationId VARCHAR(255) NULL,
                nbnLocationId VARCHAR(255) NULL,
                crunchTimeLocationId VARCHAR(32) NULL,
                longitude VARCHAR(255) NULL,
                latitude VARCHAR(255) NULL,
                posHardware VARCHAR(255) NULL,
                posQty VARCHAR(16) NULL,
                totalEftposQty VARCHAR(16) NULL,
                dtEftposQty VARCHAR(16) NULL,
                organics VARCHAR(255) NULL,
                cardboard VARCHAR(255) NULL,
                containerDepositScheme VARCHAR(255) NULL,
                coMingledRecycled VARCHAR(255) NULL,
                solar VARCHAR(255) NULL,
                evCharging VARCHAR(255) NULL,
                otherSustainabilityInitiatives VARCHAR(255) NULL,
                comments TEXT NULL,
                PRIMARY KEY (id),
                INDEX idx_bhyveId (bhyveId)
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE IF EXISTS \`Restaurant\`;
        `);
  }
}
