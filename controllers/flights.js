const unirest = require('unirest');
const Flight = require('../models/flight')
const options = {
  'x-rapidapi-key': process.env.FLIGHT_KEY,
  "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
  "useQueryString": true }

module.exports = {
  // create,
  // index,
  searchFlights,
  searchPlace,
  addFlight
  // show,
  // delete: deleteFlight,
}

function addFlight(req, res) {
  console.log('add flight hit')
  // format data to match mongoose model
  formatFlightData(req, res)
  // Add to database using model
  Flight.create(req.body)
  .then(flight => {res.json(flight)})
  .catch(err => {res.json(err)})
  // Send json response

  
  console.log(req.body)
}



// originCity: {type:String},
// originStation:{type: String},
// destinationCity: {type:String},
// airline:{type:String},
// direct:{type: Boolean},
// stops: {type: Boolean},
// lowestPrice : {type: Number},
// currency: {type: String},

function searchFlights(req, res) {
  const originCode = req.body.flightsData.originPlace.code;
  const destinationCode = req.body.flightsData.destinationPlace.code;
  const departureDate = req.body.flightsData.flightDate;



  const apiUrl = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/US/USD/en-US/${originCode}/${destinationCode}/${departureDate}`;
  
  unirest.get(apiUrl).header(options)
  .then(response => {
    console.log(response.body)

    res.json(response.body)
  })
}

function searchPlace(req, res) {
  const q = req.body.query;

  const apiUrl = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/USD/en-US/?query=${q}`;
  
  unirest.get(apiUrl).header(options)
  .then(response => {
    console.log(response.body)

    res.json(response.body)
  })
}

// HELPER FUNCTIONS

function formatFlightData(req, res) {
  const flightData = req.body.flightData
  req.body.originCity = flightData.Places[1].CityName
  req.body.originStation = flightData.Places[1].Name + ' - ' + flightData.Places[1].IataCode
  req.body.destinationCity = flightData.Places[0].CityName
  req.body.destinationStation = flightData.Places[0].Name + ' - ' + flightData.Places[0].IataCode
  req.body.airline = flightData.Carriers[0].Name
  req.body.direct = flightData.Quotes[0].Direct
  req.body.stops = null
  req.body.lowestPrice = flightData.Quotes[0].MinPrice
  req.body.currency = flightData.Currencies[0].Code
  delete req.body.flightData
}