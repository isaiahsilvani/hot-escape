const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({ 
    text: String,
    userName: String
})

const userSchema = new Schema({
    name: String,
    id: String
})

const roomSchema = new Schema({
    roomName: { type: String },
    owner: { type: String},
    users: [userSchema],
    messages: [messageSchema]
})

module.exports = mongoose.model('Room', roomSchema);