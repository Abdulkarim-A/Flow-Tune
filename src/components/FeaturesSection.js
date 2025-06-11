import React from 'react';

const FeaturesSection = () => {
  const features = [
    {
      icon: '🤖',
      title: 'AI-Powered Learning Goals',
      description: 'Let our AI assistant help you create SMART learning goals tailored to your profession and interests.',
    },
    {
      icon: '📅',
      title: 'Personalized 3-Week Programs',
      description: 'Get custom learning programs with 5 tasks per week, designed around your preferred content types.',
    },
    {
      icon: '📊',
      title: 'Progress Tracking & Analytics',
      description: 'Monitor your learning progress with detailed analytics and insights into your learning patterns.',
    },
    {
      icon: '🎯',
      title: 'Content Type Optimization',
      description: 'Choose from videos, books, podcasts, blogs, or learning buddies - we adapt to your style.',
    },
    {
      icon: '💬',
      title: 'Interactive AI Chat',
      description: 'Get instant help and guidance from our AI assistant throughout your learning journey.',
    },
    {
      icon: '🏆',
      title: 'Achievement System',
      description: 'Stay motivated with achievements and progress milestones as you complete your learning goals.',
    },
  ];

  return (
    <section style={{
      backgroundColor: '#f8f9fa',
      padding: '4rem 2rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 2.5rem)',
          marginBottom: '1rem',
          color: '#333'
        }}>
          Features Designed for Your Learning Success
        </h2>
        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.2rem)',
          color: '#666',
          marginBottom: '3rem',
          maxWidth: '600px',
          margin: '0 auto 3rem auto'
        }}>
          Discover powerful tools that adapt to your learning style and help you achieve your goals faster.
        </p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          textAlign: 'left'
        }}>
          {features.map((feature, index) => (
            <div key={index} style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '2rem',
              boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.07)';
            }}>
              <div style={{
                fontSize: '3rem',
                marginBottom: '1rem',
                display: 'block'
              }}>
                {feature.icon}
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                marginBottom: '1rem',
                color: '#333',
                fontWeight: 'bold'
              }}>
                {feature.title}
              </h3>
              <p style={{
                color: '#666',
                lineHeight: '1.6',
                margin: 0
              }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;