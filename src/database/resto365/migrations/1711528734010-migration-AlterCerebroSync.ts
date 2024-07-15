import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterCerebroSync1711528734010 implements MigrationInterface {
  name = 'AlterCerebroSync1711528734010';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE CrunchSync RENAME TO CerebroSync`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE CerebroSync RENAME TO CrunchSync`);
  }
}
