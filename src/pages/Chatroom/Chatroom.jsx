import React, { useState } from 'react';
import * as chatAPI from '../../services/chatroomService'

const Chatroom = () => {

    const test = async () => {
        console.log('test function hit')
        const result = await chatAPI.test()
    }

    return ( 
        <main>
            <h3>Chatroom</h3>
            <button onClick={test} >Test</button>
        </main>
     );
}
 
export default Chatroom