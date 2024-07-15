import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterRestarant1718703516215 implements MigrationInterface {
  name = 'AlterRestarant1718703516215';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`seatingCapacity\` int NOT NULL DEFAULT '0'`,
    );

    await queryRunner.query(`UPDATE Restaurant set gasType = 'NATURAL'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP COLUMN \`seatingCapacity\``,
    );

    await queryRunner.query(`UPDATE Restaurant set gasType = null`);
  }
}
