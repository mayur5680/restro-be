import { MigrationInterface, QueryRunner } from 'typeorm';

export class DefaultisInAppDeliveryEnabledToFalse1716433156330
  implements MigrationInterface
{
  name = 'DefaultisInAppDeliveryEnabledToFalse1716433156330';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` CHANGE \`isInAppDeliveryEnabled\` \`isInAppDeliveryEnabled\` tinyint DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` CHANGE \`isInAppDeliveryEnabled\` \`isInAppDeliveryEnabled\` tinyint NULL`,
    );
  }
}
