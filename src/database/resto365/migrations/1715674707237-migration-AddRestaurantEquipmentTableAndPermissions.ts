import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRestaurantEquipmentTableAndPermissions1715674707237
  implements MigrationInterface
{
  name = 'AddRestaurantEquipmentTableAndPermissions1715674707237';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`RestaurantEquipment\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`createdBy\` int NOT NULL, \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updatedBy\` int NULL, \`version\` int NOT NULL, \`deletedAt\` datetime(6) NULL, \`deletedBy\` int NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`category\` enum ('Electric', 'Natural Gas', 'Plimping/Tapware', 'Refrigeration', 'Contact') NOT NULL, \`equipment\` varchar(255) NOT NULL, \`supplier\` enum ('JL Lennard', 'Stoddart', 'Safco', 'Williams', 'Skope', 'Meiko', 'Phoeniks', 'ABC', 'Marmon') NOT NULL, \`brand\` enum ('Henny Penny', 'Taylor', 'Woodson', 'Culinaire', 'Adande', 'Stoddart', 'Electrolux', 'Rinnai', 'Hoshizaki', 'Sirman', 'Waring', 'Rhino', 'Enware', '3 Monkeez', 'Williams', 'Skope / Reflex', 'Meiko', 'Anliker', 'Tounus', 'Bunnic', 'Prince Castle') NOT NULL, \`model\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`quantity\` int NOT NULL, \`warranty\` enum ('1 Year', '2 Years', '3 Years', '4 Years', '5 Years', '6 Years', '7 Years', '8 Years', '9 Years', '10 Years') NOT NULL, \`purchaseDate\` date NOT NULL, \`lastServiceDate\` date NOT NULL, \`nextServiceDate\` date NOT NULL, \`servicePeriod\` varchar(255) NOT NULL, \`serviceContact\` varchar(255) NOT NULL, \`serviceContactNumber\` varchar(255) NOT NULL, \`serviceContactEmail\` varchar(255) NOT NULL, \`alternateServiceContactNumber\` varchar(255) NOT NULL, \`purchaseContact\` varchar(255) NOT NULL, \`purchaseContactNumber\` varchar(255) NOT NULL, \`purchaseContactEmail\` varchar(255) NOT NULL, \`comments\` text NULL, \`restaurantId\` int NOT NULL, INDEX \`IDX_1fffe299991858bba0cd60331c\` (\`id\`, \`category\`, \`equipment\`, \`brand\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(`ALTER TABLE \`Faq\` DROP COLUMN \`category\``);
    await queryRunner.query(
      `ALTER TABLE \`Faq\` ADD \`category\` enum ('Restaurants', 'Menu', 'GuestExperience', 'Marketing', 'Operations', 'UserAccess') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`RestaurantEquipment\` ADD CONSTRAINT \`FK_b7b0c7b3cc1fd1481beed089ecf\` FOREIGN KEY (\`restaurantId\`) REFERENCES \`Restaurant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`INSERT INTO Permission (createdAt, createdBy, updatedAt, updatedBy, version, deletedAt, deletedBy, subject, action, roleId) VALUES
    ('2024-05-14 19:13:32.363917', 2, '2024-05-14 20:12:35.924423', 2, 1, NULL, NULL, 'equipment', 'read', 1),
    ('2024-05-14 19:13:32.363917', 2, '2024-05-14 20:12:35.924423', 2, 1, NULL, NULL, 'equipment', 'create', 1),
    ('2024-05-14 19:13:32.363917', 2, '2024-05-14 20:12:35.924423', 2, 1, NULL, NULL, 'equipment', 'update', 1),
    ('2024-05-14 19:13:32.363917', 2, '2024-05-14 20:12:35.924423', 2, 1, NULL, NULL, 'equipment', 'delete', 1);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`RestaurantEquipment\` DROP FOREIGN KEY \`FK_b7b0c7b3cc1fd1481beed089ecf\``,
    );
    await queryRunner.query(`ALTER TABLE \`Faq\` DROP COLUMN \`category\``);
    await queryRunner.query(
      `ALTER TABLE \`Faq\` ADD \`category\` text NOT NULL`,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_1fffe299991858bba0cd60331c\` ON \`RestaurantEquipment\``,
    );
    await queryRunner.query(`DROP TABLE \`RestaurantEquipment\``);
    await queryRunner.query(
      `DELETE FROM Permission WHERE subject = 'equipment'`,
    );
  }
}
