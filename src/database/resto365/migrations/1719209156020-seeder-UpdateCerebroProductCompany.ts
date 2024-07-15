import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateCerebroProductCompany1719209156020
  implements MigrationInterface
{
  name = 'UpdateCerebroProductCompany1719209156020';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE CerebroProductCompany SET categoryId = 5 WHERE productNameNumber in ('P-10078','P-10023');`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE CerebroProductCompany SET categoryId = 5 WHERE productNameNumber in ('P-10078','P-10023');`,
    );
  }
}
