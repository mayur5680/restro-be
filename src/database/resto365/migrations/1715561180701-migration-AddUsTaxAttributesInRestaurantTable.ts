import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUsTaxAttributesInRestaurantTable1715561180701
  implements MigrationInterface
{
  name = 'AddUsTaxAttributesInRestaurantTable1715561180701';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`totalTax\` decimal(4,2) NULL COMMENT 'Total Tax amount defined for the store'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`stateTax\` decimal(4,2) NULL COMMENT 'State Tax amount defined for the store'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`countyTax\` decimal(4,2) NULL COMMENT 'County Tax amount defined for the store'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`localTax\` decimal(4,2) NULL COMMENT 'Local Tax amount defined for the store'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`rta\` decimal(4,2) NULL COMMENT 'RTA amount defined for the store'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`otherApplicableTaxes\` decimal(4,2) NULL COMMENT 'Other Applicable Taxes amount defined for the store'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`taxRateSource\` varchar(350) NULL COMMENT 'Tax Rate Source'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP COLUMN \`taxRateSource\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP COLUMN \`otherApplicableTaxes\``,
    );
    await queryRunner.query(`ALTER TABLE \`Restaurant\` DROP COLUMN \`rta\``);
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP COLUMN \`localTax\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP COLUMN \`countyTax\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP COLUMN \`stateTax\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP COLUMN \`totalTax\``,
    );
  }
}
