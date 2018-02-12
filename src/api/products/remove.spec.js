import sinon from 'sinon';

import queries from '../../queries';
import { expect, request } from '../../spec-helper';

const route = '/api/products';

describe('products remove', () => {
  const removeStub = sinon.stub(queries, 'remove');

  afterEach(() => {
    removeStub.resetBehavior();
  });

  it('should answer 501 if no id is supplied', async () => {
    await request
      .delete(route)
      .expect(501);
  });

  it('should return 404 when id is not a number', async () => {
    const invalids = [0, '$', 'invalid', '-'];

    const promises = invalids.map(invalid => new Promise(async (resolve, reject) => {
      try {
        const req = await request
          .delete(`${route}/${invalid}`)
          .expect(404);

        resolve(req);
      } catch (error) {
        /* istanbul ignore next */
        reject(error);
      }
    }));

    await Promise.all(promises);
  });

  it('should return 404 when query throws an error', async () => {
    removeStub.throws();

    const { body } = await request
      .delete(`${route}/99943`)
      .expect(404);

    expect(body).to.have.keys(
      'id',
      'error',
    );
  });

  it('should return 404 when id not found', async () => {
    removeStub.returns(0);

    const { body } = await request
      .delete(`${route}/99956`)
      .expect(404);

    expect(body).to.have.keys('notFound');
  });

  it('should return 200', async () => {
    removeStub.returns(1);

    const { body } = await request
      .delete(`${route}/1`)
      .expect(200);

    expect(body).to.have.keys('removed');
  });
});

