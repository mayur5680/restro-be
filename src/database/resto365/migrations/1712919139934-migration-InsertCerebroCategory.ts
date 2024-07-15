import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1712919139934 implements MigrationInterface {
  name = 'Migration1712919139934';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO CerebroCategory (name, createdBy, version) VALUES ('Alcohol', '1', '1'),
      ('Default Ingredients', '1', '1'),
      ('Dessert', '1', '1'),
      ('Drinks', '1', '1'),
      ('Food', '1', '1'),
      ('Fresh produce', '1', '1'),
      ('Hot Drinks', '1', '1'),
      ('Packaging', '1', '1'),
      ('Protein', '1', '1')`,
    );
  }

  public async down(): Promise<void> {}
}
