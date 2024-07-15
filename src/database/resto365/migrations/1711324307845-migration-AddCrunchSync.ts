import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1711324307845 implements MigrationInterface {
  name = 'Migration1711324307845';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE IF NOT EXISTS `CrunchSync` (`name` VARCHAR(255) NOT NULL ,`syncDate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE,PRIMARY KEY (`name`));',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS `CrunchSync`;');
  }
}
