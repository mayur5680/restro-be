import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnsToRestaurant1647329183189 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('Restaurant', [
      new TableColumn({
        name: 'posStoreId',
        type: 'int',
        isNullable: true,
        default: null,
      }),
      new TableColumn({
        name: 'oldStoreId',
        type: 'int',
        isNullable: true,
        default: null,
      }),
      new TableColumn({
        name: 'description',
        type: 'varchar',
        length: '250',
        isNullable: true,
        default: null,
      }),
      new TableColumn({
        name: 'timeZone',
        type: 'varchar',
        length: '150',
        isNullable: true,
        default: null,
      }),
      new TableColumn({
        name: 'city',
        type: 'varchar',
        length: '50',
        isNullable: true,
        default: null,
      }),
      new TableColumn({
        name: 'postCode',
        type: 'varchar',
        length: '10',
        isNullable: false,
      }),
      new TableColumn({
        name: 'orderLink',
        type: 'varchar',
        length: '350',
        isNullable: true,
        default: null,
      }),
      new TableColumn({
        name: 'cateringLink',
        type: 'varchar',
        length: '350',
        isNullable: true,
        default: null,
      }),
      new TableColumn({
        name: 'storeAlertEmail',
        type: 'varchar',
        length: '255',
        isNullable: true,
        default: null,
      }),
      new TableColumn({
        name: 'displayOrder',
        type: 'int',
        isNullable: false,
        default: '1',
      }),
      new TableColumn({
        name: 'isActive',
        type: 'tinyint',
        isNullable: false,
        default: '0',
      }),
      new TableColumn({
        name: 'isTest',
        type: 'tinyint',
        isNullable: true,
        default: '0',
        comment: 'define if test store or real store',
      }),
      new TableColumn({
        name: 'inActiveReason',
        type: 'varchar',
        length: '255',
        isNullable: true,
        default: null,
      }),
      new TableColumn({
        name: 'isFoodCourt',
        type: 'tinyint',
        isNullable: false,
        default: '0',
      }),
      new TableColumn({
        name: 'maxOrderValue',
        type: 'int',
        isNullable: true,
        default: null,
      }),
      new TableColumn({
        name: 'minOrderValue',
        type: 'int',
        isNullable: true,
        default: null,
      }),
      new TableColumn({
        name: 'orderAlertValueThreshold',
        type: 'int',
        isNullable: true,
        default: null,
      }),
      new TableColumn({
        name: 'syncLoyaltyDollars',
        type: 'tinyint',
        isNullable: false,
        default: '1',
      }),
      new TableColumn({
        name: 'syncLoyaltyPoints',
        type: 'tinyint',
        isNullable: false,
        default: '1',
      }),
      new TableColumn({
        name: 'googlePlaceId',
        type: 'varchar',
        length: '255',
        isNullable: true,
        comment: 'store google places Id',
      }),
      new TableColumn({
        name: 'gst',
        type: 'decimal',
        precision: 4,
        scale: 2,
        isNullable: true,
        comment: 'GST amount defined for the store',
      }),
      new TableColumn({
        name: 'isGstIncluded',
        type: 'tinyint',
        isNullable: true,
        default: null,
        comment: 'Flag to indicate if gst should be included in price or not.',
      }),
      new TableColumn({
        name: 'taxOfficeCode',
        type: 'varchar',
        length: '50',
        isNullable: true,
        default: null,
      }),
      new TableColumn({
        name: 'brandSiteRestaurantLink',
        type: 'varchar',
        length: '350',
        isNullable: true,
        default: null,
      }),
      new TableColumn({
        name: 'fax',
        type: 'varchar',
        length: '20',
        isNullable: true,
        default: null,
      }),
      new TableColumn({
        name: 'orderingId',
        type: 'varchar',
        length: '20',
        isNullable: true,
        default: null,
      }),
      new TableColumn({
        name: 'orderingName',
        type: 'varchar',
        length: '50',
        isNullable: true,
        default: null,
      }),
      new TableColumn({
        name: 'campaignMonitorCode',
        type: 'varchar',
        length: '20',
        isNullable: true,
        default: null,
      }),
      new TableColumn({
        name: 'primaryMarketingArea',
        type: 'varchar',
        length: '20',
        isNullable: true,
        default: null,
      }),
      new TableColumn({
        name: 'trafficVolume',
        type: 'int',
        isNullable: true,
        default: null,
      }),
      new TableColumn({
        name: 'additionalDetails',
        type: 'varchar',
        length: '500',
        isNullable: true,
        default: null,
      }),
      new TableColumn({
        name: 'storeGroup',
        type: 'varchar',
        length: '20',
        isNullable: true,
        default: null,
      }),
      new TableColumn({
        name: 'longDescription',
        type: 'varchar',
        length: '1000',
        isNullable: true,
        default: null,
      }),
      new TableColumn({
        name: 'formattedStoreName',
        type: 'varchar',
        length: '150',
        isNullable: true,
        default: null,
      }),
      new TableColumn({
        name: 'disableStoreOrder',
        type: 'tinyint',
        isNullable: false,
        default: '0',
      }),
      new TableColumn({
        name: 'isPermanentlyClosed',
        type: 'tinyint',
        isNullable: true,
        default: null,
      }),
      new TableColumn({
        name: 'pickupInstruction',
        type: 'varchar',
        length: '255',
        isNullable: true,
        default: null,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('Restaurant', 'posStoreId');
    await queryRunner.dropColumn('Restaurant', 'oldStoreId');
    await queryRunner.dropColumn('Restaurant', 'description');
    await queryRunner.dropColumn('Restaurant', 'timeZone');
    await queryRunner.dropColumn('Restaurant', 'city');
    await queryRunner.dropColumn('Restaurant', 'postCode');
    await queryRunner.dropColumn('Restaurant', 'orderLink');
    await queryRunner.dropColumn('Restaurant', 'cateringLink');
    await queryRunner.dropColumn('Restaurant', 'storeAlertEmail');
    await queryRunner.dropColumn('Restaurant', 'displayOrder');
    await queryRunner.dropColumn('Restaurant', 'isActive');
    await queryRunner.dropColumn('Restaurant', 'isTest');
    await queryRunner.dropColumn('Restaurant', 'inActiveReason');
    await queryRunner.dropColumn('Restaurant', 'isFoodCourt');
    await queryRunner.dropColumn('Restaurant', 'maxOrderValue');
    await queryRunner.dropColumn('Restaurant', 'minOrderValue');
    await queryRunner.dropColumn('Restaurant', 'orderAlertValueThreshold');
    await queryRunner.dropColumn('Restaurant', 'syncLoyaltyDollars');
    await queryRunner.dropColumn('Restaurant', 'syncLoyaltyPoints');
    await queryRunner.dropColumn('Restaurant', 'googlePlaceId');
    await queryRunner.dropColumn('Restaurant', 'gst');
    await queryRunner.dropColumn('Restaurant', 'isGstIncluded');
    await queryRunner.dropColumn('Restaurant', 'taxOfficeCode');
    await queryRunner.dropColumn('Restaurant', 'brandSiteRestaurantLink');
    await queryRunner.dropColumn('Restaurant', 'fax');
    await queryRunner.dropColumn('Restaurant', 'orderingId');
    await queryRunner.dropColumn('Restaurant', 'orderingName');
    await queryRunner.dropColumn('Restaurant', 'campaignMonitorCode');
    await queryRunner.dropColumn('Restaurant', 'primaryMarketingArea');
    await queryRunner.dropColumn('Restaurant', 'trafficVolume');
    await queryRunner.dropColumn('Restaurant', 'additionalDetails');
    await queryRunner.dropColumn('Restaurant', 'storeGroup');
    await queryRunner.dropColumn('Restaurant', 'longDescription');
    await queryRunner.dropColumn('Restaurant', 'formattedStoreName');
    await queryRunner.dropColumn('Restaurant', 'disableStoreOrder');
    await queryRunner.dropColumn('Restaurant', 'isPermanentlyClosed');
    await queryRunner.dropColumn('Restaurant', 'pickupInstruction');
  }
}
