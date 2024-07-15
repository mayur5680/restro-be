import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCreateAtAndUpdateAt1711517260415 implements MigrationInterface {
  name = 'AddCreateAtAndUpdateAt1711517260415';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`CerebroProduct\` ADD \`createdBy\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProduct\` ADD \`updatedBy\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProduct\` ADD \`version\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProduct\` ADD \`deletedAt\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProduct\` ADD \`deletedBy\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProductCompany\` ADD \`createdBy\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProductCompany\` ADD \`updatedBy\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProductCompany\` ADD \`version\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProductCompany\` ADD \`deletedAt\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProductCompany\` ADD \`deletedBy\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Role\` CHANGE \`createdAt\` \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Role\` CHANGE \`updatedAt\` \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Country\` CHANGE \`createdAt\` \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Country\` CHANGE \`updatedAt\` \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Area\` CHANGE \`createdAt\` \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Area\` CHANGE \`updatedAt\` \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` CHANGE \`createdAt\` \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` CHANGE \`updatedAt\` \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`User\` CHANGE \`createdAt\` \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`User\` CHANGE \`updatedAt\` \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProduct\` CHANGE \`createdAt\` \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProduct\` CHANGE \`updatedAt\` \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(`ALTER TABLE \`CerebroProduct\` DROP PRIMARY KEY`);
    await queryRunner.query(
      `ALTER TABLE \`CerebroProduct\` DROP COLUMN \`id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProduct\` ADD \`id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProductCompany\` CHANGE \`createdAt\` \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProductCompany\` CHANGE \`updatedAt\` \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(`DROP INDEX \`name_UNIQUE\` ON \`CrunchSync\``);
    await queryRunner.query(
      `ALTER TABLE \`CrunchSync\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`CrunchSync\` ADD \`createdBy\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`CrunchSync\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`CrunchSync\` ADD \`updatedBy\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`CrunchSync\` ADD \`version\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`CrunchSync\` ADD \`deletedAt\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`CrunchSync\` ADD \`deletedBy\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`CrunchSync\` CHANGE \`syncDate\` \`syncDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`CrunchSync\` CHANGE \`syncDate\` \`syncDate\` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`CrunchSync\` DROP COLUMN \`deletedBy\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`CrunchSync\` DROP COLUMN \`deletedAt\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`CrunchSync\` DROP COLUMN \`version\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`CrunchSync\` DROP COLUMN \`updatedBy\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`CrunchSync\` DROP COLUMN \`updatedAt\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`CrunchSync\` DROP COLUMN \`createdBy\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`CrunchSync\` DROP COLUMN \`createdAt\``,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`name_UNIQUE\` ON \`CrunchSync\` (\`name\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProductCompany\` CHANGE \`updatedAt\` \`updatedAt\` datetime(6) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProductCompany\` CHANGE \`createdAt\` \`createdAt\` datetime(6) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProduct\` DROP COLUMN \`id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProduct\` ADD \`id\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProduct\` ADD PRIMARY KEY (\`id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProduct\` CHANGE \`updatedAt\` \`updatedAt\` datetime(6) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProduct\` CHANGE \`createdAt\` \`createdAt\` datetime(6) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`User\` CHANGE \`updatedAt\` \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`User\` CHANGE \`createdAt\` \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` CHANGE \`updatedAt\` \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` CHANGE \`createdAt\` \`createdAt\` datetime(6) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Area\` CHANGE \`updatedAt\` \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Area\` CHANGE \`createdAt\` \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Country\` CHANGE \`updatedAt\` \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Country\` CHANGE \`createdAt\` \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Role\` CHANGE \`updatedAt\` \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Role\` CHANGE \`createdAt\` \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProductCompany\` DROP COLUMN \`deletedBy\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProductCompany\` DROP COLUMN \`deletedAt\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProductCompany\` DROP COLUMN \`version\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProductCompany\` DROP COLUMN \`updatedBy\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProductCompany\` DROP COLUMN \`createdBy\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProduct\` DROP COLUMN \`deletedBy\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProduct\` DROP COLUMN \`deletedAt\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProduct\` DROP COLUMN \`version\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProduct\` DROP COLUMN \`updatedBy\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProduct\` DROP COLUMN \`createdBy\``,
    );
  }
}
