const model = require('../../models');

describe('registerUser ()', () => {
  beforeEach(async () => {
    await model.user.truncate();
  });
  afterAll(async () => {
    model.sequelize.close();
  });
  it('should insert a new row containing details of user', async () => {
    expect(await model.user.count()).toEqual(0);
    await model.user.registerUser('User@1', 'Test User', 'test@mail.com', 'Password');
    expect(await model.user.count()).toEqual(1);
  });
  it('should insert a new row and findAll should return the same record', async () => {
    const username = 'User@1';
    const name = 'Test User';
    const email = 'test@mail.com';
    const password = 'Password';
    await model.user.registerUser(username, name, email, password);
    await model.user.findAll({ where: { username } }).then((result) => {
      expect(result[0].dataValues.name).toEqual(name);
    });
  });
  it('should not insert a new row if any value is null or missing', async () => {
    try {
      await model.user.registerUser('User@1', null, 'test@mail.com', 'Password');
    } catch (e) {
      expect(e).toBeDefined();
    }
  });
});
