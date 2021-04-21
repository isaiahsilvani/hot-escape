import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { UserContext } from '../UserContext'
import * as chatAPI from '../../services/chatroomService'

const Join = () => {
    const user = useContext(UserContext)
    const [name, setName] = useState(user.name)
    const [room, setRoom] = useState('')
    const [rooms, setRooms] = useState([])

    const handleCreateRoom = async () => {
        // If the Room does not already exist in database, create it. If it already exists, do nothing
        console.log('handle create room hit')
        const data = {name, room}
          const results = await chatAPI.createRoom(data); 
          // console.log(query, results.Places);
          
      }

      useEffect(() => {
        // recieve room data here
        // if room didn't load on first useEffect, try again!
        
          async function fetchData(room) {
            // You can await here
            console.log('pass room ', room, 'as argument for fetchRoomData')
            const response = await chatAPI.getRooms(room);
            setRooms(response)
            // ...
          }
          fetchData(room);
    }, []);

    return ( 
        <main>
            <div className="joinOuter">
                <h3>Chat with other travelers</h3>
                <div className="joinInner">
                    <div><input placeHolder="Nickname (optional)" value={name} className="joinInput" type="text" onChange={(e)=> setName(e.target.value)}></input></div>
                    <div><input required placeHolder="Room" className="joinInput" type="text" onChange={(e)=> setRoom(e.target.value)}></input></div>
                    <Link 
                    onClick={e => (!name || !room) ? e.preventDefault() : null}
                    to={`/chatroom?name=${name}&room=${room}`}
                    query={`${name}/${room}`}>
                        <button className="button" type="submit" onClick={handleCreateRoom}>Enter Room</button>
                    </Link>
                </div>
            </div>
            <div>
            {rooms.map((room, idx) => 
            <div key={idx}>
                <p>Room: {room.roomName}</p>
                <p>Created By: {room.owner}</p>
            </div>)}
            
        </div>
        </main>
     );
}
 
export default Join;