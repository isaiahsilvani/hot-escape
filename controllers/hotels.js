const Itinerary = require('../models/itinerary')

module.exports = {
  create,
  update,
  delete: deleteHotel,
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

function deleteHotel(req, res){
  Itinerary.findOne({_id: req.params.itinid, owner: req.user._id})  
  .then(itinerary => {
    // console.log("found itinerary", itinerary)
    const index = itinerary.hotels.findIndex(hotel => hotel._id.equals(req.params.id))
    // console.log('found index', index)
    itinerary.hotels.splice(index, 1)
    // console.log("new hotels array", itinerary.hotels)
    itinerary.save()
    .then((itinerary) => {
      res.json(itinerary)
    })
  })
}

function update(req, res){
  Itinerary.findOne({_id: req.body.itinID, owner: req.user._id})
  .then(itinerary => {
    const index = itinerary.hotels.findIndex(hotel => hotel._id.equals(req.body.hotelId))
    itinerary.hotels[index] = req.body.hotel;
    itinerary.save()
    .then((itinerary) => {
      res.json(itinerary)
    })
  })
}




