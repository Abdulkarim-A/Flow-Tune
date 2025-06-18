import React from 'react';
import './Homepage.css'; // You'll create this CSS file next

const Homepage = () => {
  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <h1>FlowTune - Your AI-Powered Learning Journey</h1>
        <p>Create personalized learning paths with intelligent goal setting, content recommendations, and progress tracking.</p>
        <button onClick={() => window.location.href = '/login'} className="get-started-button">
          Get Started for Free
        </button>
      </header>

      <section className="features-section">
        <h2>Unlock Your Learning Potential</h2>
        <div className="feature-grid">
          <div className="feature-item">
            <i className="fas fa-bullseye"></i> {/* Example icon, you'll need to link Font Awesome */}
            <h3>Intelligent Goal Setting</h3>
            <p>Define clear, actionable SMART goals with AI assistance.</p>
          </div>
          <div className="feature-item">
            <i className="fas fa-book-open"></i>
            <h3>Personalized Content</h3>
            <p>Receive tailored recommendations for videos, books, podcasts, and more.</p>
          </div>
          <div className="feature-item">
            <i className="fas fa-chart-line"></i>
            <h3>Effortless Progress Tracking</h3>
            <p>Monitor your learning journey with intuitive dashboards and statistics.</p>
          </div>
        </div>
      </section>

      <footer className="homepage-footer">
        <p>&copy; 2025 FlowTune. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Homepage;
