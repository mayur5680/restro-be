import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTimeZoneInAreaTable1717635881994 implements MigrationInterface {
  name = 'AddTimeZoneInAreaTable1717635881994';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`Area\` ADD \`timeZone\` varchar(255) NULL`,
    );

    await queryRunner.query(
      `UPDATE \`Area\` SET \`timeZone\` = 'Australia/NSW' WHERE (\`shortName\` = 'NSW')`,
    );
    await queryRunner.query(
      `UPDATE \`Area\` SET \`timeZone\` = 'Australia/Brisbane' WHERE (\`shortName\` = 'QLD')`,
    );
    await queryRunner.query(
      `UPDATE \`Area\` SET \`timeZone\` = 'Australia/Adelaide' WHERE (\`shortName\` = 'SA')`,
    );
    await queryRunner.query(
      `UPDATE \`Area\` SET \`timeZone\` = 'Australia/Tasmania' WHERE (\`shortName\` = 'TAS')`,
    );
    await queryRunner.query(
      `UPDATE \`Area\` SET \`timeZone\` = 'Australia/Melbourne' WHERE (\`shortName\` = 'VIC')`,
    );
    await queryRunner.query(
      `UPDATE \`Area\` SET \`timeZone\` = 'Australia/Perth' WHERE (\`shortName\` = 'WA')`,
    );
    await queryRunner.query(
      `UPDATE \`Area\` SET \`timeZone\` = 'Australia/ACT' WHERE (\`shortName\` = 'ACT')`,
    );
    await queryRunner.query(
      `UPDATE \`Area\` SET \`timeZone\` = 'Australia/Darwin' WHERE (\`shortName\` = 'NT')`,
    );
    await queryRunner.query(
      `UPDATE \`Area\` SET \`timeZone\` = 'America/Chicago' WHERE (\`shortName\` = 'IL')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`Area\` DROP COLUMN \`timeZone\``);
  }
}
