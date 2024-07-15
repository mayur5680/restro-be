import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFaqPermissions1715586737921 implements MigrationInterface {
  name = 'AddFaqPermissions1715586737921';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO Permission (createdAt, createdBy, updatedAt, updatedBy, version, deletedAt, deletedBy, id, subject, action, roleId) VALUES
    ('2024-05-10 07:13:32.363917', 2, '2024-05-10 04:12:35.924423', 2, 1, NULL, NULL, 91, 'faq', 'read', 1),
    ('2024-05-10 07:13:32.363917', 2, '2024-05-10 04:12:35.924423', 2, 1, NULL, NULL, 92, 'faq', 'create', 1),
    ('2024-05-10 07:13:32.363917', 2, '2024-05-10 04:12:35.924423', 2, 1, NULL, NULL, 93, 'faq', 'update', 1),
    ('2024-05-10 07:13:32.363917', 2, '2024-05-10 04:12:35.924423', 2, 1, NULL, NULL, 94, 'faq', 'delete', 1);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM Permission WHERE subject = 'faq'`);
  }
}
