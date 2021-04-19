// modify socketio server
const express = require('express');
const socketio = require('socket.io')
const http = require('http')
const app = express()
const server = http.createServer(app)
const io = socketio(server)

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

const cors = require('cors')


app.use(cors());
app.use(logger('dev'));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'build')));

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/flights', flightRouter);
app.use('/api/itinerary', itineraryRouter);
app.use('/api/hotels', hotelsRouter)
app.use('/api/attractions', attractionsRouter)

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3001;

const {addUser, removeUser, getUser, getUsersInRoom} = require('./users')
//IO connection must be below io.on
io.on('connection', (socket) => {
  //Listening for join emit from client side (See ChatRoom.jsx)
  socket.on('join', ({name, room}) => {
    console.log('we have a new connection!!')
    console.log(name, room)
    const { error, user } = addUser({ id: socket.id, name, room })

    socket.emit('message', { user: 'admit', text: `${user.name}, welcome to the room ${user.room}`})
    //broadcast sends an emit to everyone BUT the client socket
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined` })

    socket.join(user.room)
    console.log(name, room)
    //imediately trigger response after emit. Error handling
  })

  socket.on('sendMessage', (message, callback) => {
    // get User by unique socket.id
    const user = getUser(socket.id);
    // 
    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });

  //We are managing this specific socket that just connected, disconnect special function
  socket.on('disconnect-alt', () => {
    console.log('User has left!!')
  })
})

app.use(chatRouter)

// IO server listener
server.listen(port, () => console.log(`Socket.IO server has started listening on port ${port}`))