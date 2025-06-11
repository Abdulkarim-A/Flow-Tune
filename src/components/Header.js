import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <h1>FlowTune</h1>
          </Link>
        </div>
        
        <nav className="nav">
          <ul className="nav-list">
            <li><Link to="/" className="nav-link">Home</Link></li>
            <li><Link to="/dashboard" className="nav-link">Dashboard</Link></li>
            <li><Link to="/task-database" className="nav-link">Tasks</Link></li>
            <li><Link to="/chat-functionality" className="nav-link">Chat</Link></li>
            <li><Link to="/customer-journey" className="nav-link">Journey</Link></li>
            <li><Link to="/data-behavior" className="nav-link">Analytics</Link></li>
          </ul>
        </nav>

        <div className="auth-buttons">
          <button className="btn btn-outline">Sign In</button>
          <button className="btn btn-primary">Sign Up</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
