import express from 'express';

import initExpress from './express';
import { app, env, root } from '../config';

const { host, port } = app;
const server = express();

/**
 * Set express app variables
 */
server.set('root', root);
server.set('env', env);

/**
 * Start system modules
 */
initExpress(server);

/**
 * Start app
 */
/* istanbul ignore next */
if (!module.parent) {
  server.listen(port, () => {
    console.info(`Server started on port ${host}:${port} (${env})`);
  });
}


export default server;
