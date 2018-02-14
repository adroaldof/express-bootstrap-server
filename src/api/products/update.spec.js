import sinon from 'sinon';

import queries from '../../queries';
import { expect, request } from '../../spec-helper';


const route = '/api/products';

describe('product update', () => {
  const updateStub = sinon.stub(queries, 'update');

  afterEach(() => {
    updateStub.resetBehavior();
  });

  it('should return 404 when id is not a number', async () => {
    const invalids = [0, '$', 'invalid', '-'];
    const payload = {
      name: 'Old No. 7',
      price: 22.99,
    };

    const promises = invalids.map(invalid => new Promise(async (resolve, reject) => {
      try {
        const req = await request
          .put(`${route}/${invalid}`)
          .send(payload)
          .expect(404);

        resolve(req);
      } catch (error) {
        /* istanbul ignore next */
        reject(error);
      }
    }));

    await Promise.all(promises);
  });

  it('should return 404 if no name is supplied', async () => {
    const payload = {};

    const firstError = await getFirstError(555, payload);

    expect(firstError).to.include('at least 1 children');
  });

  it('should return 404 with if passed just invalid keys', async () => {
    const payload = { id: 999 };

    const firstError = await getFirstError(555, payload);

    expect(firstError).to.include('at least 1 children');
  });

  it('should return 404 if unknown type is supplied', async () => {
    const payload = {
      name: 'Old No. 7',
      price: 22.99,
      type: 'unknown',
    };

    const firstError = await getFirstError(555, payload);

    expect(firstError).to.include('type');
  });

  it('should return 500 when has a problem in database operation', async () => {
    updateStub.throws({ message: 'message - oops' });

    const payload = {
      name: 'Old No. 8',
      price: 22.99,
    };

    const { error: { text } } = await request
      .put(`${route}/555`)
      .send(payload)
      .expect(500);

    const error = JSON.parse(`${text}`);

    expect(error).to.have.keys('errorKey', 'message');
  });

  it('should return 200 when update a new product', async () => {
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

    updateStub.returns(response);

    const { updated } = await updateProduct(555, payload);

    expect(updated).to.have.keys(
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


async function getFirstError (id, payload, status = 404) {
  const { error: { text } } = await request
    .put(`${route}/${id}`)
    .send(payload)
    .expect(status);

  const allErrors = JSON.parse(`${text}`);
  const { errors } = allErrors;
  const [firstError] = errors;

  return firstError;
}

async function updateProduct (id, payload, status = 200) {
  const { body } = await request
    .put(`${route}/${id}`)
    .send(payload)
    .expect(status);

  return body;
}
