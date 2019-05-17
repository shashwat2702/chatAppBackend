const ping = require('./ping');
const register = require('./register');
const checkUserName = require('./checkUserName');

module.exports = () => [].concat(
  ping,
  register,
  checkUserName,
);
