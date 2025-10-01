'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'bookings',
      'noOfSeats',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      }
    )
    await queryInterface.addColumn(
      'bookingsk',
      'totalCost',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0 
      }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Booking','noOfSeats');
    await queryInterface.removeColumn('Booking','totalCost');
  }
};
