// src/components/Header.js (Example)
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/chat">Chat</Link>
        <Link to="/calendar-sync">Calendar</Link>
        <Link to="/tasks">Tasks</Link>
        {/* Add link to the new Contact Page */}
        <Link to="/contact">Contact</Link>
        <Link to="/login">Login</Link>
      </nav>
    </header>
  );
};

export default Header;
