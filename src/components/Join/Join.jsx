import React, { useState } from 'react';
import { Link } from 'react-router-dom'

const Join = () => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    return ( 
        <main>
            <div className="joinOuter">
                <div className="joinInner">
                    <div><input placeHolder="Name" className="joinInput" type="text" onChange></input></div>
                    <div><input placeHolder="Room" className="joinInput" type="text" onChange></input></div>
                    <Link>
                        <button className="button" type="submit">Sign In</button>
                    </Link>
                </div>
            </div>
        </main>
     );
}
 
export default Join;