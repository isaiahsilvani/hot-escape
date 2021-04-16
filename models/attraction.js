const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attractionSchema = new Schema({
    name:{type: String},
    location: {type:String},
    }, {
      timestamps: true
    });


module.exports = mongoose.model('Attraction', attractionSchema);