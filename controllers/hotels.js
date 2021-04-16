const Hotel = require('../models/hotel')

module.exports = {
  create,
  //index,
  //update,
  //delete: deleteHotel,
  //show
}

function create(req, res) {
  req.body.addedBy = req.user._id
  Hotel.create(req.body)
  .then(hotel => {res.json(hotel)})
  .catch(err => {res.json(err)})
}

