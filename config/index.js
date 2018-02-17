import path from 'path';
import knex from 'knex';
import config from './knex-config';

/* istanbul ignore next */
const env = process.env.NODE_ENV || 'development';
const root = path.join(__dirname, '/../..');

const app = {
  host: process.env.HOST || 'localhost',
  name: 'Generic Server App',
  port: process.env.PORT || 3000,
};

const queryBuilder = knex(config);

export {
  app,
  env,
  queryBuilder,
  root,
};
