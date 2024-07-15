import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateCountryCasing1715855305603 implements MigrationInterface {
  name = 'UpdateCountryCasing1715855305603';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`UPDATE Country SET name = 'au' WHERE name = 'AU'`);
    await queryRunner.query(`UPDATE Country SET name = 'us' WHERE name = 'US'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`UPDATE Country SET name = 'AU' WHERE name = 'au'`);
    await queryRunner.query(`UPDATE Country SET name = 'US' WHERE name = 'us'`);
  }
}
