import { MigrationInterface, QueryRunner } from 'typeorm';

export class MissingColumnsAddedIntoJobTable1715586737920
  implements MigrationInterface
{
  name = 'MissingColumnsAddedIntoJobTable1715586737920';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_4a257d2c9837248d70640b3e37\` ON \`User\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_bb9c41f809d03804d71eb7b1b5\` ON \`User\``,
    );
    await queryRunner.query(`ALTER TABLE \`Job\` ADD \`version\` int NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE \`Job\` ADD \`deletedAt\` datetime(6) NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`Job\` ADD \`deletedBy\` int NULL`);
    await queryRunner.query(
      `ALTER TABLE \`RestaurantLicence\` DROP COLUMN \`renewalNoticePeriodInDays\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`RestaurantLicence\` ADD \`renewalNoticePeriodInDays\` int NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`RestaurantLicence\` DROP COLUMN \`renewalNoticePeriodInDays\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`RestaurantLicence\` ADD \`renewalNoticePeriodInDays\` varchar(64) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`Job\` DROP COLUMN \`deletedBy\``);
    await queryRunner.query(`ALTER TABLE \`Job\` DROP COLUMN \`deletedAt\``);
    await queryRunner.query(`ALTER TABLE \`Job\` DROP COLUMN \`version\``);
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_bb9c41f809d03804d71eb7b1b5\` ON \`User\` (\`oktaId\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_4a257d2c9837248d70640b3e37\` ON \`User\` (\`email\`)`,
    );
  }
}
