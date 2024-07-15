import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1711324307842 implements MigrationInterface {
  name = 'Migration1711324307842';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`CerebroProductCompany\` (\`id\` int NOT NULL AUTO_INCREMENT, \`productId\` int NOT NULL, \`productName\` varchar(255) NOT NULL, \`categoryPK\` int NOT NULL, \`restoProductName\` varchar(255) NULL, \`restoProductGroup\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL, \`updatedAt\` datetime(6) NOT NULL, UNIQUE INDEX \`IDX_46e8162910a3001e47808b63eb\` (\`productId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`CerebroProduct\` (\`id\` int NOT NULL, \`productId\` int NOT NULL, \`posPLU\` int NOT NULL, \`posProductName\` varchar(255) NOT NULL, \`recipePK\` int NOT NULL, \`recipeName\` varchar(255) NOT NULL, \`ingredientName\` varchar(255) NOT NULL, \`componentSequnce\` int NOT NULL, \`recipeComponentPK\` int NOT NULL, \`recipeQty\` int NOT NULL, \`componentProductId\` int NOT NULL, \`portion\` varchar(255) NOT NULL, \`portionPK\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL, \`updatedAt\` datetime(6) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`createdAt\` datetime(6) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`createdBy\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`updatedBy\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`version\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`deletedAt\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`deletedBy\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`driveThru\` tinyint NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`pickUp\` tinyint NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` CHANGE \`displayOrder\` \`displayOrder\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` CHANGE \`isActive\` \`isActive\` tinyint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` CHANGE \`isTest\` \`isTest\` tinyint NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` CHANGE \`isFoodCourt\` \`isFoodCourt\` tinyint NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` CHANGE \`isFoodCourt\` \`isFoodCourt\` tinyint NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` CHANGE \`isTest\` \`isTest\` tinyint NULL COMMENT 'define if test store or real store' DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` CHANGE \`isActive\` \`isActive\` tinyint NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` CHANGE \`displayOrder\` \`displayOrder\` int NOT NULL DEFAULT '1'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP COLUMN \`pickUp\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP COLUMN \`driveThru\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP COLUMN \`deletedBy\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP COLUMN \`deletedAt\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP COLUMN \`version\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP COLUMN \`updatedBy\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP COLUMN \`updatedAt\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP COLUMN \`createdBy\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP COLUMN \`createdAt\``,
    );
    await queryRunner.query(`DROP TABLE \`CerebroProduct\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_46e8162910a3001e47808b63eb\` ON \`CerebroProductCompany\``,
    );
    await queryRunner.query(`DROP TABLE \`CerebroProductCompany\``);
  }
}
