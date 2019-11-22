'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('sells', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userid: {
        type: Sequelize.INTEGER
      },
      sellid: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.DOUBLE
      },
      date: {
        type: Sequelize.DATE
      },
      cashbackpercentage: {
        type: Sequelize.INTEGER
      },
      cashbackvalue: {
        type: Sequelize.DOUBLE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('sells');
  }
};