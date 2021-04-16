const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({
  origin: { type: String, },
  originCode: { type: String, },
  destination: { type: String, },
  destinationCode: { type: String, },
  airline: { type: String, },
  direct: { type: Boolean, },
  lowestPrice: { type: Number, },
  currency: { type: String, },
}, {
    timestamps: true
});

const itinerarySchema = new Schema({
  startDate: { type: Date, },
  endDate:  { type: Date, },
  origin: { type: String, },
  destination: { type: String, },

  flights: [flightSchema],
  hotels: [],
  rentals: [],
  attractions: [],

}, {
  timestamps: true
});


module.exports = mongoose.model('Itinerary', itinerarySchema);