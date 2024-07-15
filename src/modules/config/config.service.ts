import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import * as Yup from 'yup';

const ConfigSchema = Yup.object<NodeJS.ProcessEnv>().noUnknown(false).shape({
  DB_NAME: Yup.string().required(),
  DB_PORT: Yup.string().required(),
  DB_PASSWORD: Yup.string().required(),
  DB_USER: Yup.string().required(),
  DB_HOST: Yup.string().required(),
  R365_DB_NAME: Yup.string().required(),
  R365_DB_PORT: Yup.string().required(),
  R365_DB_PASSWORD: Yup.string().required(),
  R365_DB_USER: Yup.string().required(),
  R365_DB_HOST: Yup.string().required(),
  OKTA_API_KEY: Yup.string().required(),
  OKTA_APP_ID: Yup.string().required(),
  OKTA_DOMAIN: Yup.string().required(),
  CEREBRO_SQL_DB_NAME: Yup.string().required(),
  CEREBRO_SQL_DB_PORT: Yup.string().required(),
  CEREBRO_SQL_DB_PASSWORD: Yup.string().required(),
  CEREBRO_SQL_DB_USER: Yup.string().required(),
  CEREBRO_SQL_DB_HOST: Yup.string().required(),
  BHYVE_URL: Yup.string().required(),
});

type EnvConfig = ReturnType<typeof ConfigSchema.cast>;

@Injectable()
export class ConfigService {
  private config: EnvConfig;

  public constructor() {
    if (!ConfigSchema.validateSync(process.env)) {
      throw new Error('ConfigService is invalid');
    }

    this.config = ConfigSchema.cast(process.env);

    Logger.debug(
      JSON.stringify(maskKey({ ...this.oktaConfig }, 'oktaApiToken')),
      'oktaConfig',
    );
    Logger.debug(
      JSON.stringify(maskKey({ ...this.bhyveDb }, 'password')),
      'bhyve',
    );
    Logger.debug(
      JSON.stringify(maskKey({ ...this.resto365Db }, 'password')),
      'r365',
    );
    Logger.debug(
      JSON.stringify(maskKey({ ...this.cerebroDb }, 'password')),
      'cerebro',
    );

    Logger.debug(
      JSON.stringify(maskKey({ ...this.bhyveConfig }, 'url')),
      'bhyve',
    );
  }

  public get envConfig() {
    if (!this.config) {
      throw new Error('ConfigService is invalid at runtime');
    }

    return this.config;
  }

  public get bhyveDb() {
    return {
      name: this.envConfig.DB_NAME,
      user: this.envConfig.DB_USER,
      port: this.envConfig.DB_PORT,
      password: this.envConfig.DB_PASSWORD,
      host: this.envConfig.DB_HOST,
    };
  }

  public get resto365Db() {
    return {
      name: this.envConfig.R365_DB_NAME,
      user: this.envConfig.R365_DB_USER,
      port: this.envConfig.R365_DB_PORT,
      password: this.envConfig.R365_DB_PASSWORD,
      host: this.envConfig.R365_DB_HOST,
    };
  }

  public get cerebroDb() {
    return {
      name: this.envConfig.CEREBRO_SQL_DB_NAME,
      user: this.envConfig.CEREBRO_SQL_DB_USER,
      port: this.envConfig.CEREBRO_SQL_DB_PORT,
      password: this.envConfig.CEREBRO_SQL_DB_PASSWORD,
      host: this.envConfig.CEREBRO_SQL_DB_HOST,
    };
  }

  public get oktaConfig() {
    const oktaDomain = this.envConfig.OKTA_DOMAIN;
    return {
      oktaDomain,
      oktaApiUrl: `https://${oktaDomain}/api/v1`,
      oktaJwksUri: `https://${oktaDomain}/oauth2/v1/keys`,
      oktaApiToken: this.envConfig.OKTA_API_KEY,
      oktaAppId: this.envConfig.OKTA_APP_ID,
    };
  }

  public get bhyveConfig() {
    return {
      bhvyeHttp: axios.create({
        baseURL: `${this.envConfig.BHYVE_URL}`, // set base URL
        headers: {
          'Content-Type': 'application/json', // set default headers
        },
      }),
    };
  }
}

function maskKey(obj, key) {
  if (obj && obj[key]) {
    const originalValue = obj[key];
    originalValue.length <= 2
      ? (obj[key] = '*'.repeat(originalValue.length))
      : (obj[key] =
          originalValue.substring(0, 2) + '*'.repeat(originalValue.length - 2));
  }
  return obj;
}
