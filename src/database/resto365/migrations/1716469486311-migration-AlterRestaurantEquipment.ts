import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterRestaurantEquipment1716469486311
  implements MigrationInterface
{
  name = 'AlterRestaurantEquipment1716469486311';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Step 1: Update existing NULL values to 0
    await queryRunner.query(
      `UPDATE \`Restaurant\` SET \`isInAppDeliveryEnabled\` = 0 WHERE \`isInAppDeliveryEnabled\` IS NULL`,
    );

    // Step 2: Alter the column to NOT NULL with default value 0
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` CHANGE \`isInAppDeliveryEnabled\` \`isInAppDeliveryEnabled\` tinyint NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`RestaurantEquipment\` CHANGE \`category\` \`category\` enum ('Electric', 'Natural Gas', 'Plumbing/Tapware', 'Refrigeration', 'Contact') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`RestaurantEquipment\` CHANGE \`serviceContact\` \`serviceContact\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`RestaurantEquipment\` CHANGE \`serviceContactNumber\` \`serviceContactNumber\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`RestaurantEquipment\` CHANGE \`serviceContactEmail\` \`serviceContactEmail\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`RestaurantEquipment\` CHANGE \`alternateServiceContactNumber\` \`alternateServiceContactNumber\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`RestaurantEquipment\` CHANGE \`purchaseContact\` \`purchaseContact\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`RestaurantEquipment\` CHANGE \`purchaseContactNumber\` \`purchaseContactNumber\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`RestaurantEquipment\` CHANGE \`purchaseContactEmail\` \`purchaseContactEmail\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_1fffe299991858bba0cd60331c\` ON \`RestaurantEquipment\` (\`id\`, \`category\`, \`equipment\`, \`brand\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_1fffe299991858bba0cd60331c\` ON \`RestaurantEquipment\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`RestaurantEquipment\` CHANGE \`purchaseContactEmail\` \`purchaseContactEmail\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`RestaurantEquipment\` CHANGE \`purchaseContactNumber\` \`purchaseContactNumber\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`RestaurantEquipment\` CHANGE \`purchaseContact\` \`purchaseContact\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`RestaurantEquipment\` CHANGE \`alternateServiceContactNumber\` \`alternateServiceContactNumber\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`RestaurantEquipment\` CHANGE \`serviceContactEmail\` \`serviceContactEmail\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`RestaurantEquipment\` CHANGE \`serviceContactNumber\` \`serviceContactNumber\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`RestaurantEquipment\` CHANGE \`serviceContact\` \`serviceContact\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`RestaurantEquipment\` CHANGE \`category\` \`category\` enum ('Electric', 'Natural Gas', 'Plumping/Tapware', 'Refrigeration', 'Contact') NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_1fffe299991858bba0cd60331c\` ON \`RestaurantEquipment\` (\`id\`, \`category\`, \`equipment\`, \`brand\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` CHANGE \`isInAppDeliveryEnabled\` \`isInAppDeliveryEnabled\` tinyint DEFAULT '0'`,
    );
  }
}
