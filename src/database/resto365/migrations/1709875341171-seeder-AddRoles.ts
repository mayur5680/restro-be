import { MigrationInterface, Repository } from 'typeorm';
import r365Datasource from '../datasource';
import { Resto365Role } from '@modules/resto365-role/entities/resto365-role.entity';
export class AddRole1709875341171 implements MigrationInterface {
  name = 'AddRole1709875341171';
  repo: Repository<Resto365Role>;
  constructor() {
    this.repo = r365Datasource.getRepository(Resto365Role);
  }
  public async up(): Promise<void> {
    const roles = [
      'Administrator',
      'Customer Service Administrator',
      'Marketing Administrator',
      'Relationship Manager - World Square',
      'Center of Excellence Administrator',
      'Supply Chain Administrator',
      'Supply Chain Lead',
      'Administrative Assistant - Center of Excellence',
      'Administrative Assistant - Marketing',
      'Administrative Assistant - Center of Excellence',
      'Administrative Assistant - Marketing',
      'Supply Chain Lead',
    ];

    for (const [index, role] of roles.entries()) {
      await this.repo.save({
        id: index + 1,
        name: role,
        createdBy: 1,
      });
    }
  }

  public async down(): Promise<void> {}
}
