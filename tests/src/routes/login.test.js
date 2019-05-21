const { server } = require('./../../../src/server');
const model = require('../../../models');

describe('Test for /login route', () => {
  beforeEach(async () => {
    await model.user.truncate();
    const username = 'User@1';
    const name = 'Test User';
    const email = 'test@mail.com';
    const password = 'Password';
    await model.user.registerUser(username, name, email, password);
  });
  afterAll(async () => {
    model.sequelize.close();
  });
  it('should return "Authenticated" when user credentials are correct', async () => {
    const options = {
      method: 'POST',
      url: '/login',
      payload: {
        email: 'test@mail.com',
        password: 'Password',
      },
    };
    const response = await server.inject(options);
    await expect(response.statusCode).toEqual(200);
    expect(response.result).toEqual('Authenticated');
  });
  it('should return status 401 for wrong credentials', async () => {
    const options = {
      method: 'POST',
      url: '/login',
      payload: {
        email: 'test1@mail.com',
        password: 'Password',
      },
    };
    const response = await server.inject(options);
    expect(response.statusCode).toEqual(200);
    expect(response.result).toEqual('Account Not Found');
  });
  it('should return status 500 for missing or wrong parameters', async () => {
    const options = {
      method: 'POST',
      url: '/login',
      payload: {
        password: 'Password',
      },
    };
    const response = await server.inject(options);
    expect(response.statusCode).toEqual(500);
  });
});
