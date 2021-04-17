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

const hotelSchema = new Schema({
  name: { type: String },
  room: { type: String },
  checkInDate: { type: Number },
  checkOutDate: { type: Number },
  price: { type: Number },
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