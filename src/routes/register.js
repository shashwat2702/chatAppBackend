const model = require('./../../models');

module.exports = {
  method: 'POST',
  path: '/register',
  handler: async (req, h) => {
    const {
      userName, name, email, password,
    } = req.payload;
    const registerStatus = await model.user.registerUser(userName, name, email, password);
    if (registerStatus && registerStatus.username === userName) {
      return h.response(registerStatus.username).code(200);
    }
    return h.response('Sorry Account Registration Failed').code(202);
  },
};
