// src/pages/ChatFunctionalityPage.js

import React, { useState, useEffect, useRef } from 'react';
import ChatMessage from '../components/ChatMessage'; // Import the new ChatMessage component
import ChatInput from '../components/ChatInput';     // Import the new ChatInput component
import ChatMenu from '../components/ChatMenu';       // Import the new ChatMenu component

// Import existing CSS for the page, and ensure it can incorporate chat-specific styles
import './ChatFunctionalityPage.css'; // Make sure this file exists and is linked

const ChatFunctionalityPage = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", type: "other" },
    { id: 2, text: "Hi, I need to organize my tasks for next week.", type: "user" },
    { id: 3, text: "Great! I can help you with that. Do you want to list them out or connect to your calendar?", type: "other" },
  ]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to the latest message whenever messages state updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (text) => {
    // Add the new message to the list
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: prevMessages.length + 1, text, type: "user" },
    ]);

    // Simulate an AI response after a short delay
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: prevMessages.length + 2, text: `Acknowledged: "${text}". I'm processing your request.`, type: "other" },
      ]);
    }, 1000);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div
      className="chat-page-container"
      // Applying Figma dimensions directly for the main layout.
      // For responsiveness, these would typically be handled via CSS classes and media queries.
      style={{
        position: 'relative',
        width: '1728px',
        height: '1117px',
        overflowX: 'scroll',
        background: '#FFFFFF',
        display: 'flex', // Use flexbox for chat layout
      }}
    >
      {/* Main Chat Area */}
      <div className="chat-main-content" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ textAlign: 'center', padding: '20px', borderBottom: '1px solid #eee' }}>Flow Tune Chat</h1>

        {/* Chat Messages Display Area */}
        <div className="chat-messages-display" style={{ flexGrow: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg.text} type={msg.type} />
          ))}
          <div ref={messagesEndRef} /> {/* Element to scroll into view */}
        </div>

        {/* Chat Input Area */}
        <div className="chat-input-area" style={{ padding: '10px', borderTop: '1px solid #eee', display: 'flex', alignItems: 'center' }}>
          <button onClick={toggleMenu} style={{ background: 'none', border: 'none', fontSize: '1.5em', cursor: 'pointer', marginRight: '10px' }}>
            {/* Simple menu icon, replace with a proper icon if available (e.g., Lucide React icon) */}
            ☰
          </button>
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>

      {/* Chat Menu (slides in/out) */}
      <ChatMenu isOpen={isMenuOpen} />
    </div>
  );
};

export default ChatFunctionalityPage;
