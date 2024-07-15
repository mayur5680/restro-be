import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterRestaurantEquipmentTable1717052399551
  implements MigrationInterface
{
  name = 'AlterRestaurantEquipmentTable1717052399551';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_1fffe299991858bba0cd60331c\` ON \`RestaurantEquipment\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`RestaurantEquipment\` CHANGE \`brand\` \`brand\` enum ('Henny Penny', 'Taylor', 'Woodson', 'Culinaire', 'Adande', 'Stoddart', 'Electrolux', 'Rinnai', 'Hoshizaki', 'Sirman', 'Waring', 'Rhino', 'Enware', '3 Monkeez', 'Williams', 'Skope / Reflex', 'Meiko', 'Anliker', 'Tounus', 'Bunnic', 'Prince Castle', 'SPM', 'Franke') NOT NULL`,
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
      `ALTER TABLE \`RestaurantEquipment\` CHANGE \`brand\` \`brand\` enum ('Henny Penny', 'Taylor', 'Woodson', 'Culinaire', 'Adande', 'Stoddart', 'Electrolux', 'Rinnai', 'Hoshizaki', 'Sirman', 'Waring', 'Rhino', 'Enware', '3 Monkeez', 'Williams', 'Skope / Reflex', 'Meiko', 'Anliker', 'Tounus', 'Bunnic', 'Prince Castle', 'SPM') NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_1fffe299991858bba0cd60331c\` ON \`RestaurantEquipment\` (\`id\`, \`category\`, \`equipment\`, \`brand\`)`,
    );
  }
}
