const unirest = require('unirest');
const Itinerary = require('../models/itinerary.js')
const options = {
  'x-rapidapi-key': process.env.FLIGHT_KEY,
  "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
  "useQueryString": true }

module.exports = {
  // create,
  searchFlights,
  searchPlace,
  addFlights,
  // show,
  deleteFlights,
  index
}

function index(req, res) {
  console.log('index function hit')
  console.log(req.params.id)
  Itinerary.findOne({owner: req.params.id})
  .then((itinerary) => {
    console.log(itinerary.flights)
    res.json(itinerary.flights)
  })
}

function addFlights(req, res) {
  Itinerary.findOne({_id: req.params.itinid, owner: req.user._id}) 
  .then(itinerary => {
    // console.log('found itinerary', itinerary)
    for (flight of req.body.flights) {
      itinerary.flights.push(flight)
    }
    itinerary.save()
    .then((itinerary) => {
      res.json(itinerary)
    })
  })
}

function deleteFlights(req, res) {
  Itinerary.findOne({_id: req.params.itinid, owner: req.user._id}) 
  .then(itinerary => {
    // console.log('found itinerary', itinerary)
    for (flight of req.body.flights) {
      // itinerary.flights.push(flight)
      const index = itinerary.flights.findIndex(f => f._id.equals(flight._id))
      itinerary.flights.splice(index, 1)
    }
    itinerary.save()
    .then((itinerary) => {
      res.json(itinerary)
    })
  })
}

function searchFlights(req, res) {
  const originCode = req.body.flightsData.originPlace.code;
  const destinationCode = req.body.flightsData.destinationPlace.code;
  const departureDate = req.body.flightsData.flightDate;

  const apiUrl = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/US/USD/en-US/${originCode}/${destinationCode}/${departureDate}`;
  
  unirest.get(apiUrl).header(options)
  .then(response => {
    // console.log(response.body)
    res.json(response.body)
  })
}

function searchPlace(req, res) {
  const q = req.body.query;
  const apiUrl = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/USD/en-US/?query=${q}`;
  
  unirest.get(apiUrl).header(options)
  .then(response => {
    // console.log(response.body)
    res.json(response.body)
  })
}