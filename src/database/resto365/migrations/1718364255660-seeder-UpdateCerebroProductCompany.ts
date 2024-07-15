import { Resto365CerebroProductCompany } from '@modules/resto365-cerebro-product-company/entities/resto365-cerebro-product-company.entity';
import { MigrationInterface, QueryRunner, Repository } from 'typeorm';
import r365Datasource from '../datasource';

export class UpdateCerebroProductCompany1718364255660
  implements MigrationInterface
{
  name = 'UpdateCerebroProductCompany1718364255660';
  repo: Repository<Resto365CerebroProductCompany>;

  constructor() {
    this.repo = r365Datasource.getRepository(Resto365CerebroProductCompany);
  }
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE CerebroProductCompany SET categoryId = 8 WHERE productNameNumber in ('P-40019','P-40018','P-40017','P-30018','P-30017','P-30016','P-30015');`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE CerebroProductCompany SET categoryId = NULL WHERE productNameNumber in ('P-40019','P-40018','P-40017','P-30018','P-30017','P-30016','P-30015');`,
    );
  }
}
