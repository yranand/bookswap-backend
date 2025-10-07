"use strict";

const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface) {
    const password = await bcrypt.hash('password123', 10);
    await queryInterface.bulkInsert('users', [{
      name: 'Test User',
      email: 'test@example.com',
      password,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', { email: 'test@example.com' });
  }
};


