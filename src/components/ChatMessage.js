// src/components/ChatMessage.js
import React from 'react';
import './ChatMessage.css';

const ChatMessage = ({ message, type }) => {
  return (
    <div className={`chat-message ${type}`}>
      <p>{message}</p>
    </div>
  );
};

export default ChatMessage;
