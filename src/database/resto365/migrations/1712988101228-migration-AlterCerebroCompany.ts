import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterCerebroCompany1712988101228 implements MigrationInterface {
  name = 'AlterCerebroCompany1712988101228';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`CerebroProductCompany\` DROP COLUMN \`restoProductGroup\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProductCompany\` DROP COLUMN \`restoProductName\``,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`CerebroProductCompany\` ADD \`restoProductName\` varchar(45) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProductCompany\` ADD \`restoProductGroup\` varchar(45) NULL`,
    );
  }
}
