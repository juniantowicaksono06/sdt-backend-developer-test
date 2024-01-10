'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint('user_event', {
      type: 'foreign key',
      name: 'FK_USER_EVENT_EVENT_ID',
      fields: ['event_id'],
      references: {
        table: 'events',
        field: 'event_id',
      },
      onDelete: "CASCADE"
    })

    await queryInterface.addConstraint('user_event', {
      type: 'foreign key',
      name: 'FK_USER_EVENT_USER_ID',
      fields: ['user_id'],
      references: {
        table: 'users',
        field: 'user_id',
      },
      onDelete: "CASCADE"
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint('user_event', 'FK_USER_EVENT_USER_ID')
    await queryInterface.removeConstraint('user_event', 'FK_USER_EVENT_EVENT_ID')
  }
};
