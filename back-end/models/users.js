'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    fullname: DataTypes.STRING,
    cpf: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    freezeTableName: true
  });
  users.associate = function (models) {
    // associations can be defined here
  };
  return users;
};