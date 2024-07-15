import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIndexAndUniqueAttributeForEquipmentSupplier1716866729332
  implements MigrationInterface
{
  name = 'AddIndexAndUniqueAttributeForEquipmentSupplier1716866729332';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`RestaurantEquipmentSupplier\` ADD UNIQUE INDEX \`IDX_548731bf3bed5389f1f1fd79eb\` (\`name\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`idx_restaurant_equipment_supplier_name\` ON \`RestaurantEquipmentSupplier\` (\`name\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`idx_restaurant_equipment_supplier_name\` ON \`RestaurantEquipmentSupplier\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`RestaurantEquipmentSupplier\` DROP INDEX \`IDX_548731bf3bed5389f1f1fd79eb\``,
    );
  }
}
