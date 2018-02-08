import chaiAsPromised from 'chai-as-promised';
import defaults from 'superagent-defaults';
import supertest from 'supertest';
import chai from 'chai';

import app from './index';


const { expect } = chai;
chai.use(chaiAsPromised);

const request = defaults(supertest(app));

export {
  expect,
  request,
};
