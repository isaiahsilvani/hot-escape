const Attraction = require('../models/attraction')

module.exports = {
  create,
  //index,
  //show,
  //update
  //delete: deleteAttraction
}

function create(req, res) {
  req.body.addedBy = req.user._id
  Attraction.create(req.body)
  .then(attraction => {res.json(attraction)})
  .catch(err => {res.json(err)})
}