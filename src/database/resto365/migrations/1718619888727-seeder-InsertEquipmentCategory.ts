import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertEquipmentCategory1718619888727
  implements MigrationInterface
{
  name = 'InsertEquipmentCategory1718619888727';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO RestaurantEquipmentCategory (name, createdBy, version) VALUES ('Electric', '1', '1'),
      ('Gas', '1', '1'),
      ('Plumbing/Tapware', '1', '1'),
      ('Refrigeration', '1', '1') `,
    );
  }

  public async down(): Promise<void> {}
}
