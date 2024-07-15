import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterCerebroProductTable1711510653542
  implements MigrationInterface
{
  name = 'AlterCerebroProductTable1711510653542';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `CerebroProduct` CHANGE COLUMN `componentSequnce` `componentSequence` INT NOT NULL ;',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `CerebroProduct` CHANGE COLUMN `componentSequence` `componentSequnce` INT NULL ;',
    );
  }
}
