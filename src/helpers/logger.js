import config from '../../config/env';

export function logger (message) {
  if (config.env !== 'test') {
    console.log(message); // eslint-disable-line no-console
  }
}
