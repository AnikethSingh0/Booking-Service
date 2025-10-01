const { Booking } = require("../models/index");

class BookingReository {
  async createBooking(data) {
    try {
      const booking = await Booking.create(data);
      return booking;
    } catch (error) {
      console.log("error is repository layer");
      throw error;
    }
  }
}

module.exports = BookingReository;
