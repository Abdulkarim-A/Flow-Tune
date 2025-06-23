// src/components/ChatMenu.js
import React from 'react';
import './ChatMenu.css';

const ChatMenu = ({ isOpen }) => {
  return (
    <div className={`chat-menu ${isOpen ? 'open' : ''}`}>
      <h3>Chat Options</h3>
      <ul>
        <li>Attach File</li>
        <li>Voice Note</li>
        <li>Settings</li>
        {/* Add more menu items */}
      </ul>
    </div>
  );
};

export default ChatMenu;
