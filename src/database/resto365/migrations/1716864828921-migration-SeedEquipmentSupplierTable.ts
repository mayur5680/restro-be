import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedEquipmentSupplierTable1716864828921
  implements MigrationInterface
{
  name = 'SeedEquipmentSupplierTable1716864828921';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO RestaurantEquipmentSupplier (createdAt, createdBy, updatedAt, updatedBy, version, deletedAt, deletedBy, name) VALUES
    ('2024-05-28 13:30:32.363917', 2, '2024-05-28 13:30:32.924423', 2, 1, NULL, NULL, 'JL Lennard'),
    ('2024-05-28 13:30:32.363917', 2, '2024-05-28 13:30:32.924423', 2, 1, NULL, NULL, 'Stoddart'),
    ('2024-05-28 13:30:32.363917', 2, '2024-05-28 13:30:32.924423', 2, 1, NULL, NULL, 'Safco'),
    ('2024-05-28 13:30:32.363917', 2, '2024-05-28 13:30:32.924423', 2, 1, NULL, NULL, 'Williams'),
    ('2024-05-28 13:30:32.363917', 2, '2024-05-28 13:30:32.924423', 2, 1, NULL, NULL, 'Skope'),
    ('2024-05-28 13:30:32.363917', 2, '2024-05-28 13:30:32.924423', 2, 1, NULL, NULL, 'Meiko'),
    ('2024-05-28 13:30:32.363917', 2, '2024-05-28 13:30:32.924423', 2, 1, NULL, NULL, 'Phoeniks'),
    ('2024-05-28 13:30:32.363917', 2, '2024-05-28 13:30:32.924423', 2, 1, NULL, NULL, 'ABC'),
    ('2024-05-28 13:30:32.363917', 2, '2024-05-28 13:30:32.924423', 2, 1, NULL, NULL, 'Marmon');`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM RestaurantEquipmentSupplier WHERE name = 'JL Lennard'`,
    );
    await queryRunner.query(
      `DELETE FROM RestaurantEquipmentSupplier WHERE name = 'Stoddart'`,
    );
    await queryRunner.query(
      `DELETE FROM RestaurantEquipmentSupplier WHERE name = 'Safco'`,
    );
    await queryRunner.query(
      `DELETE FROM RestaurantEquipmentSupplier WHERE name = 'Williams'`,
    );
    await queryRunner.query(
      `DELETE FROM RestaurantEquipmentSupplier WHERE name = 'Skope'`,
    );
    await queryRunner.query(
      `DELETE FROM RestaurantEquipmentSupplier WHERE name = 'Meiko'`,
    );
    await queryRunner.query(
      `DELETE FROM RestaurantEquipmentSupplier WHERE name = 'Phoeniks'`,
    );
    await queryRunner.query(
      `DELETE FROM RestaurantEquipmentSupplier WHERE name = 'ABC'`,
    );
    await queryRunner.query(
      `DELETE FROM RestaurantEquipmentSupplier WHERE name = 'Marmon'`,
    );
  }
}
