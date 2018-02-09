import path from 'path';

/* istanbul ignore next */
const env = process.env.NODE_ENV || 'development';
const root = path.join(__dirname, '/../..');

const app = {
  host: process.env.APP_HOST || 'localhost',
  name: 'Generic Server App',
  port: process.env.APP_PORT || 3000,
};


export default {
  app,
  env,
  root,
};
