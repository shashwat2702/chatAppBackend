const model = require('./../../models');

module.exports = {
  method: 'GET',
  path: '/checkEmail',
  handler: async (req, h) => {
    const { email } = req.query;
    const result = await model.user.isEmailTaken(email);
    if (result) {
      return h.response('Email Already Exists').code(200);
    }
    return h.response('Email Available').code(200);
  },
};
