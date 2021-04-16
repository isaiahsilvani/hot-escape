const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tripSchema = new Schema({
    startDate: {type:Number},
    endDate:{type: Number},
    flights: {type:String},
    hotels:{type:String},
    rentals: {type: String},
    }, {
      timestamps: true
    });


module.exports = mongoose.model('Trip', tripSchema);