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
   await queryInterface.bulkInsert('timezones', [
    {
      timezone_name: "UTC-12:00"
    },
    {
      timezone_name: "UTC-11:00"
    },
    {
      timezone_name: "UTC-10:00"
    },
    {
      timezone_name: "UTC-09:00"
    },
    {
      timezone_name: "UTC-08:00"
    },
    {
      timezone_name: "UTC-07:00"
    },
    {
      timezone_name: "UTC-06:00"
    },
    {
      timezone_name: "UTC-05:00"
    },
    {
      timezone_name: "UTC-04:00"
    },
    {
      timezone_name: "UTC-03:00"
    },
    {
      timezone_name: "UTC-02:00"
    },
    {
      timezone_name: "UTC-01:00"
    },

    {
      timezone_name: "UTC+00:00"
    },
    {
      timezone_name: "UTC+01:00"
    },
    {
      timezone_name: "UTC+02:00"
    },
    {
      timezone_name: "UTC+03:00"
    },
    {
      timezone_name: "UTC+04:00"
    },
    {
      timezone_name: "UTC+05:00"
    },
    {
      timezone_name: "UTC+06:00"
    },
    {
      timezone_name: "UTC+07:00"
    },
    {
      timezone_name: "UTC+08:00"
    },
    {
      timezone_name: "UTC+09:00"
    },
    {
      timezone_name: "UTC+10:00"
    },
    {
      timezone_name: "UTC+11:00"
    },
    {
      timezone_name: "UTC+12:00"
    },
    {
      timezone_name: "UTC+13:00"
    },
    {
      timezone_name: "UTC+14:00"
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
    await queryInterface.bulkDelete('timezones', null, {});
  }
};
