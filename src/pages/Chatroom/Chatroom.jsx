import React, { useState, useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { UserContext } from '../../components/UserContext'
import queryString from 'query-string'
import * as messagesAPI from '../../services/messagesService'
//socketio clientside listener
import io from 'socket.io-client'
import InfoBar from '../../components/InfoBar/InfoBar'
import Input from '../../components/Input/Input'
import Messages from '../../components/Messages/Messages'

//define socket and endpoint outside of component
let socket;


const Chat = ({ props }) => {
    const user = useContext(UserContext)

    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [id, setID] = useState('')
    const ENDPOINT = 'localhost:3001'
    // Set state for setting a message and sending a message
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([]) 

    const query = useLocation()
    socket = io(ENDPOINT)
    //Everytime component loads, connect  new client (user) to server
    useEffect(() => {
        const { name, room } = queryString.parse(query.search)
        // set socket connection
        setID(user._id)
        setName(name)
        setRoom(room)
        
        // In order to send an event to everyone, Socket.IO gives us io.emit
        socket.emit('join', ({ name, room, id }), () => {
            // alert(error)
        })
        return () => {
            // emit disconnect to backend
            socket.emit('disconnect-alt')
            // clear state
            setID("")
            setName("")
            setRoom("")
            // turn socket off on unmount
            socket.off()
        }
    }, [ENDPOINT, query])

    useEffect(() => {
      socket.on('message', message => {
        console.log('message recieved from backend')
        setMessages(messages => [ ...messages, message ]);
      });
      
      socket.on("roomData", ({ users }) => {
       // setUsers(users);
      });
  }, []);

      // socket listener for setting a message data payload from server to state

      // function for sending messages
      const sendMessage = (event) => {
        event.preventDefault();
    
        if(message) {
          // store message in database
          socket = io(ENDPOINT)
          socket.emit('sendMessage', {message, id })
          console.log('send message hit ', message, id, name)
          storeMsg(message)
          setMessage('')
        }
      }

      const storeMsg = async (message) => {
        await messagesAPI.storeMsg({message, name, id, room})
      }

      return (
        <main>
          <div className="outerContainer">
            <div className="container">
              <InfoBar room={room}/>
              <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
              <Messages messages={messages} name={name}/>
            </div>
          </div>
        </main>
      )
}
 
export default Chat;