import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEquipmentCategory1718618671221 implements MigrationInterface {
  name = 'AddEquipmentCategory1718618671221';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`RestaurantEquipmentCategory\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1,\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`createdBy\` int NOT NULL, \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updatedBy\` int NULL, \`version\` int NOT NULL, \`deletedAt\` datetime(6) NULL, \`deletedBy\` int NULL,UNIQUE INDEX \`IDX_babab1dee62ef826d3f2ce9896\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`RestaurantEquipmentCategory\``);
  }
}
