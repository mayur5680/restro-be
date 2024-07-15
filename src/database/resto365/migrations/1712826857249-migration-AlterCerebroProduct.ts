import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterCerebroProduct1712826857249 implements MigrationInterface {
  name = 'AlterCerebroProduct1712826857249';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`CerebroProduct\` DROP COLUMN \`productId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProduct\` DROP COLUMN \`recipePK\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProduct\` DROP COLUMN \`recipeComponentPK\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProduct\` DROP COLUMN \`componentProductId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProduct\` DROP COLUMN \`portionPK\``,
    );

    await queryRunner.query(
      `ALTER TABLE \`CerebroProductCompany\` ADD \`productNameNumber\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProductCompany\` ADD UNIQUE INDEX \`IDX_e12bf8d75efda926e1af80e93e\` (\`productNameNumber\`)`,
    );

    await queryRunner.query(
      `ALTER TABLE \`CerebroProduct\` ADD \`productMappingPk\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProduct\` ADD UNIQUE INDEX \`IDX_d1b47a2b76e4337ca3df0f17b2\` (\`productMappingPk\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProduct\` ADD \`recipePlu\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProduct\` ADD \`productCompanyNameNumber\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProduct\` ADD \`recipeCategory\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProduct\` ADD \`LAST_TOUCH_DATE\` datetime NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProduct\` DROP COLUMN \`portion\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProduct\` ADD \`portion\` varchar(100) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProduct\` ADD CONSTRAINT \`FK_52862ad12047f283485bf386e89\` FOREIGN KEY (\`productCompanyNameNumber\`) REFERENCES \`CerebroProductCompany\`(\`productNameNumber\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`CerebroProduct\` DROP FOREIGN KEY \`FK_52862ad12047f283485bf386e89\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProduct\` DROP COLUMN \`portion\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProduct\` ADD \`portion\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProduct\` DROP COLUMN \`LAST_TOUCH_DATE\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProduct\` DROP COLUMN \`recipeCategory\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProduct\` DROP COLUMN \`productCompanyNameNumber\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProduct\` DROP COLUMN \`recipePlu\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProduct\` DROP INDEX \`IDX_d1b47a2b76e4337ca3df0f17b2\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProduct\` DROP COLUMN \`productMappingPk\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProductCompany\` DROP INDEX \`IDX_e12bf8d75efda926e1af80e93e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProductCompany\` DROP COLUMN \`productNameNumber\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProduct\` ADD \`portionPK\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProduct\` ADD \`componentProductId\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProduct\` ADD \`recipeComponentPK\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProduct\` ADD \`recipePK\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProduct\` ADD \`productId\` int NOT NULL`,
    );
  }
}
