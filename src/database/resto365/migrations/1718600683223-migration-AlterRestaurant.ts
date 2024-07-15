import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterRestaurant1718600683223 implements MigrationInterface {
  name = 'AlterRestaurant1718600683223';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`gasType\` enum ('LPG', 'NATURAL') NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP COLUMN \`gasType\``,
    );
  }
}
