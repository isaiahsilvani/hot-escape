import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { UserContext } from '../UserContext'
import * as chatAPI from '../../services/chatroomService'

const Join = () => {
    const user = useContext(UserContext)
    const [name, setName] = useState(user.name)
    const [room, setRoom] = useState('')
    const [rooms, setRooms] = useState([])

      useEffect(() => {
        // recieve room data here
        // if room didn't load on first useEffect, try again!
        
          async function fetchData(room) {
            // You can await here
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
                        <button className="button" type="submit">Enter Room</button>
                    </Link>
                </div>
            </div>
            <div>
                {/*///git push <remotename> <commit SHA>:<remotebranchname></remotebranchname>*/}
            {rooms.map((roomItem, idx) => 
            <div key={idx}>
                <Link 
                    onClick={e => (!name) ? e.preventDefault() : null}
                    to={`/chatroom?name=${name}&room=${roomItem.roomName}`}
                >
                    <p>Room: {roomItem.roomName}</p>
                </Link>
                <p>Created By: {roomItem.owner}</p>
            </div>)}
            
        </div>
        </main>
     );
}
 
export default Join;