import { MigrationInterface, Repository } from 'typeorm';
import r365Datasource from '../datasource';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';
export class AddUsers1709875341174 implements MigrationInterface {
  name = 'AddUsers1709875341174';
  repo: Repository<Resto365User>;
  constructor() {
    this.repo = r365Datasource.getRepository(Resto365User);
  }
  public async up(): Promise<void> {
    await this.repo.save({
      name: 'AU',
      oktaId: '00ufycugd44PzID7e4x7',
      email: 'haritha.wickremasinghe@gyg.com.au',
      roleId: 1,
      createdBy: 1,
      department: 'Digital IT',
    });
  }

  public async down(): Promise<void> {}
}
