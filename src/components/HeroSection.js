import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section style={{
      backgroundColor: '#007bff',
      color: 'white',
      padding: '4rem 2rem',
      minHeight: '70vh',
      display: 'flex',
      alignItems: 'center'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '3rem',
        alignItems: 'center'
      }}>
        <div>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            marginBottom: '1.5rem',
            lineHeight: '1.2'
          }}>
            Harmonize Your Day, Master Your Flow.
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            marginBottom: '2rem',
            opacity: '0.9',
            lineHeight: '1.6'
          }}>
            FlowTune helps you effortlessly manage your learning journey with AI-powered goals, 
            personalized content recommendations, and progress tracking in one intuitive platform.
          </p>
          <div style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => navigate('/login')}
              style={{
                padding: '1rem 2rem',
                backgroundColor: 'white',
                color: '#007bff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'transform 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              🚀 Get Started for Free
            </button>
            <button
              onClick={() => {
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                padding: '1rem 2rem',
                backgroundColor: 'transparent',
                color: 'white',
                border: '2px solid white',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = 'white';
                e.target.style.color = '#007bff';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = 'white';
              }}
            >
              📚 Learn More
            </button>
          </div>
        </div>
        
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1rem',
            maxWidth: '300px'
          }}>
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: '16px',
              padding: '1.5rem',
              textAlign: 'center',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🎯</div>
              <div style={{ fontSize: '0.9rem', opacity: '0.9' }}>Smart Goals</div>
            </div>
            
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: '16px',
              padding: '1.5rem',
              textAlign: 'center',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🤖</div>
              <div style={{ fontSize: '0.9rem', opacity: '0.9' }}>AI Assistant</div>
            </div>
            
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: '16px',
              padding: '1.5rem',
              textAlign: 'center',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📊</div>
              <div style={{ fontSize: '0.9rem', opacity: '0.9' }}>Progress Track</div>
            </div>
            
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: '16px',
              padding: '1.5rem',
              textAlign: 'center',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🏆</div>
              <div style={{ fontSize: '0.9rem', opacity: '0.9' }}>Achievements</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;