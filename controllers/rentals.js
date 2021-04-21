const Itinerary = require('../models/itinerary')

module.exports = {
  create,
  update,
  delete: deleteRental
}

function create(req, res) {
  Itinerary.findById(req.body.itinID)
  .then(itinerary => {
    console.log(itinerary)
    console.log(req.body)
    itinerary.rentals.push(req.body)
    itinerary.save()
    .then(() => {
      res.json(itinerary)
    })
  })
}

function deleteRental(req, res){
  Itinerary.findOne({_id: req.params.itinid, owner: req.user._id})  
  .then(itinerary => {
    // console.log("found itinerary", itinerary)
    const index = itinerary.rentals.findIndex(rental => rental._id.equals(req.params.id))
    // console.log('found index', index)
    itinerary.rentals.splice(index, 1)
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
    const index = itinerary.rentals.findIndex(rental => rental._id.equals(req.body.rentalId))
    itinerary.rentals[index] = req.body.rental;
    itinerary.save()
    .then((itinerary) => {
      res.json(itinerary)
    })
  })
}