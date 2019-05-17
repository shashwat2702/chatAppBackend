const model = require('./../../models');

module.exports = {
  method: 'GET',
  path: '/checkUserName',
  handler: async (req, h) => {
    const { userName } = req.query;
    const result = await model.user.isUserNameTaken(userName);
    if (result) {
      return h.response('UserName Already Exists').code(200);
    }
    return h.response('UserName Available').code(200);
  },
};
