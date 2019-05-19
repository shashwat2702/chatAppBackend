module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emailAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  user.registerUser = (inputUserName, inputName, inputEmail, inputPassword) => user.create({
    username: inputUserName,
    name: inputName,
    emailAddress: inputEmail,
    password: inputPassword,
  }).then(response => response);
  user.isUserNameTaken = inputUserName => user.findOne({ where: { username: inputUserName } })
    .then(response => response);
  user.checkLogin = (inputEmail, inputPassword) => user.findOne({
    where:
  { emailAddress: inputEmail, password: inputPassword },
  }).then(response => response);
  return user;
};
