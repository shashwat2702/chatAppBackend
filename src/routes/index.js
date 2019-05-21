const ping = require('./ping');
const register = require('./register');
const checkUserName = require('./checkUserName');
const login = require('./login');
const checkEmail = require('./checkEmail');

module.exports = () => [].concat(
  ping,
  register,
  checkUserName,
  login,
  checkEmail,
);
