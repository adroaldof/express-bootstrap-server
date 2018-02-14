import { env } from '../../config';

export function logger (message) {
  if (env !== 'test') {
    console.log(message); // eslint-disable-line no-console
  }
}
