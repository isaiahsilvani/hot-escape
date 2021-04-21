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

//define socket and endpoint outside of component
let socket;


const Chat = ( props ) => {
    const user = useContext(UserContext)

    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [roomData, setRoomData] = useState({})

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
        socket.emit('join', ({ name, room, id }), () => {
          console.log('join hit')
            // alert(error)
        })
        // set ID from served with socket.id for unique instances of users
        socket.emit('sendID')
        socket.on('setID', (id) => {
          setID(id)
        })

        // socket.on('message', ({text, user}) => {
        //   console.log('message recieved from server: ', text, 'from ', user)
        //      //setting a new message
        //      console.log(text, user)
        //      setMessages([...messages, {text, user}])
        // })
        // Deal with unmounting and detect when client disconnects
        return () => {
            // emit disconnect to backend
            socket.emit('disconnect-alt')
            console.log('client side socket disconnected')
            // clear state
            setName("")
            setRoom("")
            // turn socket off on unmount
            socket.off()
        }
    }, [ENDPOINT, query])

    useEffect(() => {
      socket.on('message', message => {
        console.log('message recieved on client from server: ', message)
        // Store the message in the database, and setMessages as messages from database
        setMessages(messages => [ ...messages, message ]);
      });
      // recieve room data here
      socket.on("roomData", ({ users }) => {
       // setUsers(users);
      });
      // if room didn't load on first useEffect, try again!
      if (roomData === null) {
        async function fetchData(room) {
          // You can await here
          console.log('pass room ', room, 'as argument for fetchRoomData')
          const response = await chatAPI.fetchRoomData(room);
          setRoomData(response)
          // ...
        }
        fetchData(room);
      }
  }, []);

    // fetch the room data with an API call

  

  // useEffect(() => {
  //   let roomData = fetchRoomData(room)
  //   console.log(roomData)
  // })
  
  // const fetchRoomData = async () => {
  //   const roomData = await chatAPI.fetchRoomData(room)
  //   return roomData
  // }

  // const sendRequest = async () => {
  //   if (query !== "") {
  //     const results = await flightAPI.searchPlace(query);
  //     // console.log(query, results.Places);
  //     setPlaces(results.Places)
  //   }
  // }


      // socket listener for setting a message data payload from server to state

      // function for sending messages
      const sendMessage = async (event) => {
        event.preventDefault();
    
        if(message) {
          socket = io(ENDPOINT)
          socket.emit('sendMessage', {message, id })
          // Add message to database so it can be loaded on first useEffect only
          console.log('message being sent: ', message)
          let response = await chatAPI.storeMessage({message, name, room})
          console.log(response)
          //console.log(response)
          console.log('send message hit ', message, id)
          setMessage('')
        }
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