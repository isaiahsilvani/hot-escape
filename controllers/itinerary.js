const Itinerary = require('../models/itinerary');

module.exports = {
  index,
  create,
  update,
  delete: deleteItinerary,
  show,
}

function index(req, res) {
  console.log('hiii', req.user._id)
  Itinerary.find({owner: req.user._id})
  .then((itineraries) => {
    res.json(itineraries)
  })
}

function create(req,res) {
  console.log(req.body);
  try {
    Itinerary.create(req.body.formData)
    .then(itinerary => {
      res.json({itinerary})
    })
  } catch (err) {
  res.status(400).send({'err': err.errmsg});
  }
}

function update(req,res) {

}

function deleteItinerary(req,res) {

}


function show(req,res) {
  Itinerary.findById(req.params.id)
  .then(itinerary => {
    res.json(itinerary)
  })
  .catch(err => {
    res.status(400).send({'err': err.errmsg});
  })
}