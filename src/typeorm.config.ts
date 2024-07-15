import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from 'src/modules/config/config.service';

export const typeormConfig = (
  configService: ConfigService,
): Record<string, TypeOrmModuleOptions> => {
  const bhyveConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: configService.bhyveDb.host,
    port: parseInt(configService.bhyveDb.port),
    username: configService.bhyveDb.user,
    password: configService.bhyveDb.password,
    database: configService.bhyveDb.name, // Use the BHYVE database here
    synchronize: false,
    entities: [
      __dirname +
        '/**/*.entity.{js,ts}!(resto365-*.entity.{js,ts})!(cerebro-*.entity.{js,ts})',
    ],
    logging: true,
  };

  const r365Config: TypeOrmModuleOptions = {
    type: 'mysql',
    host: configService.resto365Db.host,
    port: parseInt(configService.resto365Db.port),
    username: configService.resto365Db.user,
    password: configService.resto365Db.password,
    database: configService.resto365Db.name, // Use the RESTO365 database here
    synchronize: false,
    entities: [__dirname + '/**/resto365-*.entity.{js,ts}'],
    logging: ['error', 'warn', 'info'],
    timezone: 'Z',
  };

  const cerebroConfig: TypeOrmModuleOptions = {
    type: 'mssql',
    host: configService.cerebroDb.host,
    port: parseInt(configService.cerebroDb.port),
    username: configService.cerebroDb.user,
    password: configService.cerebroDb.password,
    database: configService.cerebroDb.name, // Use the CEREBRO database here
    synchronize: false,
    entities: [__dirname + '/**/cerebro-*.entity.{js,ts}'],
    options: { encrypt: false },
    schema: 'Crunchtime',
    logging: ['error', 'warn', 'info'],
  };
  return {
    default: bhyveConfig,
    r365: r365Config,
    cerebro: cerebroConfig,
  };
};
