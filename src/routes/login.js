const model = require('./../../models');

module.exports = {
  method: 'POST',
  path: '/login',
  handler: async (req, h) => {
    const {
      email, password,
    } = req.payload;
    const loginStatus = await model.user.checkLogin(email, password);
    if (loginStatus && loginStatus.emailAddress === email) {
      return h.response({ authentication: 'Authenticated', userName: loginStatus.username }).code(200);
    }
    return h.response({ authentication: 'Account Not Found', userName: '' }).code(200);
  },
};
