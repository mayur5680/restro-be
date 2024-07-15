import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOvernightServiceFlag1716982276455
  implements MigrationInterface
{
  name = 'AddOvernightServiceFlag1716982276455';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`overnightService\` tinyint NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP COLUMN \`overnightService\``,
    );
  }
}
