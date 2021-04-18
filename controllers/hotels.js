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
  Itinerary.findById(req.body.itinID)
  .then(itinerary => {
    console.log(itinerary)
    console.log(req.body)
    itinerary.hotels.push(req.body)
    itinerary.save()
    .then(() => {
      res.json(itinerary)
    })
  })
}

function index(req,res) {

}

function show(req, res) {

}

function deleteHotel(req, res){
    Movie.findByIdAndDelete(req.params.id)
    .then(movie => {res.json(movie)})
    .catch(err => {res.json(err)})
}

function update(req, res){

}



