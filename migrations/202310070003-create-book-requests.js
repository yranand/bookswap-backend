"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('book_requests', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      bookId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'books', key: 'id' },
        onDelete: 'CASCADE'
      },
      requesterId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE'
      },
      status: { type: Sequelize.ENUM('pending', 'accepted', 'declined'), defaultValue: 'pending' },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('book_requests');
  }
};


