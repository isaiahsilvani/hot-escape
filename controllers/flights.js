const unirest = require('unirest');
const Itinerary = require('../models/itinerary.js')
const options = {
  'x-rapidapi-key': process.env.FLIGHT_KEY,
  "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
  "useQueryString": true }

module.exports = {
  searchFlights,
  searchPlace,
  addFlights,
  deleteFlights
}

function addFlights(req, res) {
  try {
    Itinerary.findOne({_id: req.params.itinid, owner: req.user._id}) 
    .then(itinerary => {
      for (flight of req.body.flights) {
        itinerary.flights.push(flight)
      }
      itinerary.save()
      .then((itinerary) => {
        res.json(itinerary)
      })
    })
  } catch (error) {
    res.status(400).send({'err': err.errmsg});
  }
}

function deleteFlights(req, res) {
  try {
    Itinerary.findOne({_id: req.params.itinid, owner: req.user._id}) 
    .then(itinerary => {
      for (flight of req.body.flights) {
        const index = itinerary.flights.findIndex(f => f._id.equals(flight._id))
        itinerary.flights.splice(index, 1)
      }
      itinerary.save()
      .then((itinerary) => {
        res.json(itinerary)
      })
    })
  } catch (error) {
    res.status(400).send({'err': err.errmsg});
  }
}

function searchFlights(req, res) {
  const originCode = req.body.flightsData.originPlace.code;
  const destinationCode = req.body.flightsData.destinationPlace.code;
  const departureDate = req.body.flightsData.flightDate;

  const apiUrl = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/US/USD/en-US/${originCode}/${destinationCode}/${departureDate}`;
  
  try {
    unirest.get(apiUrl).header(options)
    .then(response => {
      res.json(response.body)
    })
  } catch (error) {
    res.status(400).send({'err': err.errmsg});
  }
}

function searchPlace(req, res) {
  const q = req.params.q;
  const apiUrl = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/USD/en-US/?query=${q}`;
  
  try {
    unirest.get(apiUrl).header(options)
    .then(response => {
      res.json(response.body)
    })
  } catch (error) {
    res.status(400).send({'err': err.errmsg});
  }
}