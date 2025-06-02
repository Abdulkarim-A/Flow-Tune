import React from 'react';
import './FeaturesSection.css'; // Specific styles

const FeaturesSection = () => {
  const features = [
    {
      icon: '/assets/icons/calendar-icon.svg',
      title: 'Smart Calendar Sync',
      description: 'Connect effortlessly with Google Calendar to keep all your events in one place.',
    },
    {
      icon: '/assets/icons/task-icon.svg', // Assuming you'll have more icons
      title: 'Intuitive Task Management',
      description: 'Prioritize and track your tasks with ease, linking them to your schedule.',
    },
    {
      icon: '/assets/icons/analytics-icon.svg',
      title: 'Productivity Insights',
      description: 'Gain valuable insights into your time usage and identify areas for improvement.',
    },
  ];

  return (
    <section className="features-section" id="features">
      <div className="container">
        <h2>Features Designed for Your Productivity</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <img src={feature.icon} alt={feature.title} className="feature-icon" />
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;