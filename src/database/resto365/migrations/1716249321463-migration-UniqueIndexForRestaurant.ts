import { MigrationInterface, QueryRunner } from 'typeorm';

export class UniqueIndexForRestaurant1716249321463
  implements MigrationInterface
{
  name = 'UniqueIndexForRestaurant1716249321463';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD UNIQUE INDEX \`IDX_e346718137dd31a51331acbd49\` (\`restaurantName\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`restaurantName\` ON \`Restaurant\` (\`restaurantName\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`restaurantName\` ON \`Restaurant\``);
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP INDEX \`IDX_e346718137dd31a51331acbd49\``,
    );
  }
}
