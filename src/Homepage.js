// src/Homepage.js

import React from 'react';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import CallToActionSection from './components/CallToActionSection';
import TestimonialsSection from './components/TestimonialsSection';
import HowItWorksSection from './components/HowItWorksSection';

// Assuming Homepage.css handles general page layout
import './Homepage.css';

const Homepage = () => {
  return (
    <div
      className="homepage-container"
      // Applying Figma dimensions directly for the main layout.
      // For responsiveness, these would typically be handled via CSS classes and media queries.
      style={{
        position: 'relative',
        width: '1728px',
        height: '1117px',
        overflowX: 'scroll',
        background: '#FFFFFF',
      }}
    >
      {/* Hero Section: Typically the first and most prominent section */}
      <HeroSection />

      {/* Features Section: Highlights key features of Flow Tune */}
      <FeaturesSection />

      {/* How It Works Section: Explains the user journey or core process */}
      <HowItWorksSection />

      {/* Testimonials Section: Builds trust with user reviews */}
      <TestimonialsSection />

      {/* Call to Action Section: Encourages users to sign up or take next step */}
      <CallToActionSection />

      {/*
        You might also want to include a Footer component here if it's not
        part of the main App.js layout.
        <Footer />
      */}
    </div>
  );
};

export default Homepage;
