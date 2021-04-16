const Itinerary = require('../models/itinerary');

module.exports = {
  index,
  create,
  update,
  delete: deleteItinerary,
  update,
  show,
}

function index(req, res) {

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

function update(req,res) {

}

function show(req,res) {

}