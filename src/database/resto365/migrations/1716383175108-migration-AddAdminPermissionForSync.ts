import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAdminPermissionForSync1716383175107
  implements MigrationInterface
{
  name = 'AddAdminPermissionForSync1716383175107';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO Permission (createdAt, createdBy, updatedAt, updatedBy, version, deletedAt, deletedBy, subject, action, roleId) VALUES
    ('2024-05-22 23:30:32.363917', 2, '2024-05-22 23:30:32.924423', 2, 1, NULL, NULL, 'only-resto-admin', 'read', 1),
    ('2024-05-22 23:30:32.363917', 2, '2024-05-22 23:30:32.924423', 2, 1, NULL, NULL, 'only-resto-admin', 'create', 1),
    ('2024-05-22 23:30:32.363917', 2, '2024-05-22 23:30:32.924423', 2, 1, NULL, NULL, 'only-resto-admin', 'update', 1),
    ('2024-05-22 23:30:32.363917', 2, '2024-05-22 23:30:32.924423', 2, 1, NULL, NULL, 'only-resto-admin', 'delete', 1);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM Permission WHERE subject = 'only-resto-admin'`,
    );
  }
}
