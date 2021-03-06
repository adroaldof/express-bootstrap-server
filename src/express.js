import bodyParser from 'body-parser';
import compress from 'compression';
import cors from 'cors';
import httpStatus from 'http-status';
import morgan from 'morgan';
import methodOverride from 'method-override';

import { env } from '../config';
import logger from './logger';
import routes from './routes';


function init (app) {
  app.set('trust proxy');

  // Parse body params and attach them to req.body
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // Enable CORS - Cross Origin Resource Sharing
  app.use(cors());

  // Other configurations
  app.use(compress());
  app.use(methodOverride());

  // Disable 'X-Powered-By' header in response
  app.disable('x-powered-by');

  // Access headers
  /* istanbul ignore next */
  app.use(setHeaders);

  // Error handler, send stacktrace only during development
  app.use(errorHandler);

  // Mount all api routes on /api path
  app.use('/api', routes);

  /* istanbul ignore next */
  if (env !== 'test') {
    // Request info logger
    app.use(morgan('combined'));

    // Request content logger
    app.use(logger);
  }

  app.all('*', notImplemented);
}


// Export Express app
export default init;


function setHeaders (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

  return next();
}

/* istanbul ignore next */
function errorHandler (error, req, res, next) { // eslint-disable-line no-unused-vars
  return res.status(error.status)
    .json({
      message: (error.isPublic) ? error.message : httpStatus[error.status],
      stack: (env === 'development') ? error.stack : {},
    });
}


function notImplemented (req, res) {
  const body = {
    path: req.originalUrl,
    status: 'not-implemented',
    now: new Date(),
  };

  return res.status(501).send(body);
}
