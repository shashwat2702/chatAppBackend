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
      return h.response('Authenticated').code(200);
    }
    return h.response('Account Not Found').code(200);
  },
};
