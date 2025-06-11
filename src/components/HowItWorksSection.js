import React from 'react';

const HowItWorksSection = () => {
  return (
    <section className="how-it-works">
      <div className="container">
        <h2>How FlowTune Works</h2>
        <p>Simple steps to optimize your workflow</p>
        
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Connect</h3>
            <p>Integrate your tools and calendars</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Analyze</h3>
            <p>AI analyzes your behavior patterns</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Optimize</h3>
            <p>Get personalized recommendations</p>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .how-it-works {
          padding: 4rem 0;
          background: #f8fafc;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          text-align: center;
        }
        
        .steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }
        
        .step {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .step-number {
          width: 50px;
          height: 50px;
          background: #3b82f6;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: bold;
          margin: 0 auto 1rem;
        }
      `}</style>
    </section>
  );
};

export default HowItWorksSection;
