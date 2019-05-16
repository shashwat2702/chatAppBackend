const { server } = require('./../../../src/server');

describe('Test for /ping route', () => {
  it('should return pong', async () => {
    const options = {
      method: 'GET',
      url: '/ping',
    };
    const response = await server.inject(options);
    expect(response.statusCode).toEqual(200);
    expect(response.result).toEqual('pong');
  });
  it('should return status 404 for wrong route', async () => {
    const options = {
      method: 'GET',
      url: '/peng',
    };
    const response = await server.inject(options);
    expect(response.statusCode).toEqual(404);
  });
});
