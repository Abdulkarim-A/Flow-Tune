import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OnboardingPage2 = () => {
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('username');

  const contentTypes = [
    {
      id: 'video',
      title: '📹 Video Content',
      description: 'Learn through YouTube, Coursera, Udemy, and video tutorials',
      examples: 'YouTube tutorials, online courses, webinars'
    },
    {
      id: 'books',
      title: '📚 Books & eBooks',
      description: 'Traditional and digital reading materials',
      examples: 'Technical books, eBooks, guides, documentation'
    },
    {
      id: 'podcasts',
      title: '🎧 Podcasts & Audio',
      description: 'Learn while commuting or exercising',
      examples: 'Educational podcasts, audiobooks, interviews'
    },
    {
      id: 'blogs',
      title: '📝 Blogs & Articles',
      description: 'Quick reads and in-depth articles',
      examples: 'Medium articles, technical blogs, tutorials'
    },
    {
      id: 'buddy',
      title: '👥 Learning Buddy',
      description: 'Interactive learning with peers and mentors',
      examples: 'Study groups, mentorship, pair programming'
    }
  ];

  useEffect(() => {
    if (!userId) {
      navigate('/login');
    }
  }, [userId, navigate]);

  const togglePreference = (contentType) => {
    if (selectedPreferences.includes(contentType)) {
      setSelectedPreferences(selectedPreferences.filter(type => type !== contentType));
    } else {
      setSelectedPreferences([...selectedPreferences, contentType]);
    }
  };

  const handleContinue = async () => {
    if (selectedPreferences.length === 0) {
      setError('Please select at least one learning preference');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Save learning preferences
      const response = await fetch('http://localhost:8000/api/learning-preferences/set_preferences/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          preferred_content_types: selectedPreferences
        }),
      });

      if (response.ok) {
        // Generate AI learning program
        const programResponse = await fetch('http://localhost:8000/api/weekly-programs/generate_program/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: userId
          }),
        });

        if (programResponse.ok) {
          navigate('/overview');
        } else {
          setError('Failed to generate learning program');
        }
      } else {
        setError('Failed to save preferences');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f5f5f5',
      padding: '2rem'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          backgroundColor: '#28a745',
          color: 'white',
          padding: '1.5rem',
          textAlign: 'center'
        }}>
          <h1>How Do You Like to Learn?</h1>
          <p>Select your preferred learning content types (choose multiple)</p>
        </div>

        <div style={{ padding: '2rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            {contentTypes.map((type) => (
              <div
                key={type.id}
                onClick={() => togglePreference(type.id)}
                style={{
                  border: selectedPreferences.includes(type.id) 
                    ? '3px solid #007bff' 
                    : '2px solid #ddd',
                  borderRadius: '8px',
                  padding: '1.5rem',
                  cursor: 'pointer',
                  backgroundColor: selectedPreferences.includes(type.id) 
                    ? '#f0f8ff' 
                    : 'white',
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }}
              >
                {selectedPreferences.includes(type.id) && (
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px'
                  }}>
                    ✓
                  </div>
                )}
                
                <h3 style={{ 
                  margin: '0 0 0.5rem 0',
                  color: selectedPreferences.includes(type.id) ? '#007bff' : '#333'
                }}>
                  {type.title}
                </h3>
                
                <p style={{ 
                  margin: '0 0 1rem 0',
                  color: '#666',
                  fontSize: '0.95rem'
                }}>
                  {type.description}
                </p>
                
                <div style={{
                  fontSize: '0.85rem',
                  color: '#888',
                  fontStyle: 'italic'
                }}>
                  Examples: {type.examples}
                </div>
              </div>
            ))}
          </div>

          {/* Selected Preferences Summary */}
          {selectedPreferences.length > 0 && (
            <div style={{
              backgroundColor: '#f8f9fa',
              border: '1px solid #dee2e6',
              borderRadius: '4px',
              padding: '1rem',
              marginBottom: '2rem'
            }}>
              <h3>Your Selected Preferences:</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {selectedPreferences.map((pref) => {
                  const type = contentTypes.find(t => t.id === pref);
                  return (
                    <span
                      key={pref}
                      style={{
                        backgroundColor: '#007bff',
                        color: 'white',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '20px',
                        fontSize: '0.9rem'
                      }}
                    >
                      {type.title}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {error && (
            <div style={{
              color: 'red',
              marginBottom: '1rem',
              padding: '0.5rem',
              backgroundColor: '#fee',
              borderRadius: '4px',
              border: '1px solid #fcc'
            }}>
              {error}
            </div>
          )}

          {/* Navigation */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <button
              onClick={() => navigate('/onboarding-1')}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '1rem',
                cursor: 'pointer'
              }}
            >
              ← Back
            </button>

            <div style={{ textAlign: 'center' }}>
              <p style={{ margin: '0 0 1rem 0', color: '#666' }}>
                Step 2 of 2 - Almost done!
              </p>
              <button
                onClick={handleContinue}
                disabled={loading || selectedPreferences.length === 0}
                style={{
                  padding: '1rem 2rem',
                  backgroundColor: loading || selectedPreferences.length === 0 ? '#ccc' : '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '1.1rem',
                  cursor: loading || selectedPreferences.length === 0 ? 'not-allowed' : 'pointer'
                }}
              >
                {loading ? 'Generating Your Program...' : '🚀 Create My Learning Program'}
              </button>
            </div>
          </div>

          {loading && (
            <div style={{
              textAlign: 'center',
              marginTop: '1rem',
              padding: '1rem',
              backgroundColor: '#e3f2fd',
              borderRadius: '4px'
            }}>
              <p style={{ margin: 0, color: '#1976d2' }}>
                🤖 Our AI is creating a personalized 3-week learning program just for you...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage2; 