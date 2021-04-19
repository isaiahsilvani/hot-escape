const Attraction = require('../models/attraction')
const Itinerary = require('../models/itinerary')

module.exports = {
  create,
  index,
  show,
  update,
  delete: deleteAttraction
}

function create(req, res) {
  Itinerary.findById(req.body.itinID)
  .then(itinerary => {
    console.log(itinerary)
    console.log(req.body)
    itinerary.attractions.push(req.body)
    itinerary.save()
    .then((itinerary)=> {res.json(itinerary)
    })
  })
  .catch(err => {res.json(err)})
}

function index(req,res) {

}

function show(req, res) {

}

function update(req, res){

}

function deleteAttraction(req, res){
  Itinerary.findOne({_id: req.params.itinid, owner: req.user._id})  
  .then(itinerary => {
    const index = itinerary.attractions.findIndex(attraction => attraction._id.equals(req.params.id))
    itinerary.attractions.splice(index, 1)
    itinerary.save()
    .then((itinerary) => {
      res.json(itinerary)
    })
  })
}

function update(req, res){
  Itinerary.findOne({_id: req.body.itinID, owner: req.user._id})
  .then(itinerary => {
    const index = itinerary.attractions.findIndex(attraction => attraction._id.equals(req.body.attractionId))
    itinerary.attractions[index] = req.body.attraction;
    itinerary.save()
    .then((itinerary) => {
      res.json(itinerary)
    })
  })
}