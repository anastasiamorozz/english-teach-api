'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('UserWords', [{
      userId: 2,
      words: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: 3,
      words: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserWords', null, {});
  }
};
