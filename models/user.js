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
  return user;
};
