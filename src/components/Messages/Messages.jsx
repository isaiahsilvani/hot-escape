import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom'
import Message from '../Message/Message'


const Messages = ({ messages, name }) => {
    console.log('from message component', messages, name)
    return ( 
        <>
            {messages.map((message, idx) => 
            <div key={idx}>
                <Message message={message} name={name}/>
            </div>)}
        </>
     );
}
 
export default Messages;