import React from 'react';

const CallToActionSection = () => {
  return (
    <section className="cta">
      <div className="container">
        <h2>Ready to Optimize Your Workflow?</h2>
        <p>Join thousands of professionals who have transformed their productivity with FlowTune.</p>
        <div className="cta-buttons">
          <button className="btn btn-primary">Start Free Trial</button>
          <button className="btn btn-outline">Schedule Demo</button>
        </div>
      </div>
      
      <style jsx>{`
        .cta {
          padding: 4rem 0;
          background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
          color: white;
          text-align: center;
        }
        
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 2rem;
        }
        
        .cta h2 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        
        .cta p {
          font-size: 1.25rem;
          margin-bottom: 2rem;
          opacity: 0.9;
        }
        
        .cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        .btn {
          padding: 0.875rem 2rem;
          border: none;
          border-radius: 6px;
          font-size: 1.1rem;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          font-weight: 500;
        }
        
        .btn-primary {
          background: white;
          color: #3b82f6;
        }
        
        .btn-outline {
          background: transparent;
          color: white;
          border: 2px solid white;
        }
        
        .btn:hover {
          transform: translateY(-2px);
          transition: transform 0.2s;
        }
      `}</style>
    </section>
  );
};

export default CallToActionSection;
