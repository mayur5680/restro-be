import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterRestaurantTableForTypeChanges1716874235328
  implements MigrationInterface
{
  name = 'AlterRestaurantTableForTypeChanges1716874235328';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create temporary columns to hold existing data
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`temp_cAndOCoachPhoneNumber\` varchar(20) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`temp_phoneNumber\` varchar(20) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`temp_restaurantEmail\` varchar(100) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`temp_longitude\` decimal(11,8) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`temp_latitude\` decimal(11,8) NULL`,
    );

    // Copy data to temporary columns
    await queryRunner.query(
      `UPDATE \`Restaurant\` SET \`temp_cAndOCoachPhoneNumber\` = NULLIF(\`cAndOCoachPhoneNumber\`, '')`,
    );
    await queryRunner.query(
      `UPDATE \`Restaurant\` SET \`temp_phoneNumber\` = NULLIF(\`phoneNumber\`, '')`,
    );
    await queryRunner.query(
      `UPDATE \`Restaurant\` SET \`temp_restaurantEmail\` = NULLIF(\`restaurantEmail\`, '')`,
    );
    await queryRunner.query(
      `UPDATE \`Restaurant\` SET \`temp_longitude\` = NULLIF(\`longitude\`, '')`,
    );
    await queryRunner.query(
      `UPDATE \`Restaurant\` SET \`temp_latitude\` = NULLIF(\`latitude\`, '')`,
    );

    // Perform the necessary changes
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP COLUMN \`cAndOCoachPhoneNumber\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`cAndOCoachPhoneNumber\` varchar(20) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP COLUMN \`phoneNumber\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`phoneNumber\` varchar(20) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP COLUMN \`restaurantEmail\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`restaurantEmail\` varchar(100) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP COLUMN \`longitude\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`longitude\` decimal(11,8) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP COLUMN \`latitude\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`latitude\` decimal(11,8) NULL`,
    );

    // Restore data from temporary columns
    await queryRunner.query(
      `UPDATE \`Restaurant\` SET \`cAndOCoachPhoneNumber\` = \`temp_cAndOCoachPhoneNumber\``,
    );
    await queryRunner.query(
      `UPDATE \`Restaurant\` SET \`phoneNumber\` = \`temp_phoneNumber\``,
    );
    await queryRunner.query(
      `UPDATE \`Restaurant\` SET \`restaurantEmail\` = \`temp_restaurantEmail\``,
    );
    await queryRunner.query(
      `UPDATE \`Restaurant\` SET \`longitude\` = \`temp_longitude\``,
    );
    await queryRunner.query(
      `UPDATE \`Restaurant\` SET \`latitude\` = \`temp_latitude\``,
    );

    // Remove temporary columns
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP COLUMN \`temp_cAndOCoachPhoneNumber\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP COLUMN \`temp_phoneNumber\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP COLUMN \`temp_restaurantEmail\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP COLUMN \`temp_longitude\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP COLUMN \`temp_latitude\``,
    );

    // Change columns to TEXT to reduce row size
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` MODIFY \`additionalDetails\` TEXT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` MODIFY \`longDescription\` TEXT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP COLUMN \`latitude\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`latitude\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP COLUMN \`longitude\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`longitude\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP COLUMN \`restaurantEmail\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`restaurantEmail\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP COLUMN \`phoneNumber\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`phoneNumber\` varchar(16) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` DROP COLUMN \`cAndOCoachPhoneNumber\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Restaurant\` ADD \`cAndOCoachPhoneNumber\` varchar(255) NULL`,
    );
  }
}
