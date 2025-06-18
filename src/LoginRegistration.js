import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginRegistration.css'; // You'll create this CSS file

const LoginRegistration = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/simple-login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Login/Registration successful:', data);
      // Store user_id or other relevant data if needed (e.g., in localStorage)
      localStorage.setItem('user_id', data.user_id);
      localStorage.setItem('username', username);

      if (data.onboarding_complete) {
        navigate('/overview'); // Or dashboard if that's the primary post-login
      } else {
        navigate('/onboarding-1');
      }
    } catch (error) {
      console.error('Login/Registration failed:', error);
      alert('Login/Registration failed. Please try again.');
    }
  };

  return (
    <div className="login-registration-container">
      <div className="login-box">
        <h2>Welcome to FlowTune!</h2>
        <p>Enter a username to get started or continue your learning journey.</p>
        <p className="note-text">No password required for a quick start in this development environment.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g., learn-guru"
              required
            />
          </div>
          <button type="submit" className="login-button">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginRegistration;
