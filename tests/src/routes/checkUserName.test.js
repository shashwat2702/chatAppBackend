const { server } = require('./../../../src/server');
const model = require('../../../models');

describe('Test for /register route', () => {
  const username = 'User@1';
  const name = 'Test User';
  const email = 'test@mail.com';
  const password = 'Password';
  beforeEach(async () => {
    await model.user.truncate();
    await model.user.registerUser(username, name, email, password);
  });
  afterAll(async () => {
    model.sequelize.close();
  });
  it('should return "UserName Already Exists" when username is already taken', async () => {
    const options = {
      method: 'GET',
      url: '/checkUserName?userName=User@1',
    };
    const response = await server.inject(options);
    expect(response.statusCode).toEqual(200);
    expect(response.result).toEqual('UserName Already Exists');
  });
  it('should return "UserName Already Exists" when username is available', async () => {
    const options = {
      method: 'GET',
      url: '/checkUserName?userName=User@11',
    };
    const response = await server.inject(options);
    expect(response.statusCode).toEqual(200);
    expect(response.result).toEqual('UserName Available');
  });
  it('should return status 404 for wrong route', async () => {
    const options = {
      method: 'GET',
      url: `/checkUsername?userName=${{ username }}`,
    };
    const response = await server.inject(options);
    expect(response.statusCode).toEqual(404);
  });
  it('should return status 500 for missing or wrong parameters', async () => {
    const options = {
      method: 'GET',
      url: '/checkUserName',
    };
    const response = await server.inject(options);
    expect(response.statusCode).toEqual(500);
  });
});
