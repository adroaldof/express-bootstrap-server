import bodyParser from 'body-parser';
import compress from 'compression';
import cors from 'cors';
import httpStatus from 'http-status';
import morgan from 'morgan';
import methodOverride from 'method-override';

import APIError from './helpers/errors/APIError';
import config from '../config/env';
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

  // If error is not an instanceOf APIError, convert it
  /* istanbul ignore next */
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    return next();
  });

  // Error handler, send stacktrace only during development
  app.use((error, req, res, next) => { // eslint-disable-line no-unused-vars
    return res.status(error.status)
    .json({
      message: (error.isPublic) ? error.message : httpStatus[error.status],
      stack: (config.env === 'development') ? error.stack : {}
    });
  });

  // Mount all api routes on /api path
  app.use('/api', routes);

  // Request logger
  app.use(morgan('combined'));

  // Enable content API logger when environment is development
  /* istanbul ignore next */
  if (config.env === 'development') {
    app.use(logger);
  }

  app.all('*', notImplemented);
}


// Export Express app
export default init;


function notImplemented (req, res) {

  const body = {
    path: req.originalUrl,
    status: 'not-implemented',
    date: new Date(),
  };

  return res.send(body).status(501);
}
