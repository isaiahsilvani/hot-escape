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
    Itinerary.create(req.body)
    .then(itinerary => {
      res.json(itinerary)
    })
  } catch (err) {
  res.status(400).send({'err': err.errmsg});
  }
}

function update(req,res) {
  console.log("request", req.body)
  Itinerary.findOne({_id: req.body.itinID, owner: req.user._id})
  .then(itinerary => {
    itinerary.startDate = req.body.startDate;
    itinerary.endDate = req.body.endDate;
    itinerary.origin = req.body.origin;
    itinerary.destination = req.body.destination;
    itinerary.imageSrc = req.body.imageSrc;
    itinerary.save()
    .then(itinerary => {
      res.json(itinerary)
    })
    .catch(err => {
      res.json(err.message)
    })
  })
}

function deleteItinerary(req,res) {
  Itinerary.findByIdAndDelete(req.params.id)
  .then(itinerary => {
    res.json(itinerary)
  })
  .catch(err => {
    res.json(err.message)
  })
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