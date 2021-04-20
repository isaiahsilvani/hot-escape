const Room = require('../models/Room')

module.exports = {
    storeMsg
}

function storeMsg(req, res) {
    console.log('store message hit')
    console.log(req.body)
}

// function deleteAttraction(req, res){
//     Itinerary.findOne({_id: req.params.itinid, owner: req.user._id})  
//     .then(itinerary => {
//       const index = itinerary.attractions.findIndex(attraction => attraction._id.equals(req.params.id))
//       itinerary.attractions.splice(index, 1)
//       itinerary.save()
//       .then((itinerary) => {
//         res.json(itinerary)
//       })
//     })
//   }

// {
//     name: 'Johny',
//     room: 'Grape Room',
//     message: 'send a message pllease'
//   }