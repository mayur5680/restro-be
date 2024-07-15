import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEquipmentSupplierContactTable1716888343851
  implements MigrationInterface
{
  name = 'AddEquipmentSupplierContactTable1716888343851';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`RestaurantEquipmentSupplierContact\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`createdBy\` int NOT NULL, \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updatedBy\` int NULL, \`version\` int NOT NULL, \`deletedAt\` datetime(6) NULL, \`deletedBy\` int NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`contactType\` enum ('Service Contact', 'Purchase Contact') NOT NULL, \`contactNumber\` varchar(20) NOT NULL, \`contactEmail\` varchar(255) NOT NULL, \`alternateContactNumber\` varchar(20) NULL, \`supplierId\` int NOT NULL, INDEX \`idx_restaurant_equipment_supplier_contact_name\` (\`name\`), UNIQUE INDEX \`IDX_fb3b0bfa418aa18f55cf9798c6\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`RestaurantEquipment\` DROP COLUMN \`serviceContact\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`RestaurantEquipment\` DROP COLUMN \`serviceContactNumber\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`RestaurantEquipment\` DROP COLUMN \`serviceContactEmail\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`RestaurantEquipment\` DROP COLUMN \`alternateServiceContactNumber\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`RestaurantEquipment\` DROP COLUMN \`purchaseContact\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`RestaurantEquipment\` DROP COLUMN \`purchaseContactNumber\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`RestaurantEquipment\` DROP COLUMN \`purchaseContactEmail\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`RestaurantEquipmentSupplierContact\` ADD CONSTRAINT \`FK_16d74abaf38f99df1eb4d1ab8df\` FOREIGN KEY (\`supplierId\`) REFERENCES \`RestaurantEquipmentSupplier\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`RestaurantEquipmentSupplierContact\` DROP FOREIGN KEY \`FK_16d74abaf38f99df1eb4d1ab8df\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`RestaurantEquipment\` ADD \`purchaseContactEmail\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`RestaurantEquipment\` ADD \`purchaseContactNumber\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`RestaurantEquipment\` ADD \`purchaseContact\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`RestaurantEquipment\` ADD \`alternateServiceContactNumber\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`RestaurantEquipment\` ADD \`serviceContactEmail\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`RestaurantEquipment\` ADD \`serviceContactNumber\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`RestaurantEquipment\` ADD \`serviceContact\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_fb3b0bfa418aa18f55cf9798c6\` ON \`RestaurantEquipmentSupplierContact\``,
    );
    await queryRunner.query(
      `DROP INDEX \`idx_restaurant_equipment_supplier_contact_name\` ON \`RestaurantEquipmentSupplierContact\``,
    );
    await queryRunner.query(
      `DROP TABLE \`RestaurantEquipmentSupplierContact\``,
    );
  }
}
