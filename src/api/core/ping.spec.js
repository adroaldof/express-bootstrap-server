import { expect, request } from '../../spec-helper';

describe('system check', () => {
  it('should return system ok object message', async () => {
    const { body } = await request
      .get('/api/ping')
      .expect(200);

    expect(body).to.have.keys(
      'answer',
      'now',
      'ok',
    );
  });

  it('should return not implemented to unknown route', async () => {
    const { body } = await request
      .get('/api/unknown')
      .expect(501);

    expect(body).to.have.keys(
      'now',
      'path',
      'status',
    );
  });
});
