import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'
//socketio clientside listener
import io from 'socket.io-client'

//define socket and endpoint outside of component
let socket;
const ENDPOINT = 'localhost:3000'

const Chat = ({ props }) => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const query = useLocation()
    //Everytime component loads, connect  new client (user) to server
    useEffect(() => {
        const { name, room } = queryString.parse(query.search)
        // set socket connection
        socket = io(ENDPOINT)
        console.log(socket)
        console.log(name, room)
        setName(name)
        setRoom(room)
        // In order to send an event to everyone, Socket.IO gives us io.emit
        socket.emit('join', { name, room })
    }, [query]
    )


    return ( 
        <h1>Chat</h1>
     );
}
 
export default Chat;