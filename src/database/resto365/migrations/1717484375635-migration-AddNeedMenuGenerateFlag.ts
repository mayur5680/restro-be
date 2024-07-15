import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNeedMenuGenerateFlag1717484375635
  implements MigrationInterface
{
  name = 'AddNeedMenuGenerateFlag1717484375635';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`needMenuGenerate\` tinyint NOT NULL DEFAULT '1'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP COLUMN \`needMenuGenerate\``,
    );
  }
}
