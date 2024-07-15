import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPermissionsTable1714954843219 implements MigrationInterface {
  name = 'AddPermissionsTable1714954843219';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`Permission\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`createdBy\` int NOT NULL, \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updatedBy\` int NULL, \`version\` int NOT NULL, \`deletedAt\` datetime(6) NULL, \`deletedBy\` int NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`subject\` varchar(255) NOT NULL, \`action\` varchar(255) NOT NULL, \`roleId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Role\` ADD UNIQUE INDEX \`IDX_b852abd9e268a63287bc815aab\` (\`name\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Permission\` ADD CONSTRAINT \`FK_01f02fb4f906d216152df403cae\` FOREIGN KEY (\`roleId\`) REFERENCES \`Role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`INSERT INTO Permission (createdAt, createdBy, updatedAt, updatedBy, version, deletedAt, deletedBy, id, subject, action, roleId) VALUES
    ('2024-04-29 07:13:32.363917', 1, '2024-04-30 04:12:35.924423', NULL, 1, NULL, NULL, 1, 'user-management', 'read', 1),
    ('2024-04-29 07:13:32.363917', 1, '2024-04-30 04:12:35.927203', NULL, 1, NULL, NULL, 2, 'user-management', 'update', 1),
    ('2024-04-29 07:13:32.363917', 1, '2024-04-30 04:12:35.927773', NULL, 1, NULL, NULL, 3, 'user-management', 'create', 1),
    ('2024-04-29 07:13:32.363917', 1, '2024-04-30 04:12:35.928332', NULL, 1, NULL, NULL, 4, 'user-management', 'delete', 1),
    ('2024-04-29 07:13:32.363917', 1, '2024-04-30 04:12:35.928719', NULL, 1, NULL, NULL, 5, 'restaurant', 'read', 1),
    ('2024-04-29 07:13:32.363917', 1, '2024-04-30 04:12:35.929066', NULL, 1, NULL, NULL, 6, 'restaurant', 'update', 1),
    ('2024-04-29 07:13:32.363917', 1, '2024-04-30 04:12:35.929388', NULL, 1, NULL, NULL, 7, 'restaurant', 'create', 1),
    ('2024-04-29 07:13:32.363917', 1, '2024-04-30 04:12:35.929734', NULL, 1, NULL, NULL, 8, 'restaurant', 'delete', 1),
    ('2024-04-29 07:13:32.363917', 1, '2024-04-30 04:12:35.930071', NULL, 1, NULL, NULL, 9, 'guest-experience', 'read', 1),
    ('2024-04-29 07:13:32.363917', 1, '2024-04-30 04:12:35.930379', NULL, 1, NULL, NULL, 10, 'guest-experience', 'update', 1),
    ('2024-04-29 07:13:32.363917', 1, '2024-04-30 04:12:35.930782', NULL, 1, NULL, NULL, 11, 'guest-experience', 'create', 1),
    ('2024-04-29 07:13:32.363917', 1, '2024-04-30 04:12:35.931127', NULL, 1, NULL, NULL, 12, 'guest-experience', 'delete', 1),
    ('2024-04-29 07:13:32.363917', 1, '2024-04-30 04:12:35.931444', NULL, 1, NULL, NULL, 13, 'marketing', 'read', 1),
    ('2024-04-29 07:13:32.363917', 1, '2024-04-30 04:12:35.931804', NULL, 1, NULL, NULL, 14, 'marketing', 'update', 1),
    ('2024-04-29 07:13:32.363917', 1, '2024-04-30 04:12:35.932215', NULL, 1, NULL, NULL, 15, 'marketing', 'create', 1),
    ('2024-04-29 07:13:32.363917', 1, '2024-04-30 04:12:35.932543', NULL, 1, NULL, NULL, 16, 'marketing', 'delete', 1),
    ('2024-04-29 07:13:32.363917', 1, '2024-04-30 04:12:35.932897', NULL, 1, NULL, NULL, 17, 'operations', 'read', 1),
    ('2024-04-29 07:13:32.363917', 1, '2024-04-30 04:12:35.933262', NULL, 1, NULL, NULL, 18, 'operations', 'update', 1),
    ('2024-04-29 07:13:32.363917', 1, '2024-04-30 04:12:35.933609', NULL, 1, NULL, NULL, 19, 'operations', 'create', 1),
    ('2024-04-29 07:13:32.363917', 1, '2024-04-30 04:12:35.934046', NULL, 1, NULL, NULL, 20, 'operations', 'delete', 1),
    ('2024-04-29 07:13:32.363917', 1, '2024-04-30 04:12:35.934741', NULL, 1, NULL, NULL, 21, 'menu', 'read', 1),
    ('2024-04-29 07:13:32.363917', 1, '2024-04-30 04:12:35.935373', NULL, 1, NULL, NULL, 22, 'menu', 'update', 1),
    ('2024-04-29 07:13:32.363917', 1, '2024-04-30 04:12:35.936004', NULL, 1, NULL, NULL, 23, 'menu', 'create', 1),
    ('2024-04-29 07:13:32.363917', 1, '2024-04-30 04:12:35.936692', NULL, 1, NULL, NULL, 24, 'menu', 'delete', 1),
    ('2024-04-29 07:13:32.363917', 1, '2024-04-30 04:17:29.185043', NULL, 1, NULL, NULL, 26, 'guest-experience', 'read', 2),
    ('2024-04-29 07:13:32.363917', 1, '2024-04-30 04:17:29.184815', NULL, 1, NULL, NULL, 27, 'guest-experience', 'update', 2),
    ('2024-04-29 07:13:32.363917', 1, '2024-04-30 04:17:29.184602', NULL, 1, NULL, NULL, 28, 'guest-experience', 'create', 2),
    ('2024-04-29 07:13:32.363917', 1, '2024-04-30 04:17:29.184316', NULL, 1, NULL, NULL, 29, 'guest-experience', 'delete', 2),
    ('2024-04-29 07:13:32.363917', 1, '2024-04-30 04:17:29.184045', NULL, 1, NULL, NULL, 30, 'restaurant', 'read', 2),
    ('2024-04-29 07:13:32.363917', 1, '2024-04-30 04:14:38.731189', NULL, 1, NULL, NULL, 31, 'marketing', 'read', 3),
    ('2024-04-29 07:13:32.363917', 1, '2024-04-30 04:14:38.730770', NULL, 1, NULL, NULL, 32, 'marketing', 'update', 3),
    ('2024-04-29 07:13:32.363917', 1, '2024-04-30 04:14:38.730114', NULL, 1, NULL, NULL, 33, 'marketing', 'create', 3),
    ('2024-04-29 07:13:32.363917', 1, '2024-04-30 04:14:38.728811', NULL, 1, NULL, NULL, 34, 'marketing', 'delete', 3),
    ('2024-04-29 07:13:32.363917', 1, '2024-04-30 04:17:29.183391', NULL, 1, NULL, NULL, 35, 'restaurant', 'read', 3),
    ('2024-04-29 07:13:32.363917', 1, '2024-04-30 04:17:58.849709', NULL, 1, NULL, NULL, 36, 'restaurant', 'read', 4),
    ('2024-04-29 07:13:32.363917', 1, '2024-04-30 04:17:29.183391', NULL, 1, NULL, NULL, 38, 'restaurant', 'read', 5),
    ('2024-04-29 07:13:32.363917', 1, '2024-04-30 04:17:29.183391', NULL, 1, NULL, NULL, 39, 'restaurant', 'read', 6),
    ('2024-04-29 07:13:32.363917', 1, '2024-04-30 04:17:29.183391', NULL, 1, NULL, NULL, 40, 'restaurant', 'read', 7),
    ('2024-04-29 07:13:32.363917', 1, '2024-04-30 04:17:29.183391', NULL, 1, NULL, NULL, 41, 'restaurant', 'read', 8),
    ('2024-04-29 07:13:32.363917', 1, '2024-04-30 04:17:29.183391', NULL, 1, NULL, NULL, 42, 'restaurant', 'read', 9),
    ('2024-04-29 07:13:32.363917', 1, '2024-04-30 04:17:29.183391', NULL, 1, NULL, NULL, 43, 'restaurant', 'read', 13),
    ('2024-04-29 07:13:32.363917', 1, '2024-04-30 04:17:29.183391', NULL, 1, NULL, NULL, 44, 'restaurant', 'read', 14);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`Permission\` DROP FOREIGN KEY \`FK_01f02fb4f906d216152df403cae\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Role\` DROP INDEX \`IDX_b852abd9e268a63287bc815aab\``,
    );
    await queryRunner.query(`DROP TABLE \`Permission\``);
  }
}
