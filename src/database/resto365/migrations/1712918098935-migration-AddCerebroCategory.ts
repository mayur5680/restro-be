import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCerebroCategory1712918098935 implements MigrationInterface {
  name = 'AddCerebroCategory1712918098935';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`CerebroCategory\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`createdBy\` int NOT NULL, \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updatedBy\` int NULL, \`version\` int NOT NULL, \`deletedAt\` datetime(6) NULL, \`deletedBy\` int NULL, UNIQUE INDEX \`IDX_8c23b437e9e6aab11521b083d4\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProductCompany\` ADD \`categoryId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProductCompany\` ADD CONSTRAINT \`FK_f65e5303f2adb4a16d900aa6132\` FOREIGN KEY (\`categoryId\`) REFERENCES \`CerebroCategory\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`CerebroProductCompany\` DROP FOREIGN KEY \`FK_f65e5303f2adb4a16d900aa6132\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProductCompany\` DROP COLUMN \`categoryId\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_8c23b437e9e6aab11521b083d4\` ON \`CerebroCategory\``,
    );
    await queryRunner.query(`DROP TABLE \`CerebroCategory\``);
  }
}
