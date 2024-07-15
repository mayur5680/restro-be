import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEquipmentSupplierTable1716864828920
  implements MigrationInterface
{
  name = 'AddEquipmentSupplierTable1716864828920';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`RestaurantEquipment\` CHANGE \`supplier\` \`supplierId\` enum ('JL Lennard', 'Stoddart', 'Safco', 'Williams', 'Skope', 'Meiko', 'Phoeniks', 'ABC', 'Marmon') NOT NULL`,
    );
    await queryRunner.query(
      `CREATE TABLE \`RestaurantEquipmentSupplier\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`createdBy\` int NOT NULL, \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updatedBy\` int NULL, \`version\` int NOT NULL, \`deletedAt\` datetime(6) NULL, \`deletedBy\` int NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_1fffe299991858bba0cd60331c\` ON \`RestaurantEquipment\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`RestaurantEquipment\` CHANGE \`category\` \`category\` enum ('Electric', 'Natural Gas', 'Plumbing/Tapware', 'Refrigeration') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`RestaurantEquipment\` DROP COLUMN \`supplierId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`RestaurantEquipment\` ADD \`supplierId\` int NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_1fffe299991858bba0cd60331c\` ON \`RestaurantEquipment\` (\`id\`, \`category\`, \`equipment\`, \`brand\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`RestaurantEquipment\` ADD CONSTRAINT \`FK_ee7f36bc2b2a8951fa24faa1d13\` FOREIGN KEY (\`supplierId\`) REFERENCES \`RestaurantEquipmentSupplier\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`RestaurantEquipment\` DROP FOREIGN KEY \`FK_ee7f36bc2b2a8951fa24faa1d13\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_1fffe299991858bba0cd60331c\` ON \`RestaurantEquipment\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`RestaurantEquipment\` DROP COLUMN \`supplierId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`RestaurantEquipment\` ADD \`supplierId\` enum ('JL Lennard', 'Stoddart', 'Safco', 'Williams', 'Skope', 'Meiko', 'Phoeniks', 'ABC', 'Marmon') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`RestaurantEquipment\` CHANGE \`category\` \`category\` enum ('Electric', 'Natural Gas', 'Plumbing/Tapware', 'Refrigeration', 'Contact') NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_1fffe299991858bba0cd60331c\` ON \`RestaurantEquipment\` (\`id\`, \`category\`, \`equipment\`, \`brand\`)`,
    );
    await queryRunner.query(`DROP TABLE \`RestaurantEquipmentSupplier\``);
    await queryRunner.query(
      `ALTER TABLE \`RestaurantEquipment\` CHANGE \`supplierId\` \`supplier\` enum ('JL Lennard', 'Stoddart', 'Safco', 'Williams', 'Skope', 'Meiko', 'Phoeniks', 'ABC', 'Marmon') NOT NULL`,
    );
  }
}
