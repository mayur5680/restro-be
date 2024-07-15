import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateRestaurantColumns1647189236422
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Update data
    await queryRunner.query(`
            UPDATE Restaurant
            SET doorDash = CASE doorDash
                WHEN 'yes' THEN 1
                WHEN 'no' THEN 0
            END,
            menuLog = CASE menuLog
                WHEN 'yes' THEN 1
                WHEN 'no' THEN 0
            END,
            uberEats = CASE uberEats
                WHEN 'yes' THEN 1
                WHEN 'no' THEN 0
            END,
            breakfast = CASE breakfast
                WHEN 'yes' THEN 1
                WHEN 'no' THEN 0
            END,
            coffee = CASE coffee
                WHEN 'yes' THEN 1
                WHEN 'no' THEN 0
            END,
            iceMachine = CASE iceMachine
                WHEN 'yes' THEN 1
                WHEN 'no' THEN 0
            END,
            icedCoffee = CASE icedCoffee
                WHEN 'yes' THEN 1
                WHEN 'no' THEN 0
            END,
            liquor = CASE liquor
                WHEN 'yes' THEN 1
                WHEN 'no' THEN 0
            END,
            churro = CASE churro
                WHEN 'yes' THEN 1
                WHEN 'no' THEN 0
            END,
            quesadillas = CASE quesadillas
                WHEN 'yes' THEN 1
                WHEN 'no' THEN 0
            END,
            softServe = CASE softServe
                WHEN 'yes' THEN 1
                WHEN 'no' THEN 0
            END,
            toilet = CASE toilet
                WHEN 'yes' THEN 1
                WHEN 'no' THEN 0
            END,
            wheelChairAccess = CASE wheelChairAccess
                WHEN 'yes' THEN 1
                WHEN 'no' THEN 0
            END,
            dineIn = CASE dineIn
                WHEN 'yes' THEN 1
                WHEN 'no' THEN 0
            END;
        `);

    // Modify column types
    await queryRunner.query(`
            ALTER TABLE Restaurant
            MODIFY COLUMN doorDash TINYINT,
            MODIFY COLUMN menuLog TINYINT,
            MODIFY COLUMN uberEats TINYINT,
            MODIFY COLUMN breakfast TINYINT,
            MODIFY COLUMN coffee TINYINT,
            MODIFY COLUMN iceMachine TINYINT,
            MODIFY COLUMN icedCoffee TINYINT,
            MODIFY COLUMN liquor TINYINT,
            MODIFY COLUMN churro TINYINT,
            MODIFY COLUMN quesadillas TINYINT,
            MODIFY COLUMN softServe TINYINT,
            MODIFY COLUMN toilet TINYINT,
            MODIFY COLUMN wheelChairAccess TINYINT,
            MODIFY COLUMN dineIn TINYINT;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Since the columns are modified from tinyint back to string,
    // the down migration would involve changing their types back to string
    await queryRunner.query(`
            ALTER TABLE Restaurant
            MODIFY COLUMN doorDash VARCHAR(255),
            MODIFY COLUMN menuLog VARCHAR(255),
            MODIFY COLUMN uberEats VARCHAR(255),
            MODIFY COLUMN breakfast VARCHAR(255),
            MODIFY COLUMN coffee VARCHAR(255),
            MODIFY COLUMN iceMachine VARCHAR(255),
            MODIFY COLUMN icedCoffee VARCHAR(255),
            MODIFY COLUMN liquor VARCHAR(255),
            MODIFY COLUMN churro VARCHAR(255),
            MODIFY COLUMN quesadillas VARCHAR(255),
            MODIFY COLUMN softServe VARCHAR(255),
            MODIFY COLUMN toilet VARCHAR(255),
            MODIFY COLUMN wheelChairAccess VARCHAR(255),
            MODIFY COLUMN dineIn VARCHAR(255);
        `);
  }
}
