import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterRestaurantEquipment1718621391585
  implements MigrationInterface
{
  name = 'AlterRestaurantEquipment1718621391585';

  public async up(queryRunner: QueryRunner): Promise<void> {
    //add equipmentCategoryId column to RestaurantEquipment table
    await queryRunner.query(
      `ALTER TABLE \`RestaurantEquipment\` ADD \`equipmentCategoryId\` int NULL`,
    );

    //add foreign key to equipmentCategoryId column
    await queryRunner.query(
      `ALTER TABLE \`RestaurantEquipment\` ADD CONSTRAINT \`FK_c0e3c9686fc27e97bd3927c8e85\` FOREIGN KEY (\`equipmentCategoryId\`) REFERENCES \`RestaurantEquipmentCategory\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    //update equipmentCategoryId column
    await queryRunner.query(
      `update RestaurantEquipment set equipmentCategoryId = 1 where category='Electric';`,
    );
    await queryRunner.query(
      `update RestaurantEquipment set equipmentCategoryId = 2 where category='Natural Gas';`,
    );
    await queryRunner.query(
      `update RestaurantEquipment set equipmentCategoryId = 3 where category='Plumbing/Tapware';`,
    );
    await queryRunner.query(
      `update RestaurantEquipment set equipmentCategoryId = 4 where category='Refrigeration';`,
    );

    //drop index and column
    await queryRunner.query(
      `DROP INDEX \`IDX_1fffe299991858bba0cd60331c\` ON \`RestaurantEquipment\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`RestaurantEquipment\` DROP COLUMN \`category\``,
    );

    await queryRunner.query(
      `CREATE INDEX \`IDX_d97ca26baf1574ee8d4943a007\` ON \`RestaurantEquipment\` (\`id\`, \`equipmentCategoryId\`, \`equipment\`, \`brand\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_d97ca26baf1574ee8d4943a007\` ON \`RestaurantEquipment\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`RestaurantEquipment\` ADD \`category\` enum ('Electric', 'Natural Gas', 'Plumbing/Tapware', 'Refrigeration') NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_1fffe299991858bba0cd60331c\` ON \`RestaurantEquipment\` (\`id\`, \`category\`, \`equipment\`, \`brand\`)`,
    );

    await queryRunner.query(
      `update RestaurantEquipment set equipmentCategoryId = null;`,
    );

    await queryRunner.query(
      `ALTER TABLE \`RestaurantEquipment\` DROP FOREIGN KEY \`FK_c0e3c9686fc27e97bd3927c8e85\``,
    );

    await queryRunner.query(
      `ALTER TABLE \`RestaurantEquipment\` DROP COLUMN \`equipmentCategoryId\``,
    );
  }
}
