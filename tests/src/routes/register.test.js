const { server } = require('./../../../src/server');
const model = require('../../../models');

describe('Test for /register route', () => {
  beforeEach(async () => {
    await model.user.truncate();
  });
  afterAll(async () => {
    model.sequelize.close();
  });
  it('should return userName when user is successfully registered', async () => {
    const options = {
      method: 'POST',
      url: '/register',
      payload: {
        userName: 'User@1',
        name: 'Test User',
        email: 'test@mail.com',
        password: 'Password',
      },
    };
    const response = await server.inject(options);
    expect(response.statusCode).toEqual(200);
    expect(response.result).toEqual(options.payload.userName);
  });
  it('should return status 404 for wrong route', async () => {
    const options = {
      method: 'POST',
      url: '/registr',
      payload: {
        userName: 'User@1',
        name: 'Test User',
        email: 'test@mail.com',
        password: 'Password',
      },
    };
    const response = await server.inject(options);
    expect(response.statusCode).toEqual(404);
  });
  it('should return status 500 for missing or wrong parameters', async () => {
    const options = {
      method: 'POST',
      url: '/register',
      payload: {
        username: 'User@1',
        name: 'Test User',
        email: 'test@mail.com',
        password: 'Password',
      },
    };
    const response = await server.inject(options);
    expect(response.statusCode).toEqual(500);
  });
});
