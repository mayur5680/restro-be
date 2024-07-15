import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddJobTable1715067910178 implements MigrationInterface {
  name = 'AddJobTable1715067910178';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`Job\` ( \`id\` int NOT NULL AUTO_INCREMENT, \`jobId\` int NOT NULL, \`restaurantId\` int NOT NULL, \`channelId\` int NOT NULL, \`status\` enum ('CREATED', 'FAILED', 'INPROGRESS', 'COMPLETED') NOT NULL DEFAULT 'CREATED', \`request\` varchar(255) NOT NULL, \`jobType\` enum ('ORDER', 'MENU') NOT NULL,\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`createdBy\` int NOT NULL, \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updatedBy\` int NULL, INDEX \`jobId\` (\`jobId\`), INDEX \`restaurantId\` (\`restaurantId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Job\` ADD CONSTRAINT \`FK_26ad1014bb9e5b7d61528f0902e\` FOREIGN KEY (\`restaurantId\`) REFERENCES \`Restaurant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`Job\` DROP FOREIGN KEY \`FK_26ad1014bb9e5b7d61528f0902e\``,
    );
    await queryRunner.query(`DROP INDEX \`restaurantId\` ON \`Job\``);
    await queryRunner.query(`DROP INDEX \`jobId\` ON \`Job\``);
    await queryRunner.query(`DROP TABLE \`Job\``);
  }
}
