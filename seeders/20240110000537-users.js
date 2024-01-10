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
    await queryInterface.bulkInsert('users', [
      {
        first_name: "Junianto",
        last_name: "Wicaksono",
        location_id: 2,
      },
      {
        first_name: "Alisa Mikhailovna",
        last_name: "Kujou",
        location_id: 7,
      },
      {
        first_name: "Nyoman",
        last_name: "Arnawan",
        location_id: 3,
      },
      {
        first_name: "Jeremy",
        last_name: null,
        location_id: 4,
      },
      {
        first_name: "John",
        last_name: "Doe",
        location_id: 4,
      },
      {
        first_name: "Ahmad",
        last_name: "Munir",
        location_id: 5,
      },
      {
        first_name: "Testing",
        last_name: "Tes",
        location_id: 1,
      },
      {
        first_name: "Coba",
        last_name: "Tes lagi",
        location_id: 6,
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
    await queryInterface.bulkDelete('users', null, {});
  }
};
