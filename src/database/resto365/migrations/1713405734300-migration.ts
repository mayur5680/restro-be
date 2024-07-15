import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1713405734300 implements MigrationInterface {
  name = 'Migration1713405734300';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`AuditLogs\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`correlationId\` varchar(255) NULL, \`userId\` int NULL, \`username\` varchar(255) NULL, \`email\` varchar(255) NULL, \`roleId\` int NULL, \`roleName\` varchar(255) NULL, \`subject\` varchar(255) NOT NULL, \`action\` varchar(255) NOT NULL, \`origin\` varchar(255) NOT NULL, \`entitySource\` varchar(255) NULL, \`entitySourceId\` int NULL, \`module\` varchar(255) NULL, \`description\` varchar(255) NULL, \`requestedValue\` json NULL, \`initialValue\` json NULL, \`updatedValue\` json NULL, INDEX \`IDX_292695c9c084eb72063a7c0540\` (\`createdAt\`), INDEX \`IDX_2ffb12019a46f89c634f3095b2\` (\`correlationId\`), INDEX \`IDX_8965511d95ea3940a5d620f1c5\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_8965511d95ea3940a5d620f1c5\` ON \`AuditLogs\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_2ffb12019a46f89c634f3095b2\` ON \`AuditLogs\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_292695c9c084eb72063a7c0540\` ON \`AuditLogs\``,
    );
    await queryRunner.query(`DROP TABLE \`AuditLogs\``);
  }
}
