import chaiAsPromised from 'chai-as-promised';
import defaults from 'superagent-defaults';
import supertest from 'supertest';
import chai from 'chai';

import server from './index';


const { expect } = chai;
chai.use(chaiAsPromised);

let request;

before(async function () {
  this.app = await server();
  this.request = defaults(supertest(this.app));

  request = this.request;
});


export {
  expect,
  request,
};
