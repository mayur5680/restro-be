import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCerebroProductCompanyOverride1716367671421
  implements MigrationInterface
{
  name = 'AddCerebroProductCompanyOverride1716367671421';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`CerebroProductCompanyOverride\` (\`id\` int NOT NULL AUTO_INCREMENT, \`restaurantId\` int NULL, \`cerebroProductCompanyId\` int NULL, \`status\` enum ('DISABLE', 'PERMANENT_DISABLE') NOT NULL DEFAULT 'DISABLE',\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`createdBy\` int NOT NULL, \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updatedBy\` int NULL, \`version\` int NOT NULL, \`deletedAt\` datetime(6) NULL, \`deletedBy\` int NULL, UNIQUE INDEX \`idx_restaurantId_productId\` (\`restaurantId\`, \`cerebroProductCompanyId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProductCompanyOverride\` ADD CONSTRAINT \`FK_20de2ebfab0fea13331c1ea1341\` FOREIGN KEY (\`restaurantId\`) REFERENCES \`Restaurant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProductCompanyOverride\` ADD CONSTRAINT \`FK_c3becd3a7ae8151632891d7f0c0\` FOREIGN KEY (\`cerebroProductCompanyId\`) REFERENCES \`CerebroProductCompany\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`CerebroProductCompanyOverride\` DROP FOREIGN KEY \`FK_c3becd3a7ae8151632891d7f0c0\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProductCompanyOverride\` DROP FOREIGN KEY \`FK_20de2ebfab0fea13331c1ea1341\``,
    );
    await queryRunner.query(
      `DROP INDEX \`idx_restaurantId_productId\` ON \`CerebroProductCompanyOverride\``,
    );
    await queryRunner.query(`DROP TABLE \`CerebroProductCompanyOverride\``);
  }
}
