import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixCategorySpelling1716341431172 implements MigrationInterface {
  name = 'FixCategorySpelling1716341431172';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_e346718137dd31a51331acbd49\` ON \`Restaurant\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_1fffe299991858bba0cd60331c\` ON \`RestaurantEquipment\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`RestaurantEquipment\` CHANGE \`category\` \`category\` enum ('Electric', 'Natural Gas', 'Plumping/Tapware', 'Refrigeration', 'Contact') NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_1fffe299991858bba0cd60331c\` ON \`RestaurantEquipment\` (\`id\`, \`category\`, \`equipment\`, \`brand\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_1fffe299991858bba0cd60331c\` ON \`RestaurantEquipment\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`RestaurantEquipment\` CHANGE \`category\` \`category\` enum ('Electric', 'Natural Gas', 'Plimping/Tapware', 'Refrigeration', 'Contact') NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_1fffe299991858bba0cd60331c\` ON \`RestaurantEquipment\` (\`id\`, \`category\`, \`equipment\`, \`brand\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_e346718137dd31a51331acbd49\` ON \`Restaurant\` (\`restaurantName\`)`,
    );
  }
}
