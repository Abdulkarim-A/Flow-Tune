import React from 'react';
import './HeroSection.css'; // Specific styles

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="container hero-content">
        <div className="hero-text">
          <h1>Harmonize Your Day, Master Your Flow.</h1>
          <p>Flow Tune helps you effortlessly manage your calendar, tasks, and productivity in one intuitive platform. Integrate with Google Calendar seamlessly.</p>
          <div className="hero-buttons">
            <button className="button button-primary">Get Started for Free</button>
            <button className="button button-secondary">Learn More</button>
          </div>
        </div>
        <div className="hero-image">
          <img src="/assets/images/hero-image.png" alt="Flow Tune Dashboard" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;