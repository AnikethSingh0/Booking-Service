const express = require("express");
const router = express.Router();
const BookingController = require("../../controllers/booking-controllers");
const bookingController = new BookingController();

router.post("/booking", bookingController.createBooking);
router.post("/message",bookingController.sendMessageToQueue);

module.exports = router;
