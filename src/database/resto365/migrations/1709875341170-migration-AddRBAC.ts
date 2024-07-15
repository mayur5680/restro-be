import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1709875341170 implements MigrationInterface {
  name = 'Migration1709875341170';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`Country\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`createdBy\` int NOT NULL, \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updatedBy\` int NULL, \`version\` int NOT NULL, \`deletedAt\` datetime(6) NULL, \`deletedBy\` int NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`Area\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`createdBy\` int NOT NULL, \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updatedBy\` int NULL, \`version\` int NOT NULL, \`deletedAt\` datetime(6) NULL, \`deletedBy\` int NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`countryId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`Role\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`createdBy\` int NOT NULL, \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updatedBy\` int NULL, \`version\` int NOT NULL, \`deletedAt\` datetime(6) NULL, \`deletedBy\` int NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`User\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`createdBy\` int NOT NULL, \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updatedBy\` int NULL, \`version\` int NOT NULL, \`deletedAt\` datetime(6) NULL, \`deletedBy\` int NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`oktaId\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`department\` varchar(255) NULL, \`phone\` varchar(255) NULL, \`roleId\` int NOT NULL, UNIQUE INDEX \`IDX_bb9c41f809d03804d71eb7b1b4\` (\`oktaId\`), UNIQUE INDEX \`IDX_4a257d2c9837248d70640b3e36\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user_countries_country\` (\`userId\` int NOT NULL, \`countryId\` int NOT NULL, INDEX \`IDX_38b2afb2e0c071561043aee547\` (\`userId\`), INDEX \`IDX_35b2dc0394aba861c20921b1a3\` (\`countryId\`), PRIMARY KEY (\`userId\`, \`countryId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user_areas_area\` (\`userId\` int NOT NULL, \`areaId\` int NOT NULL, INDEX \`IDX_7d64254c475088fd00e0df318c\` (\`userId\`), INDEX \`IDX_fee62ce53a88189331d5ea9fde\` (\`areaId\`), PRIMARY KEY (\`userId\`, \`areaId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user_restaurants_restaurant\` (\`userId\` int NOT NULL, \`restaurantId\` int NOT NULL, INDEX \`IDX_0c1395e4ef0f6e0808bd8b9907\` (\`userId\`), INDEX \`IDX_ab308e9b06e4218892a8735881\` (\`restaurantId\`), PRIMARY KEY (\`userId\`, \`restaurantId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP COLUMN \`doorDash\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`doorDash\` tinyint NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP COLUMN \`menuLog\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`menuLog\` tinyint NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP COLUMN \`uberEats\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`uberEats\` tinyint NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP COLUMN \`breakfast\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`breakfast\` tinyint NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP COLUMN \`coffee\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`coffee\` tinyint NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP COLUMN \`iceMachine\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`iceMachine\` tinyint NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP COLUMN \`icedCoffee\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`icedCoffee\` tinyint NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP COLUMN \`liquor\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`liquor\` tinyint NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP COLUMN \`churro\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`churro\` tinyint NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP COLUMN \`quesadillas\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`quesadillas\` tinyint NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP COLUMN \`softServe\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`softServe\` tinyint NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP COLUMN \`toilet\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`toilet\` tinyint NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP COLUMN \`wheelChairAccess\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`wheelChairAccess\` tinyint NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP COLUMN \`dineIn\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`dineIn\` tinyint NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Area\` ADD CONSTRAINT \`FK_f469391541cc97303e9c796f8b9\` FOREIGN KEY (\`countryId\`) REFERENCES \`Country\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`User\` ADD CONSTRAINT \`FK_0b8c60cc29663fa5b9fb108edd7\` FOREIGN KEY (\`roleId\`) REFERENCES \`Role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_countries_country\` ADD CONSTRAINT \`FK_38b2afb2e0c071561043aee547c\` FOREIGN KEY (\`userId\`) REFERENCES \`User\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_countries_country\` ADD CONSTRAINT \`FK_35b2dc0394aba861c20921b1a30\` FOREIGN KEY (\`countryId\`) REFERENCES \`Country\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_areas_area\` ADD CONSTRAINT \`FK_7d64254c475088fd00e0df318cb\` FOREIGN KEY (\`userId\`) REFERENCES \`User\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_areas_area\` ADD CONSTRAINT \`FK_fee62ce53a88189331d5ea9fde4\` FOREIGN KEY (\`areaId\`) REFERENCES \`Area\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_restaurants_restaurant\` ADD CONSTRAINT \`FK_0c1395e4ef0f6e0808bd8b9907d\` FOREIGN KEY (\`userId\`) REFERENCES \`User\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_restaurants_restaurant\` ADD CONSTRAINT \`FK_ab308e9b06e4218892a8735881c\` FOREIGN KEY (\`restaurantId\`) REFERENCES \`Restaurant\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user_restaurants_restaurant\` DROP FOREIGN KEY \`FK_ab308e9b06e4218892a8735881c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_restaurants_restaurant\` DROP FOREIGN KEY \`FK_0c1395e4ef0f6e0808bd8b9907d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_areas_area\` DROP FOREIGN KEY \`FK_fee62ce53a88189331d5ea9fde4\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_areas_area\` DROP FOREIGN KEY \`FK_7d64254c475088fd00e0df318cb\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_countries_country\` DROP FOREIGN KEY \`FK_35b2dc0394aba861c20921b1a30\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_countries_country\` DROP FOREIGN KEY \`FK_38b2afb2e0c071561043aee547c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`User\` DROP FOREIGN KEY \`FK_0b8c60cc29663fa5b9fb108edd7\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Area\` DROP FOREIGN KEY \`FK_f469391541cc97303e9c796f8b9\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP COLUMN \`dineIn\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`dineIn\` char(15) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP COLUMN \`wheelChairAccess\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`wheelChairAccess\` char(15) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP COLUMN \`toilet\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`toilet\` char(15) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP COLUMN \`softServe\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`softServe\` char(15) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP COLUMN \`quesadillas\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`quesadillas\` char(15) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP COLUMN \`churro\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`churro\` char(15) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP COLUMN \`liquor\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`liquor\` char(15) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP COLUMN \`icedCoffee\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`icedCoffee\` char(15) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP COLUMN \`iceMachine\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`iceMachine\` char(15) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP COLUMN \`coffee\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`coffee\` char(15) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP COLUMN \`breakfast\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`breakfast\` char(15) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP COLUMN \`uberEats\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`uberEats\` char(15) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP COLUMN \`menuLog\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`menuLog\` char(15) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP COLUMN \`doorDash\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`doorDash\` char(15) NULL`,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_ab308e9b06e4218892a8735881\` ON \`user_restaurants_restaurant\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_0c1395e4ef0f6e0808bd8b9907\` ON \`user_restaurants_restaurant\``,
    );
    await queryRunner.query(`DROP TABLE \`user_restaurants_restaurant\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_fee62ce53a88189331d5ea9fde\` ON \`user_areas_area\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_7d64254c475088fd00e0df318c\` ON \`user_areas_area\``,
    );
    await queryRunner.query(`DROP TABLE \`user_areas_area\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_35b2dc0394aba861c20921b1a3\` ON \`user_countries_country\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_38b2afb2e0c071561043aee547\` ON \`user_countries_country\``,
    );
    await queryRunner.query(`DROP TABLE \`user_countries_country\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_4a257d2c9837248d70640b3e36\` ON \`User\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_bb9c41f809d03804d71eb7b1b4\` ON \`User\``,
    );
    await queryRunner.query(`DROP TABLE \`User\``);
    await queryRunner.query(`DROP TABLE \`Role\``);
    await queryRunner.query(`DROP TABLE \`Area\``);
    await queryRunner.query(`DROP TABLE \`Country\``);
  }
}
