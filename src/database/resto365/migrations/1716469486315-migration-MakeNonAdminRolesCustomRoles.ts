import { MigrationInterface, QueryRunner } from 'typeorm';

export class MakeNonAdminRolesCustomRoles1716469486315
  implements MigrationInterface
{
  name = 'MakeNonAdminRolesCustomRoles1716469486315';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE Role
      SET isCustomRole = 1
      WHERE id IN (2, 3, 4, 5, 6, 7, 8, 9, 13, 14, 16);`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE Role
      SET isCustomRole = 0
      WHERE id IN (2, 3, 4, 5, 6, 7, 8, 9, 13, 14, 16);`,
    );
  }
}
