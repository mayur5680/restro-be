import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateCerebroCategory1717494892300 implements MigrationInterface {
  name = 'UpdateCerebroCategory1717494892300';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE \`CerebroCategory\` SET \`name\` = 'Base Ingredients' WHERE (\`id\` = '2')`,
    );
    await queryRunner.query(
      `UPDATE \`CerebroCategory\` SET \`name\` = 'Soft Drinks' WHERE (\`id\` = '4')`,
    );
    await queryRunner.query(
      `UPDATE \`CerebroCategory\` SET \`name\` = 'Produce' WHERE (\`id\` = '6')`,
    );
    await queryRunner.query(
      `UPDATE \`CerebroCategory\` SET \`name\` = 'Café Hola' WHERE (\`id\` = '7')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE \`CerebroCategory\` SET \`name\` = 'Base Ingredients' WHERE (\`id\` = '2')`,
    );
    await queryRunner.query(
      `UPDATE \`CerebroCategory\` SET \`name\` = 'Soft Drinks' WHERE (\`id\` = '4')`,
    );
    await queryRunner.query(
      `UPDATE \`CerebroCategory\` SET \`name\` = 'Produce' WHERE (\`id\` = '6')`,
    );
    await queryRunner.query(
      `UPDATE \`CerebroCategory\` SET \`name\` = 'Café Hola' WHERE (\`id\` = '7')`,
    );
  }
}
