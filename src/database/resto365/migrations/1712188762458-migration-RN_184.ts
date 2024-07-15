import { MigrationInterface, QueryRunner } from 'typeorm';

export class RN_184_1712188762450 implements MigrationInterface {
  name = 'RN-184_1712188762450';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // AddRestaurantAreaShortNames1712188762458
    await queryRunner.query(
      `ALTER TABLE \`Area\` ADD \`shortName\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Role\` ADD \`isCustomRole\` tinyint NOT NULL DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Role\` ADD \`scope\` varchar(255) NOT NULL`,
    );
    // AddStates1712188762459
    await queryRunner.query(`UPDATE Restaurant
    SET state = 
      CASE 
        WHEN id = 4 THEN 'NSW'
        WHEN id = 11 THEN 'VIC'
        WHEN id = 46 THEN 'VIC'
        WHEN id = 54 THEN 'QLD'
        WHEN id = 57 THEN 'VIC'
        WHEN id = 61 THEN 'WA'
        WHEN id = 99 THEN 'NSW'
        WHEN id = 111 THEN 'WA'
        WHEN id = 126 THEN 'QLD'
        WHEN id = 127 THEN 'WA'
        WHEN id = 156 THEN 'WA'
        WHEN id = 168 THEN 'VIC'
        WHEN id = 173 THEN 'NSW'
        WHEN id = 191 THEN 'NSW'
        ELSE state
      END;`);
    // AddAreas1712188762460
    await queryRunner.query(
      `INSERT INTO Area (createdAt, createdBy, updatedAt, updatedBy, version, deletedAt, deletedBy, id, name, countryId, shortName) VALUES
      ('2024-03-25 10:04:45.932452', 1, '2024-03-26 05:34:27.293799', 1, 1, NULL, NULL, 1, 'New South Wales', 1, 'NSW'),
      ('2024-03-25 10:04:45.932452', 1, '2024-03-26 05:34:27.293165', 1, 1, NULL, NULL, 2, 'Queensland', 1, 'QLD'),
      ('2024-03-25 10:04:45.932452', 1, '2024-03-26 05:34:27.292657', 1, 1, NULL, NULL, 3, 'South Australia', 1, 'SA'),
      ('2024-03-25 10:04:45.932452', 1, '2024-03-26 05:34:27.292134', 1, 1, NULL, NULL, 4, 'Tasmania', 1, 'TAS'),
      ('2024-03-25 10:04:45.932452', 1, '2024-03-26 05:34:27.291309', 1, 1, NULL, NULL, 5, 'Victoria', 1, 'VIC'),
      ('2024-03-25 10:04:45.932452', 1, '2024-03-26 05:34:27.290487', 1, 1, NULL, NULL, 6, 'Western Australia', 1, 'WA'),
      ('2024-03-25 10:04:45.932452', 1, '2024-03-26 05:34:27.289528', 1, 1, NULL, NULL, 7, 'Australian Capital Territory', 1, 'ACT'),
      ('2024-03-25 10:04:45.932452', 1, '2024-03-26 05:34:27.283829', 1, 1, NULL, NULL, 8, 'Northern Territory', 1, 'NT');`,
      await queryRunner.query(
        `UPDATE Restaurant r
        SET r.areaId = (
        CASE TRIM(r.state)
            WHEN 'NSW' THEN 1
            WHEN 'QLD' THEN 2
            WHEN 'SA' THEN 3
            WHEN 'TAS' THEN 4
            WHEN 'VIC' THEN 5
            WHEN 'WA' THEN 6
            WHEN 'ACT' THEN 7
            WHEN 'NT' THEN 8
            ELSE 0
        END)
        WHERE r.areaId = 0;`,
      ),
    );
    // AddRoles1712188762462
    await queryRunner.query(`
    ALTER TABLE User DROP FOREIGN KEY FK_0b8c60cc29663fa5b9fb108edd7;
`);
    await queryRunner.query(`
DELETE FROM Role;
`);

    await queryRunner.query(`
        INSERT INTO Role (createdAt, createdBy, updatedAt, updatedBy, version, deletedAt, deletedBy, id, name, description, scope) VALUES
('2024-03-25 11:06:14.844507', 1, '2024-03-25 11:06:14.844507', NULL, 1, NULL, NULL, 1, 'Administrator', NULL, 'country'),
('2024-03-25 11:06:14.928570', 1, '2024-03-25 11:06:14.928570', NULL, 1, NULL, NULL, 2, 'Customer Service Administrator', NULL, 'country'),
('2024-03-25 11:06:15.026800', 1, '2024-03-25 11:06:15.026800', NULL, 1, NULL, NULL, 3, 'Marketing Administrator', NULL, 'country'),
('2024-03-25 11:06:15.100557', 1, '2024-03-26 14:53:35.140710', NULL, 1, NULL, NULL, 4, 'Restaurant Manager', NULL, 'restaurant'),
('2024-03-25 11:06:15.179825', 1, '2024-03-25 11:06:15.179825', NULL, 1, NULL, NULL, 5, 'Center of Excellence Administrator', NULL, 'country'),
('2024-03-25 11:06:15.238464', 1, '2024-03-25 11:06:15.238464', NULL, 1, NULL, NULL, 6, 'Supply Chain Administrator', NULL, 'country'),
('2024-03-25 11:06:15.300536', 1, '2024-03-25 11:06:15.300536', NULL, 1, NULL, NULL, 7, 'Supply Chain Lead', NULL, 'country'),
('2024-03-25 11:06:15.365478', 1, '2024-03-25 11:06:15.365478', NULL, 1, NULL, NULL, 8, 'Administrative Assistant - Center of Excellence', NULL, 'country'),
('2024-03-25 11:06:15.457465', 1, '2024-03-25 11:06:15.457465', NULL, 1, NULL, NULL, 9, 'Administrative Assistant - Marketing', NULL, 'country'),
('2024-03-25 11:06:15.725520', 1, '2024-03-25 11:06:15.725520', NULL, 1, NULL, NULL, 12, 'Supply Chain Lead', NULL, 'country'),
('2024-03-25 11:06:15.725520', 1, '2024-03-26 15:19:45.112766', NULL, 1, NULL, NULL, 13, 'State Manager', NULL, 'restaurant'),
('2024-03-25 11:06:15.725520', 1, '2024-03-26 15:19:45.088297', NULL, 1, NULL, NULL, 14, 'Area Manager', NULL, 'restaurant');
        `);

    await queryRunner.query(`
        ALTER TABLE User ADD CONSTRAINT FK_0b8c60cc29663fa5b9fb108edd7 FOREIGN KEY (roleId) REFERENCES Role (id);
        `);

    // AddRoleManagementConstraints1712188762463
    await queryRunner.query(
      `ALTER TABLE \`User\` ADD UNIQUE INDEX \`IDX_bb9c41f809d03804d71eb7b1b5\` (\`oktaId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`User\` ADD UNIQUE INDEX \`IDX_4a257d2c9837248d70640b3e37\` (\`email\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD CONSTRAINT \`FK_9c576253c35c1514278701c84ae\` FOREIGN KEY (\`areaId\`) REFERENCES \`Area\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(): Promise<void> {}
}
