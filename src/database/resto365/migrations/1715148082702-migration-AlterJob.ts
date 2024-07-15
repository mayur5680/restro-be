import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterJob1715148082702 implements MigrationInterface {
  name = 'AlterJob1715148082702';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`Job\` DROP COLUMN \`jobType\``);

    await queryRunner.query(
      `ALTER TABLE \`Job\` ADD \`jobType\` enum ('ORDER', 'MENU_GENERATION', 'TASK_MENU_SYNC', 'TASK_STORE_SYNC') NOT NULL DEFAULT 'MENU_GENERATION' AFTER \`status\` `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`Job\` ADD \`jobType\` enum ('ORDER', 'MENU') NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`Job\` DROP COLUMN \`jobType\` `);
  }
}
