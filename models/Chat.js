const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({ 
    text: String,
    userid: String
})

const roomSchema = new Schema({
    roomName: { type: String },
    owner: {type: Schema.Types.ObjectId, ref: "User" },
    users: [{type: Schema.Types.ObjectId, ref: "User" }],
    messages: [messageSchema],
    url: {type: String}
})