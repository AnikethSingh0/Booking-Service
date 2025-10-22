const express = require("express");
const app = express();
const { PORT } = require("./config/index");
const { default: axios } = require("axios");
const bookingRoute = require('./routes/index')

const startServer = async () => {
//   let flightUrl = "http://localhost:3000/api/v1/flights/4";
//   const store = await axios.get(flightUrl);
//   console.log(store.data);

  app.use(express.json());
  app.use('/api',bookingRoute)
  app.use(express.urlencoded({ extended: true }));
  app.listen(PORT, () => {
    console.log(`${PORT} is starting`);
  });
};
startServer();
