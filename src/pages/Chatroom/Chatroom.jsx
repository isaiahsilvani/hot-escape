import React, { useState, useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { UserContext } from '../../components/UserContext'
import queryString from 'query-string'
//socketio clientside listener
import io from 'socket.io-client'
import InfoBar from '../../components/InfoBar/InfoBar'
import Input from '../../components/Input/Input'
import Messages from '../../components/Messages/Messages'
import * as chatAPI from '../../services/chatroomService'
import './Chatroom.css'

//define socket and endpoint outside of component
let socket;


const Chat = ( props ) => {
    const user = useContext(UserContext)

    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [roomData, setRoomData] = useState({})

    const ENDPOINT = 'https://hot-escapes.herokuapp.com/'
    // Set state for setting a message and sending a message
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([]) 

    const query = useLocation()
    socket = io(ENDPOINT)
    //Everytime component loads, connect  new client (user) to server
    useEffect(() => {
        const { name, room } = queryString.parse(query.search)
        // set socket connection
        setName(name)
        setRoom(room)
        // fetch roomData from database
        async function fetchData(room) {
          // You can await here
          console.log('pass room ', room, 'as argument for fetchRoomData')
          const response = await chatAPI.fetchRoomData(room);
          setRoomData(response)
          if (response) {
            setMessages(response.messages)
          }
          // ...g lo
        }
        fetchData(room);
        // In order to send an event to everyone, Socket.IO gives us io.emit
        socket.emit('join', ({ name, room }), () => {
          console.log('join hit')
            // alert(error)
        })

        return () => {
            // emit disconnect to backend
            socket.emit('disconnect-alt', ({name}))
            console.log('client side socket disconnected')
            // clear state
            setName("")
            setRoom("")
            // turn socket off on unmount
            socket.off()
        }
    }, [ENDPOINT, query])

    
      socket.on('message', message => {
        console.log('message recieved on client from server: ', message)
        // Store the message in the database, and setMessages as messages from database
        setMessages(messages => [ ...messages, message ]);
      });


      // socket listener for setting a message data payload from server to state

      // function for sending messages
      const sendMessage = async (event) => {
        event.preventDefault();
    
        if(message) {
          socket = io(ENDPOINT)
          socket.emit('sendMessage', {message, name, room })
          // Add message to database so it can be loaded on first useEffect only
          console.log('message being sent: ', message)
          let response = await chatAPI.storeMessage({message, name, room})
          console.log(response)
          //console.log(response)
          console.log('send message hit ', message, name)
          setMessage('')
        }
      }

      // catch the roomData null error with useEffect. If roomData = null, it hasn't been created yet.
      useEffect(() => {
        setTimeout(function() {
          console.log('set timeout yayyy')
          if (roomData === null) {
            console.log('oh no, the room data is null!')
            const handleCreateRoom = async () => {
              // If the Room does not already exist in database, create it. If it already exists, do nothing
              console.log('handle create room hit')
              const data = {name, room}
              const results = await chatAPI.createRoom(data);
              setRoomData(results)
            }
            handleCreateRoom()
          }
        }, 2000);

      
        
    }, [roomData])
      

      return (
        <main id='chatroom'>
          <div className="outerContainer">
            <div className="container">
              <InfoBar room={room}/>
              <Messages messages={messages} name={name}/>
              <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
            </div>
          </div>
        </main>
      )
}
 
export default Chat;