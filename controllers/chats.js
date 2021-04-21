const Room = require('../models/Room')

module.exports = {
    index,
    createRoom,
    storeMessage
}
// get the room based on the room name
function index(req, res) {
    console.log('chat index controller function hit', req.params.room)
    Room.findOne({roomName: req.params.room})
    .then(room => {
        console.log('found the room', room)
        res.status(200).json(room)
    })
    .catch(err => {
        res.status(400).send({'err': err.errmsg})
    })
}

function storeMessage(req, res) {
    console.log('store message hit controller functoin', req.body)
    Room.findOne({roomName: req.body.room})
    .then(room => {
        console.log(room)
        room.messages.push({text: req.body.message, user: req.body.name})
        room.save()
        .then(() => {
            res.json(room)
        })
    })
}
// function show(req,res) {
//     Itinerary.findById(req.params.id)
//     .then(itinerary => {
//       res.json(itinerary)
//     })
//     .catch(err => {
//       res.status(400).send({'err': err.errmsg});
//     })
//   }

function createRoom(req, res) {
    var query = {},
    update = { expire: new Date() },
    options = { upsert: true, new: true, setDefaultsOnInsert: true };

// Check if the document exists. If it does, do nothing but send 200 status. Else, create
    Room.findOne({roomName: req.body.room},function(err, room){
        console.log(room, req.body.room)
         if (room) {
             console.log('room already exists')
         } else {
             console.log('room does not exist, create a room!')
             const data = { roomName: req.body.room, owner: req.body.name}
             Room.create(data)
             .then(room => {
                 res.status('200')
             })
         }
    });
  
    // do something with the document
};

// Helper Functions
