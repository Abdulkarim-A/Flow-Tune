import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>FlowTune</h3>
            <p>Streamline your workflow and boost productivity.</p>
          </div>
          
          <div className="footer-section">
            <h4>Product</h4>
            <ul>
              <li><a href="/features">Features</a></li>
              <li><a href="/pricing">Pricing</a></li>
              <li><a href="/integrations">Integrations</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li><a href="/about">About</a></li>
              <li><a href="/careers">Careers</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Resources</h4>
            <ul>
              <li><a href="/docs">Documentation</a></li>
              <li><a href="/help">Help Center</a></li>
              <li><a href="/blog">Blog</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 FlowTune. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
