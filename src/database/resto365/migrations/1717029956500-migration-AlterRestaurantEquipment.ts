import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterRestaurantEquipment1717029956500
  implements MigrationInterface
{
  name = 'AlterRestaurantEquipment1717029956500';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`RestaurantEquipment\` CHANGE \`model\` \`model\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`RestaurantEquipment\` CHANGE \`lastServiceDate\` \`lastServiceDate\` date NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`RestaurantEquipment\` CHANGE \`nextServiceDate\` \`nextServiceDate\` date NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`RestaurantEquipment\` CHANGE \`servicePeriod\` \`servicePeriod\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`RestaurantEquipment\` CHANGE \`servicePeriod\` \`servicePeriod\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`RestaurantEquipment\` CHANGE \`nextServiceDate\` \`nextServiceDate\` date NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`RestaurantEquipment\` CHANGE \`lastServiceDate\` \`lastServiceDate\` date NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`RestaurantEquipment\` CHANGE \`model\` \`model\` varchar(255) NOT NULL`,
    );
  }
}
