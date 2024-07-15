import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterRestaurantTempTable1717037107110
  implements MigrationInterface
{
  name = 'AlterRestaurantTempTable1717037107110';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`Temp_Restaurant\` CHANGE \`longitude\` \`longitude\` decimal(11,8) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Temp_Restaurant\` CHANGE \`latitude\` \`latitude\` decimal(11,8) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`Temp_Restaurant\` CHANGE \`latitude\` \`latitude\` decimal(10,7) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Temp_Restaurant\` CHANGE \`longitude\` \`longitude\` decimal(10,7) NULL`,
    );
  }
}
