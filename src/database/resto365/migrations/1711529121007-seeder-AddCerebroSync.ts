import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCerebroSync1711529121007 implements MigrationInterface {
  name = 'AddCerebroSync1711529121007';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO CerebroSync (name, syncDate, version, createdBy) VALUES ('productCompany', '2000-04-11 12:20:40.559000', '1', '1'),('product',' 2000-04-11 12:20:40.559000', '1', '1');`,
    );
  }

  public async down(): Promise<void> {}
}
