'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Words', [{
      word: 'Picture',
      meaning: 'Картина',
      fakeMeaning: ['Пісня', 'Художник', 'Артист'],
      topic: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      word: 'Movie',
      meaning: 'Фільм',
      fakeMeaning: ['Спів', 'Гра', 'Чорний'],
      topic: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      word: 'Actor',
      meaning: 'Актор',
      fakeMeaning: ['Заєць', 'Казка', 'Фіранка'],
      topic: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Words', null, {});
  }
};
