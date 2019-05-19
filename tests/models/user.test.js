const model = require('../../models');

describe('All Functions related to users table', () => {
  afterAll(async () => {
    model.sequelize.close();
  });
  describe('registerUser ()', () => {
    const username = 'User@1';
    const name = 'Test User';
    const email = 'test@mail.com';
    const password = 'Password';
    beforeEach(async () => {
      await model.user.truncate();
    });
    it('should insert a new row containing details of user', async () => {
      expect(await model.user.count()).toEqual(0);
      await model.user.registerUser(username, name, email, password);
      expect(await model.user.count()).toEqual(1);
    });
    it('should insert a new row and findAll should return the same record', async () => {
      await model.user.registerUser(username, name, email, password);
      await model.user.findAll({ where: { username } }).then((result) => {
        expect(result[0].dataValues.name).toEqual(name);
      });
    });
    it('should not insert a new row if any value is null or missing', async () => {
      try {
        await model.user.registerUser(username, null, email, password);
      } catch (e) {
        expect(e).toBeDefined();
      }
    });
  });

  describe('isUserNameTaken ()', () => {
    const username = 'User@1';
    const name = 'Test User';
    const email = 'test@mail.com';
    const password = 'Password';
    beforeEach(async () => {
      await model.user.truncate();
      await model.user.registerUser(username, name, email, password);
    });
    it('should return username if that username already exists in DB', async () => {
      const result = await model.user.isUserNameTaken(username);
      expect(result.username).toEqual(username);
    });
    it('should return null when username does not already exists in DB', async () => {
      const result = await model.user.isUserNameTaken(`${username}121`);
      expect(result).toEqual(null);
    });
  });

  describe('checkLogin ()', () => {
    const username = 'User@1';
    const name = 'Test User';
    const email = 'test@mail.com';
    const password = 'Password';
    beforeEach(async () => {
      await model.user.truncate();
    });
    it('should return user details if user already exists', async () => {
      await model.user.registerUser(username, name, email, password);
      const result = await model.user.checkLogin(email, password);
      expect(result.username).toEqual(username);
    });
    it('should return null when user does not exists', async () => {
      await model.user.registerUser(username, name, email, password);
      const result = await model.user.checkLogin(`${email}2`, password);
      expect(result).toEqual(null);
    });
  });
});
