const unirest = require('unirest');
const Flight = require('../models/flight')

module.exports = {
  // create,
  // index,
  searchFlights,
  searchPlace,
  // show,
  // delete: deleteFlight,
}

function searchFlights(req, res) {
  const originCode = req.body.flightsData.originFlight.code;
  const destinationCode = req.body.flightsData.destinationFlight.code;
  const departureDate = req.body.flightsData.flightDate;

  const options = {
    'x-rapidapi-key': process.env.FLIGHT_KEY,
    "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
    "useQueryString": true }

  const apiUrl = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/US/USD/en-US/${originCode}/${destinationCode}/${departureDate}`;
  
  unirest.get(apiUrl).header(options)
  .then(response => {
    console.log(response.body)

    res.json(response.body)
  })
}

function searchPlace(req, res) {
  const q = req.body.query;
  const options = {
    'x-rapidapi-key': process.env.FLIGHT_KEY,
    "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
    "useQueryString": true }

  const apiUrl = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/USD/en-US/?query=${q}`;
  
  unirest.get(apiUrl).header(options)
  .then(response => {
    console.log(response.body)

    res.json(response.body)
  })
}