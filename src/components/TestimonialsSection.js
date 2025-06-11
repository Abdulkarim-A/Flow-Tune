import React from 'react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Product Manager",
      company: "TechCorp",
      content: "FlowTune has completely transformed how I manage my daily tasks. The AI insights are incredibly helpful.",
      avatar: "https://via.placeholder.com/60"
    },
    {
      id: 2,
      name: "Mike Chen",
      role: "Designer",
      company: "Creative Studio",
      content: "The calendar integration saved me hours every week. Now I can focus on what really matters.",
      avatar: "https://via.placeholder.com/60"
    }
  ];

  return (
    <section className="testimonials">
      <div className="container">
        <h2>What Our Users Say</h2>
        <div className="testimonials-grid">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="testimonial">
              <p>"{testimonial.content}"</p>
              <div className="author">
                <img src={testimonial.avatar} alt={testimonial.name} />
                <div>
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.role} at {testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .testimonials {
          padding: 4rem 0;
          background: white;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          text-align: center;
        }
        
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }
        
        .testimonial {
          background: #f8fafc;
          padding: 2rem;
          border-radius: 8px;
          text-align: left;
        }
        
        .author {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-top: 1.5rem;
        }
        
        .author img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
        }
        
        .author h4 {
          margin: 0;
          font-size: 1rem;
        }
        
        .author p {
          margin: 0.25rem 0 0 0;
          color: #6b7280;
          font-size: 0.875rem;
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;
