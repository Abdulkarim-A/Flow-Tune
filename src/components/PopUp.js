// src/components/PopUp.js
import React from 'react';
import './PopUp.css'; // Create this CSS file

const PopUp = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <div className="popup-header">
          {title && <h2>{title}</h2>}
          <button className="popup-close-button" onClick={onClose}>&times;</button>
        </div>
        <div className="popup-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PopUp;
