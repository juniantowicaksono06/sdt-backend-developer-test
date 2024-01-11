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
        email: "juniantowicaksono22@gmail.com",
        location_id: 2,
      },
      {
        first_name: "Alisa Mikhailovna",
        last_name: "Kujou",
        email: "anonim1@mail.com",
        location_id: 7,
      },
      {
        first_name: "Nyoman",
        last_name: "Arnawan",
        email: "anonim2@mail.com",
        location_id: 3,
      },
      {
        first_name: "Jeremy",
        last_name: null,
        email: "anonim3@mail.com",
        location_id: 4,
      },
      {
        first_name: "John",
        last_name: "Doe",
        email: "anonim4@mail.com",
        location_id: 4,
      },
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
