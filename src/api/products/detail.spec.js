import sinon from 'sinon';

import queries from '../../queries';
import { expect, request } from '../../spec-helper';

const route = '/api/products';


describe('products details', () => {
  const detailsStub = sinon.stub(queries, 'detail');

  afterEach(() => {
    detailsStub.resetBehavior();
  });

  it('should return 500 if get error on query details', async () => {
    detailsStub.throws({ message: 'message - oops' });

    const { error: { text } } = await request
      .get(`${route}/555`)
      .expect(500);

    const error = JSON.parse(`${text}`);

    expect(error).to.have.keys('errorKey', 'message');
  });

  it('should return 404 when id is not a number', async () => {
    const invalids = [0, '$', 'invalid', '-'];

    const promises = invalids.map(invalid => new Promise(async (resolve, reject) => {
      try {
        const req = await request
          .get(`${route}/${invalid}`)
          .expect(404);

        resolve(req);
      } catch (error) {
        /* istanbul ignore next */
        reject(error);
      }
    }));

    await Promise.all(promises);
  });

  it('should return 404 when if given id does not exists', async () => {
    detailsStub.returns(null);

    const { body } = await request
      .get(`${route}/555`)
      .expect(404);

    expect(body).to.have.keys(
      'errorKey',
      'id',
      'product',
    );
  });

  it('should have key product on reponse', async () => {
    const product = { id: 555 };
    detailsStub.returns(product);

    const { body } = await request
      .get(`${route}/555`)
      .expect(200);

    expect(body).to.have.keys('product');
  });

  it('should found product to have all keys', async () => {
    const product = {
      id: 555,
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

    detailsStub.returns(product);

    const { body } = await request
      .get(`${route}/555`)
      .expect(200);

    expect(body.product).to.have.keys(
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
