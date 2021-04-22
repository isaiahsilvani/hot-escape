// modify socketio server
const express = require('express');
const socketio = require('socket.io')
const http = require('http')
const app = express()
const httpServer = http.createServer(app)
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const path = require('path');
const logger = require('morgan');
// socket code


require('dotenv').config();
require('./config/database');

const userRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const flightRouter = require('./routes/flights');
const itineraryRouter = require('./routes/itinerary');
const hotelsRouter = require('./routes/hotels');
const attractionsRouter = require('./routes/attractions')
const chatRouter = require('./routes/chatroom')
const rentalRouter = require('./routes/rentals')

const cors = require('cors')


app.use(cors());
app.use(logger('dev'));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'build')));

app.use('/chatroom', chatRouter)

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/flights', flightRouter);
app.use('/api/itinerary', itineraryRouter);
app.use('/api/hotels', hotelsRouter)
app.use('/api/attractions', attractionsRouter)
app.use('/api/rentals', rentalRouter)



app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3001;

const {addUser, removeUser, getUser, getUsersInRoom} = require('./users')
//IO connection must be below io.on
io.on('connection', (socket) => {
  //Listening for join emit from client side (See ChatRoom.jsx)
  socket.on('join', ({ name, room }, callback) => {
    console.log('join backend listner: ', name, room)
    const { error, user } = addUser({ name, room });
    console.log(user)
    console.log('user: ', user)
    // set socketID in state

    if(error) return callback(error);

    socket.join(user.room);
    socket.emit('message', ({ user: 'admin', text: `${user.name}, welcome to room ${user.room}.`}));

    socket.broadcast.to(user.room).emit('message', ({ user: 'admin', text: `${user.name} has joined!` }));

    callback();
  });


  socket.on('sendMessage', ({ message, name, room}) => {
    console.log('send message hit', name)

    // this is failing
    io.to(room).emit('message', ({ user: name, text: message}))
    // io.to(user.room).emit('message', { user: user.name, text: message });
  });

  //We are managing this specific socket that just connected, disconnect special function
  socket.on('disconnect-alt', ({name}) => {
    console.log('User has left!!')
    const user = getUser(name)
    removeUser(user)
  })
})

// IO server listener
httpServer.listen(port, () => console.log(`Socket.IO server has started listening on port ${port}`))