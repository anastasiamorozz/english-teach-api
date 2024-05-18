'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const topics = [];

    topics.push({
      title: "Art & Design",
      level: "Beginner",
      createdAt: new Date(),
      updatedAt: new Date()
    });

    topics.push({
      title: "TV & Cinema",
      level: "Beginner",
      createdAt: new Date(),
      updatedAt: new Date()
    });

    topics.push({
      title: "Future Is Here",
      level: "Intermediate",
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await queryInterface.bulkInsert('Topics', topics, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Topics', null, {});
  }
};
