import express from 'express';

import initExpress from './express';
import { app, env, root } from '../config';
import { migrate, seed } from '../config/knex';

const { host, port } = app;

/**
 * Start system modules
 */
async function start () {
  const server = express();

  /**
   * Set express app variables
   */
  server.set('root', root);
  server.set('env', env);

  await migrate();
  await seed();
  await initExpress(server);

  /**
   * Start app
   */
  /* istanbul ignore next */
  if (!module.parent) {
    server.listen(port, () => {
      console.info(`Server started on port ${host}:${port} (${env}) - ${Date().toString()}`);
    });
  }

  return server;
}

if (env !== 'test') {
  start();
}


export default start;
