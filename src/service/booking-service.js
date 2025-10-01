const { BookingRepository } = require("../repository/index");

class bookingService {
  constructor() {
    this.bookingRepository = new BookingRepository();
  }

  async createBooking(data) {
    try {
      const booking = await this.bookingRepository.createBooking(data);
      return booking;
    } catch (error) {
      console.log("there is error in service layer ");
      throw error;
    }
  }
}

module.exports = bookingService;
