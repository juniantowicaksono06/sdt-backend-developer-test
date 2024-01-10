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
    queryInterface.addConstraint('locations', {
      type: 'foreign key',
      name: 'FK_LOCATIONS_TIMEZONE_ID',
      fields: ['timezone_id'],
      references: {
        table: 'timezones',
        field: 'timezone_id',
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
    queryInterface.removeConstraint('locations', 'FK_LOCATIONS_TIMEZONE_ID')
  }
};
