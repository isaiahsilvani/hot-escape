  
import React from 'react';
import ReactEmoji from 'react-emoji';
import styles from './Message.css'

const Message = ({ message: { text, user }, name }) => {
  let isSentByCurrentUser = false;
  console.log('compare ', user, ' to ', NamedNodeMap)
  const compareName = name

  if(user === compareName) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser
      ? (
        <span className="messageContainer flex-end">
            <span class='text'>
              <span className="messageBox">
              <p className="messageText">{ReactEmoji.emojify(text)}</p>
            </span>
          </span>
        </span>
        )
        : (
          <span className="messageContainer flex-start">
          <span className="messageBox">
          <span className="sentText ">{user}</span>
            <p className="messageText">{ReactEmoji.emojify(text)}</p>
          </span>
          
        </span>
        )
  );
}

export default Message;