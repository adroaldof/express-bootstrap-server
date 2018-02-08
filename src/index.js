import express from 'express';

import config from '../config/env';
import initExpress from './express';


const app = express();

/**
 * Set express app variables
 */
app.set('root', config.root);
app.set('env', config.env);
app.set('config', config);

/**
 * Start system modules
 */
initExpress(app);

/**
 * Start app
 */
/* istanbul ignore next */
if (!module.parent) {
  const { app: { host, port }, env } = config;

  app.listen(port, () => {
    console.info(`Server started on port ${host}:${port} (${env})`);
  });
}


export default app;
