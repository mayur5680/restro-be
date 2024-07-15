import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCountryId1718954898668 implements MigrationInterface {
  name = 'AddCountryId1718954898668';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`CerebroCategory\` ADD \`countryId\` int NOT NULL DEFAULT '1'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProduct\` ADD \`countryId\` int NOT NULL DEFAULT '1'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProductCompany\` ADD \`countryId\` int NOT NULL DEFAULT '1'`,
    );

    await queryRunner.query(
      `ALTER TABLE \`CerebroCategory\` ADD CONSTRAINT \`FK_39e9b0e7c135447e29930442eb8\` FOREIGN KEY (\`countryId\`) REFERENCES \`Country\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProduct\` ADD CONSTRAINT \`FK_90712ac1d7b0f3946f5f0584a82\` FOREIGN KEY (\`countryId\`) REFERENCES \`Country\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProductCompany\` ADD CONSTRAINT \`FK_6ed806de30d1f9f0d7e1994d758\` FOREIGN KEY (\`countryId\`) REFERENCES \`Country\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`CerebroProductCompany\` DROP FOREIGN KEY \`FK_6ed806de30d1f9f0d7e1994d758\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProduct\` DROP FOREIGN KEY \`FK_90712ac1d7b0f3946f5f0584a82\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroCategory\` DROP FOREIGN KEY \`FK_39e9b0e7c135447e29930442eb8\``,
    );

    await queryRunner.query(
      `ALTER TABLE \`CerebroProductCompany\` DROP COLUMN \`countryId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroProduct\` DROP COLUMN \`countryId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`CerebroCategory\` DROP COLUMN \`countryId\``,
    );
  }
}
