import React from 'react';
import AddMessage from './AddMessage';

const MessageList = ({ messages }) => (
  <div className="messagesList">
    {messages.map(message => (
      <div
        className={'message ' + (message.id < 0 ? 'optimistic' : '')}
        key={message.id}
      >
        {message.text}
      </div>
    ))}
    <AddMessage />
  </div>
);

export default MessageList;
