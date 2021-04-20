import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom'
import Message from '../Message/Message'
import './Messages.css'


const Messages = ({ messages, name }) => {
    console.log('from message component', messages, name)
    return ( 
        <ScrollToBottom className='messages'>
            {messages.map((message, idx) => 
            <div key={idx}>
                <Message message={message} name={name}/>
            </div>)}
        </ScrollToBottom>
     );
}
 
export default Messages;