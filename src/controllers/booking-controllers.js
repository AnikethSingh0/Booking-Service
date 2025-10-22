const { BookingService } = require("../service/index");
const { StatusCodes } = require("http-status-codes");

const bookingService = new BookingService(); 
const { createChannel, publishMessage } = require('../utils/messagingQueue');
const { REMINDER_BINDING_KEY } = require("../config/index");
class BookingController{

  async sendMessageToQueue(req,res){
    const channel = await createChannel();
    const data = {message:'success'};
    publishMessage(channel,REMINDER_BINDING_KEY,JSON.stringify(data)) ;
    return res.status(200).json({
      message:'Succesfully published the event',
      
    })
  }

  async createBooking(req, res)  {
  try {
    const { id, noOfSeats, userId } = req.body;

    const flight = await bookingService.createBooking({
      flightId: id,
      noOfSeats,
      userId,
    });

    return res.status(StatusCodes.OK).json({
      data: flight,
      success: true,
      error: {},
      message: "Flight fetched successfully",
    });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      message: "Failed to fetch flight",
      error: err.message,
    });
  }
};
}


module.exports = BookingController
