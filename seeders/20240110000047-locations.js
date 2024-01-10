'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('locations', [
    {
      location_name: "Jakarta",
      timezone_id: 20,
    },
    {
      location_name: "Surabaya",
      timezone_id: 20,
    },
    {
      location_name: "Bali",
      timezone_id: 21,
    },
    {
      location_name: "New York",
      timezone_id: 8,
    },
    {
      location_name: "Melbourne",
      timezone_id: 24,
    },
    {
      location_name: "Jayapura",
      timezone_id: 22,
    },
    {
      location_name: "Moscow",
      timezone_id: 16,
    }
   ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('locations', null, {});
  }
};
