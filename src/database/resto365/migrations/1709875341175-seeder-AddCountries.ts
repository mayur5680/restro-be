import { MigrationInterface, Repository } from 'typeorm';
import r365Datasource from '../datasource';
import { Resto365Country } from '@modules/resto365-country/entities/resto365-country.entity';
export class AddCountries1709875341175 implements MigrationInterface {
  name = 'AddCountries1709875341175';
  repo: Repository<Resto365Country>;
  constructor() {
    this.repo = r365Datasource.getRepository(Resto365Country);
  }
  public async up(): Promise<void> {
    await this.repo.save({
      name: 'AU',
      createdBy: 1,
    });
    await this.repo.save({
      name: 'US',
      createdBy: 1,
    });
  }

  public async down(): Promise<void> {}
}
