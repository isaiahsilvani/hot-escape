import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'
//socketio clientside listener
import io from 'socket.io-client'

//define socket and endpoint outside of component
let socket;


const Chat = ({ props }) => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [id, setID] = useState('')
    const ENDPOINT = 'localhost:3000'
    // Set state for setting a message and sending a message
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([]) 

    const query = useLocation()
    //Everytime component loads, connect  new client (user) to server
    useEffect(() => {
        const { name, room } = queryString.parse(query.search)
        // set socket connection
        socket = io(ENDPOINT)
        console.log(socket)
        console.log(name, room)
        socket.on('setID', (id) => {
          console.log('set ID on listener active on clientside')
          setID(id)
        })
        setName(name)
        setRoom(room)
        // In order to send an event to everyone, Socket.IO gives us io.emit
        socket.emit('join', ({ name, room }), () => {
            // alert(error)
        })
        // Deal with unmounting and detect when client disconnects
        return () => {
            // emit disconnect to backend
            socket.emit('disconnect-alt')
            // turn socket off on unmount
            socket.off()
        }
    }, [ENDPOINT, query]
    )

    // set socket.id in state since it's always changing on backend
    useEffect(() => {
      
    })

    // socket listener for sending a message
    useEffect(() => {
      console.log('listening for messages...')
        socket.on('message', (message) => {
            //setting a new message
            setMessages([...messages], message)
        })
    }, [messages])

      // function for sending messages
      const sendMessage = (event) => {
        event.preventDefault();
    
        if(message) {
          console.log('input message: ', message)
          console.log(id)
          socket = io(ENDPOINT)
          socket.emit('sendMessage', { message, id }, () => setMessage(''));
        }
      }

    console.log(message, messages)

      return (
        <div className="outerContainer">
          <div className="container">
              <input
                value={message} 
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null}
            />
          </div>
        </div>
      )
}
 
export default Chat;