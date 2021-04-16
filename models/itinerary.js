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
  startDate: {
    type: Date,
    required: true,
  },
  endDate:  {
    type: Date,
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },

  flights: [flightSchema],
  hotels: [],
  rentals: [],

}, {
  timestamps: true
});


module.exports = mongoose.model('Itinerary', itinerarySchema);