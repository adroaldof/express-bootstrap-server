import sinon from 'sinon';

import queries from '../../queries';
import { expect, request } from '../../spec-helper';


const route = '/api/products';

describe('product create', () => {
  const createStub = sinon.stub(queries, 'create');

  afterEach(() => {
    createStub.resetBehavior();
  });

  it('should return 404 if no name is supplied', async () => {
    const payload = {};

    const firstError = await getFirstError(payload);

    expect(firstError).to.include('name');
  });

  it('should return 404 if no price is supplied', async () => {
    const payload = { name: 'Old No. 7' };

    const firstError = await getFirstError(payload);

    expect(firstError).to.include('price');
  });

  it('should return 404 if unknown type is supplied', async () => {
    const payload = {
      name: 'Old No. 7',
      price: 22.99,
      type: 'unknown',
    };

    const firstError = await getFirstError(payload);

    expect(firstError).to.include('type');
  });

  it('should return 500 when has a problem in database operation', async () => {
    createStub.throws({ message: 'message - oops' });

    const payload = {
      name: 'Old No. 7',
      price: 22.99,
    };

    const { error: { text } } = await request
      .post(route)
      .send(payload)
      .expect(500);

    const error = JSON.parse(`${text}`);

    expect(error).to.have.keys('errorKey', 'message');
  });

  it('should return 200 when create a new product', async () => {
    const response = {
      id: 28,
      name: 'Old No. 7',
      type: null,
      description: null,
      tradeMark: null,
      model: null,
      image: null,
      barCode: null,
      price: 22.99,
      createdAt: '2018-02-12T21:44:12.328Z',
      updatedAt: '2018-02-12T21:44:12.328Z',
    };

    const payload = {
      name: 'Old No. 7',
      price: 22.99,
    };

    createStub.returns(response);

    const { body: { created } } = await request
      .post(route)
      .send(payload)
      .expect(200);

    expect(created).to.have.keys(
      'barCode',
      'createdAt',
      'description',
      'id',
      'image',
      'model',
      'name',
      'price',
      'tradeMark',
      'type',
      'updatedAt',
    );
  });
});


async function getFirstError (payload, status = 404) {
  const { error: { text } } = await request
    .post(route)
    .send(payload)
    .expect(status);

  const allErrors = JSON.parse(`${text}`);
  const { errors } = allErrors;
  const [firstError] = errors;

  return firstError;
}
