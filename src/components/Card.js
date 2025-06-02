// src/components/Card.js
import React from 'react';
import './Card.css'; // You can create a general Card.css or use inline for now

const Card = ({ children, className = '', ...props }) => {
  return (
    <div className={`card ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card;