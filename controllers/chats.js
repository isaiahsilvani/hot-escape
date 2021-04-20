const Room = require('../models/Room')

module.exports = {
    index,
    createRoom
}

function index(req, res) {
    console.log('chat index controller function hit')
    res.send('server is up and running')
}

function createRoom(req, res) {
    console.log('create room function hit')
    console.log(req.body)
    var query = {},
    update = { expire: new Date() },
    options = { upsert: true, new: true, setDefaultsOnInsert: true };

// Check if the document exists. If it does, do nothing but send 200 status. Else, create

    console.log(req.body.room)
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
