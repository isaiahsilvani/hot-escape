import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom'
import Message from '../Message/Message'
import './Messages.css'


const Messages = ({ messages, name, }) => {
    return ( 
        <div>
            {messages.map((message, idx) => 
            <div key={idx}>
                <Message message={message} name={name}/>
            </div>)}
        </div>
     );
}
 
export default Messages;