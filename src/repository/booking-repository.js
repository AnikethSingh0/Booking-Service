const { Booking } = require("../models/index");

class BookingRepository {
  async createBooking(data) {
    try {
      if(data==null){
        throw {error:"send some data motherfucker"}
      }
      const booking = await Booking.create(data);
      return booking;
    } catch (error) {
      console.log("Error in repository layer:", error.message);
      throw error;
    }
  }
}

module.exports = BookingRepository;
