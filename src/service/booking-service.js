const { FLIGHT_PATH } = require("../config/index");
const { BookingRepository } = require("../repository/index");
const axios = require("axios");

class bookingService {
  constructor() {
    this.bookingRepository = new BookingRepository();
  }

  async createBooking(data) {
    try {
      const { flightId, noOfSeats, userId } = data; // added userId destructuring
      const flightUrl = `${FLIGHT_PATH}/api/v1/flights/${flightId}`;

      const store = await axios.get(flightUrl);
      const flightData = store.data.data;

      if (!flightData) {
        throw new Error("Flight not found"); // null check
      }

      if (noOfSeats > flightData.totalSeats) {
        throw {
          error:
            "The number of seats you are trying to book is greater than available",
        };
      }

      const bookingAmount = noOfSeats * flightData.price;

      const bookingPayload = {
        flightId,
        userId,
        noOfSeats,
        bookingAmount,
        status: "Booked",
        bookedSeat:noOfSeats
      };

      // Update flight seats
      await axios.patch(flightUrl, {
        totalSeats: flightData.totalSeats - noOfSeats,
      });

      // Create booking in DB
      const booking = await this.bookingRepository.createBooking(
        bookingPayload
      );
      return booking;
    } catch (error) {
      console.log("There is error in service layer:", error.message || error);
      throw error;
    }
  }
}

module.exports = bookingService;
