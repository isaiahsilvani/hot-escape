const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({
  originCity: { type: String, },
  originStation: { type: String, },
  destinationCity: { type: String, },
  destinationStation: { type: String, },
  airline: { type: String, },
  direct: { type: Boolean, },
  lowestPrice: { type: Number, },
  currency: { type: String, },
  flightID: { type: Number },
  flightDateTime: { type: Date }
}, {
    timestamps: true
});

const hotelSchema = new Schema({
  name: { type: String },
  room: { type: String },
  checkInDate: { type: Date },
  checkOutDate: { type: Date },
  price: { type: String },
}, {
    timestamps: true
});

const attractionSchema = new Schema({
  name:{type: String},
  location: {type:String},
  }, {
    timestamps: true
});

const itinerarySchema = new Schema({
  startDate: { type: Date, },
  endDate:  { type: Date, },
  origin: { type: String, },
  destination: { type: String, },
  owner: {type: Schema.Types.ObjectId, ref: "User" },

  flights: [flightSchema],
  hotels: [hotelSchema],
  rentals: [],
  attractions: [attractionSchema],

}, {
  timestamps: true
});


module.exports = mongoose.model('Itinerary', itinerarySchema);