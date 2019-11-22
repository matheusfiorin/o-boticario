'use strict';
module.exports = (sequelize, DataTypes) => {
  const sells = sequelize.define('sells', {
    userid: DataTypes.INTEGER,
    statusid: DataTypes.STRING,
    sellid: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    date: DataTypes.DATE,
    cashbackpercentage: DataTypes.INTEGER,
    cashbackvalue: DataTypes.DOUBLE
  }, {
    freezeTableName: true
  });
  sells.associate = function (models) {
    // associations can be defined here
  };
  return sells;
};