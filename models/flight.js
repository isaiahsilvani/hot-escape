const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({
    originCity: {type:String},
    originStation:{type: String},
    destinationCity: {type:String},
    airline:{type:String},
    direct:{type: Boolean},
    stops: {type: Boolean},
    lowestPrice : {type: Number},
    currency: {type: String},
    flightID: {type: Number},
    }, {
      timestamps: true
    });


module.exports = mongoose.model('Flight', flightSchema);