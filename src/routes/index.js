const ping = require('./ping');
const register = require('./register');

module.exports = () => [].concat(
  ping,
  register,
);
