import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterJob1715855305602 implements MigrationInterface {
  name = 'AlterJob1715855305602';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`Job\` ADD \`description\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`Job\` DROP COLUMN \`description\``);
  }
}
