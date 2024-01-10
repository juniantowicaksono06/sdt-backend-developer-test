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
    queryInterface.addConstraint('users', {
      type: 'foreign key',
      name: 'FK_USERS_LOCATION_ID',
      fields: ['location_id'],
      references: {
        table: 'locations',
        field: 'location_id',
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
    queryInterface.removeConstraint('users', 'FK_USERS_LOCATION_ID')
  }
};
