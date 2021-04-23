import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { UserContext } from '../UserContext'
import * as chatAPI from '../../services/chatroomService'
import styles from './Join.module.css'

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
            <div className={styles.joinOuter}>
                <h1>Chat with other travelers</h1>
                <div className="joinInner">
                    <div className='input' ><label id='name'>Your Name </label><input placeholder="Nickname (optional)" value={name} className="joinInput" type="text" onChange={(e)=> setName(e.target.value)}></input></div>
                    <div className='input'><label>Room Name </label><input required placeholder="Room" className="joinInput" type="text" id='roomInput' onChange={(e)=> setRoom(e.target.value)}></input></div>
                    <Link 
                    onClick={e => (!name || !room) ? e.preventDefault() : null}
                    to={`/chatroom?name=${name}&room=${room}`}
                    query={`${name}/${room}`}>
                        <button className="button" type="submit">Create Room</button>
                    </Link>
                </div>
            </div>
            <br/>
            <div>
                {rooms.length ? 
                <table>
                    <thead>
                    <tr>
              <th>Room List</th>
              <th>Created By</th>
            </tr>

                    </thead>
                    <tbody>
                    {rooms.map((roomItem, idx) => 
                        <tr>
                            <td>
                            <Link 
                                onClick={e => (!name) ? e.preventDefault() : null}
                                to={`/chatroom?name=${name}&room=${roomItem.roomName}`}
                                >
                    {roomItem.roomName}
                </Link>
                            </td>
                            <td>{roomItem.owner}</td>
                        </tr>
                    )} 
                    </tbody>
                </table>
            :
                    <p>No rooms created yet</p>
            }




            {/* {rooms.map((roomItem, idx) => 
            <div key={idx}>
                <Link 
                    onClick={e => (!name) ? e.preventDefault() : null}
                    to={`/chatroom?name=${name}&room=${roomItem.roomName}`}
                >
                    <p>{roomItem.roomName}</p>
                </Link>
                
            </div>)} */}
            
        </div>
        </main>
     );
}
 
export default Join;