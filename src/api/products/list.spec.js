import sinon from 'sinon';

import queries from '../../queries';
import { expect, request } from '../../spec-helper';

const route = '/api/products';

describe('products list', () => {
  it('should throw get error on list', async () => {
    const findStub = sinon.stub(queries, 'list');
    findStub.throws();

    await request
      .get(route)
      .expect(400);

    findStub.restore();
  });

  it('should have key products', async () => {
    const { body } = await request
      .get(route)
      .expect(200);

    expect(body).to.have.keys('products');
    expect(body.products).to.be.an('array');
  });

  it('should one product to have all keys', async () => {
    const { body: { products } } = await request
      .get(route)
      .expect(200);

    const [product] = products;

    expect(product).to.have.keys(
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
