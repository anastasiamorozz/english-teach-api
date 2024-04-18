'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Words', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true
      },
      word: {
        type: Sequelize.STRING
      },
      meaning: {
        type: Sequelize.STRING
      },
      fakeMeaning: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: []
      },
      topic:{
        type: Sequelize.INTEGER,
        references:{
          model:'Topics',
          key:'id'
        }
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Words');
  }
};