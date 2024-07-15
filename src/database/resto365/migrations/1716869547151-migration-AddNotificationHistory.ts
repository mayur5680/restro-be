import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNotificationHistory1716869547151 implements MigrationInterface {
  name = 'AddNotificationHistory1716869547151';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`Notification\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`message\` varchar(255) NOT NULL, \`category\` varchar(255) NOT NULL, \`userId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Notification\` ADD CONSTRAINT \`FK_39f36b790a14ce0cb846346db95\` FOREIGN KEY (\`userId\`) REFERENCES \`User\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`Notification\` DROP FOREIGN KEY \`FK_39f36b790a14ce0cb846346db95\``,
    );
    await queryRunner.query(`DROP TABLE \`Notification\``);
  }
}
