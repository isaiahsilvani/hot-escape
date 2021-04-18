const Hotel = require('../models/hotel')
const Itinerary = require('../models/itinerary')

module.exports = {
  create,
  index,
  update,
  delete: deleteHotel,
  show
}

function create(req, res) {
  Itinerary.find({_id:req.body.itinID, owner:req.user._id})
  .then(itinerary => {
    console.log(itinerary)
    console.log(req.body)
    itinerary.hotels.push(req.body)
    itinerary.save()
    console.log(itinerary)
    .then(itinerary => res.json(itinerary))
  })
  .catch(err => {res.json(err)})
}

function index(req,res) {

}

function show(req, res) {

}

function deleteHotel(req, res){

}

function update(req, res){

}



