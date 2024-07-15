import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsInAppDeliveryEnabled1716420840706
  implements MigrationInterface
{
  name = 'AddIsInAppDeliveryEnabled1716420840706';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`isInAppDeliveryEnabled\` tinyint NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP COLUMN \`isInAppDeliveryEnabled\``,
    );
  }
}
