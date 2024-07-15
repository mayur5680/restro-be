import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1714611292479 implements MigrationInterface {
  name = 'MigrationAddFaqTable1714611292479';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`Faq\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`createdBy\` int NOT NULL, \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updatedBy\` int NULL, \`version\` int NOT NULL, \`deletedAt\` datetime(6) NULL, \`deletedBy\` int NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`category\` text NOT NULL, \`documentUrl\` text NOT NULL, UNIQUE INDEX \`IDX_e06838a907477b7640b963474b\` (\`title\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Faq\` ADD CONSTRAINT \`FK_7213d121a7c00303d509b6ad83d\` FOREIGN KEY (\`createdBy\`) REFERENCES \`User\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`Faq\` DROP FOREIGN KEY \`FK_7213d121a7c00303d509b6ad83d\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_e06838a907477b7640b963474b\` ON \`Faq\``,
    );
    await queryRunner.query(`DROP TABLE \`Faq\``);
  }
}
