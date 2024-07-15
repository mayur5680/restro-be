import { config } from 'dotenv';
import { DataSource } from 'typeorm';
config({
  path: `.env`,
});
const entities = [__dirname + '/../../modules/**/resto365-*.entity.{js,ts}'];
const migrations = [__dirname + '/migrations/*.ts'];

const r365Datasource = new DataSource({
  type: 'mysql',
  host: process.env.R365_DB_HOST,
  port: parseInt(process.env.R365_DB_PORT),
  username: process.env.R365_DB_USER,
  password: process.env.R365_DB_PASSWORD,
  database: process.env.R365_DB_NAME,
  entities,
  migrations,
});
export default r365Datasource;
