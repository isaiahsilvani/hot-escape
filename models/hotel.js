const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hotelSchema = new Schema({
    name: {type:String},
    room:{type: String},
    checkInDate: {type:Number},
    checkOutDate:{type:Number},
    Price:{type: Number},
    
    }, {
      timestamps: true
    });


module.exports = mongoose.model('Hotel', hotelSchema);