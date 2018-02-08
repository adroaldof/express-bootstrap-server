import expressWinston from 'express-winston';
import winston from 'winston';

const winstonInstance = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      timestamp: true,
      json: true,
      colorize: true,
      level: 'info',
    })
  ]
});

const logger = expressWinston.logger({
  colorize: true,
  expressFormat: false,
  meta: true,
  msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
  winstonInstance,
})

export default logger;
