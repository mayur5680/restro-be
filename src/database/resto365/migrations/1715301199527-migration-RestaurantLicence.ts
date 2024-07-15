import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1715301199527 implements MigrationInterface {
  name = 'RestaurantLicence1715301199527';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`RestaurantLicence\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`createdBy\` int NOT NULL, \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updatedBy\` int NULL, \`version\` int NOT NULL, \`deletedAt\` datetime(6) NULL, \`deletedBy\` int NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`licenceName\` varchar(64) NOT NULL, \`licenceNumber\` varchar(64) NOT NULL, \`issueDate\` date NOT NULL, \`expiryDate\` date NOT NULL, \`renewalNoticePeriod\` varchar(64) NOT NULL, \`comments\` text NULL, \`restaurantId\` int NOT NULL, INDEX \`IDX_61753496e4df7b32f058028b3e\` (\`restaurantId\`), UNIQUE INDEX \`IDX_af98b4b6d7375131adf379a845\` (\`licenceNumber\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`RestaurantLicence\` ADD CONSTRAINT \`FK_61753496e4df7b32f058028b3ef\` FOREIGN KEY (\`restaurantId\`) REFERENCES \`Restaurant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`INSERT INTO Permission (createdAt, createdBy, updatedAt, updatedBy, id, subject, action, roleId) VALUES
    ('2024-05-10 07:13:32.363917', 2, '2024-05-10 04:12:35.924423', 2, 45, 'restaurant-licence', 'read', 1),
    ('2024-05-10 07:13:32.363917', 2, '2024-05-10 04:12:35.924423', 2, 46, 'restaurant-licence', 'create', 1),
    ('2024-05-10 07:13:32.363917', 2, '2024-05-10 04:12:35.924423', 2, 47, 'restaurant-licence', 'update', 1),
    ('2024-05-10 07:13:32.363917', 2, '2024-05-10 04:12:35.924423', 2, 48, 'restaurant-licence', 'delete', 1),
    ('2024-05-10 07:13:32.363917', 2, '2024-05-10 04:12:35.924423', 2, 49, 'restaurant-licence', 'read', 13),
    ('2024-05-10 07:13:32.363917', 2, '2024-05-10 04:12:35.924423', 2, 50, 'restaurant-licence', 'create', 13),
    ('2024-05-10 07:13:32.363917', 2, '2024-05-10 04:12:35.924423', 2, 51, 'restaurant-licence', 'update', 13),
    ('2024-05-10 07:13:32.363917', 2, '2024-05-10 04:12:35.924423', 2, 52, 'restaurant-licence', 'delete', 13),
    ('2024-05-10 07:13:32.363917', 2, '2024-05-10 04:12:35.924423', 2, 53, 'restaurant-licence', 'read', 14),
    ('2024-05-10 07:13:32.363917', 2, '2024-05-10 04:12:35.924423', 2, 54, 'restaurant-licence', 'create', 14),
    ('2024-05-10 07:13:32.363917', 2, '2024-05-10 04:12:35.924423', 2, 55, 'restaurant-licence', 'update', 14),
    ('2024-05-10 07:13:32.363917', 2, '2024-05-10 04:12:35.924423', 2, 56, 'restaurant-licence', 'delete', 14);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`RestaurantLicence\` DROP FOREIGN KEY \`FK_61753496e4df7b32f058028b3ef\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_af98b4b6d7375131adf379a845\` ON \`RestaurantLicence\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_61753496e4df7b32f058028b3e\` ON \`RestaurantLicence\``,
    );
    await queryRunner.query(`DROP TABLE \`RestaurantLicence\``);

    await queryRunner.query(
      `DELETE FROM Permission WHERE subject = 'restaurant-licence'`,
    );
  }
}
