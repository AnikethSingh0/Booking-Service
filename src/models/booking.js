'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      
    }
  }
  Booking.init({
    flightId: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    userId:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type:DataTypes.ENUM,
      allowNull:false,
      values:['inprocess','Booked','Cancelled']
    }
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};