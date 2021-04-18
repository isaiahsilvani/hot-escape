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

}