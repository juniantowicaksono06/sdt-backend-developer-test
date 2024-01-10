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
    await queryInterface.addConstraint('broadcast_message', {
      type: 'foreign key',
      name: 'FK_BROADCAST_EVENT_ID',
      fields: ['event_id'],
      references: {
        table: 'events',
        field: 'event_id',
      }
    })

    await queryInterface.addConstraint('broadcast_message', {
      type: 'foreign key',
      name: 'FK_BROADCAST_USER_ID',
      fields: ['user_id'],
      references: {
        table: 'users',
        field: 'user_id',
      }
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint('broadcast_message', 'FK_BROADCAST_EVENT_ID')
    await queryInterface.removeConstraint('broadcast_message', 'FK_BROADCAST_USER_ID')
  }
};
