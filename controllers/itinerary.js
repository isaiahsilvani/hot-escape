const Itinerary = require('../models/itinerary');

module.exports = {
  index,
  create,
  update,
  delete: deleteItinerary,
  show,
}

function index(req, res) {
  try {
    Itinerary.find({owner: req.user._id})
    .then((itineraries) => {
      res.json(itineraries)
    })
  } catch (error) {
    res.status(400).send({'err': err.errmsg});
  }
}

function create(req,res) {
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
  try {
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
    })
  } catch (err) {
    res.status(400).send({'err': err.errmsg});
  }
}

function deleteItinerary(req,res) {
  try {
    Itinerary.findByIdAndDelete(req.params.id)
    .then(itinerary => {
      res.json(itinerary)
    })
    .catch(err => {
      res.json(err.message)
    })
  } catch (err) {
    res.status(400).send({'err': err.errmsg});
  }
}


function show(req,res) {
  Itinerary.findOne({_id: req.params.id, owner: req.user._id})
  .then(itinerary => {
    res.json(itinerary)
  })
  .catch(err => {
    res.status(400).send({'err': err.errmsg});
  })
}