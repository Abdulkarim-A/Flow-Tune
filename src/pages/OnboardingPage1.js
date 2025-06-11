import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OnboardingPage1 = () => {
  const [formData, setFormData] = useState({
    occupation: '',
    age: '',
    learningGoalInput: ''
  });
  const [chatMessages, setChatMessages] = useState([]);
  const [suggestedGoals, setSuggestedGoals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('username');

  useEffect(() => {
    if (!userId) {
      navigate('/login');
    }
  }, [userId, navigate]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleGetAISuggestion = async () => {
    if (!formData.learningGoalInput.trim()) {
      setError('Please enter a learning goal first');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8000/api/learning-goals/suggest_goal/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          user_input: formData.learningGoalInput
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const newGoal = {
          id: data.id,
          original: data.original_input,
          suggested: data.ai_suggested_goal
        };
        setSuggestedGoals([...suggestedGoals, newGoal]);
        
        // Add to chat display
        setChatMessages([
          ...chatMessages,
          { type: 'user', content: formData.learningGoalInput },
          { type: 'ai', content: data.ai_suggested_goal }
        ]);
        
        setFormData({ ...formData, learningGoalInput: '' });
      } else {
        setError(data.error || 'Failed to get AI suggestion');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const acceptGoal = async (goalId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/learning-goals/${goalId}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ is_accepted: true }),
      });

      if (response.ok) {
        setSuggestedGoals(suggestedGoals.map(goal => 
          goal.id === goalId ? { ...goal, accepted: true } : goal
        ));
      }
    } catch (err) {
      console.error('Error accepting goal:', err);
    }
  };

  const handleContinue = async () => {
    if (!formData.occupation || !formData.age) {
      setError('Please fill in your occupation and age');
      return;
    }

    if (suggestedGoals.filter(goal => goal.accepted).length === 0) {
      setError('Please accept at least one learning goal');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`http://localhost:8000/api/users/${userId}/complete_onboarding/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          occupation: formData.occupation,
          age: parseInt(formData.age)
        }),
      });

      if (response.ok) {
        navigate('/onboarding-2');
      } else {
        setError('Failed to save user data');
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
          backgroundColor: '#007bff',
          color: 'white',
          padding: '1.5rem',
          textAlign: 'center'
        }}>
          <h1>Welcome to FlowTune, {username}!</h1>
          <p>Let's set up your learning profile</p>
        </div>

        <div style={{ padding: '2rem' }}>
          {/* User Details Section */}
          <section style={{ marginBottom: '2rem' }}>
            <h2>Tell us about yourself</h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '1rem',
              marginTop: '1rem'
            }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  Occupation:
                </label>
                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleInputChange}
                  placeholder="e.g., Software Developer, Designer, Manager"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '1rem',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  Age:
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  placeholder="e.g., 28"
                  min="16"
                  max="100"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '1rem',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>
          </section>

          {/* Learning Goals Section */}
          <section style={{ marginBottom: '2rem' }}>
            <h2>🤖 AI Learning Goal Assistant</h2>
            <p style={{ color: '#666', marginBottom: '1rem' }}>
              Describe what you'd like to learn and our AI will help refine it into a SMART goal.
            </p>

            <div style={{ marginBottom: '1rem' }}>
              <textarea
                name="learningGoalInput"
                value={formData.learningGoalInput}
                onChange={handleInputChange}
                placeholder="e.g., I want to learn Python programming, improve my design skills, understand machine learning..."
                rows="3"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '1rem',
                  boxSizing: 'border-box',
                  resize: 'vertical'
                }}
              />
            </div>

            <button
              onClick={handleGetAISuggestion}
              disabled={loading || !formData.learningGoalInput.trim()}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: loading ? '#ccc' : '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '1rem',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Getting AI Suggestion...' : '✨ Get AI Suggestion'}
            </button>
          </section>

          {/* Chat Messages */}
          {chatMessages.length > 0 && (
            <section style={{ marginBottom: '2rem' }}>
              <h3>💬 AI Conversation</h3>
              <div style={{
                border: '1px solid #ddd',
                borderRadius: '4px',
                padding: '1rem',
                maxHeight: '300px',
                overflowY: 'auto',
                backgroundColor: '#fafafa'
              }}>
                {chatMessages.map((message, index) => (
                  <div key={index} style={{
                    marginBottom: '0.5rem',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    backgroundColor: message.type === 'user' ? '#e3f2fd' : '#f1f8e9'
                  }}>
                    <strong>{message.type === 'user' ? 'You:' : '🤖 AI:'}</strong>
                    <p style={{ margin: '0.25rem 0 0 0' }}>{message.content}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Suggested Goals */}
          {suggestedGoals.length > 0 && (
            <section style={{ marginBottom: '2rem' }}>
              <h3>📋 Your Learning Goals</h3>
              {suggestedGoals.map((goal, index) => (
                <div key={goal.id} style={{
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  padding: '1rem',
                  marginBottom: '1rem',
                  backgroundColor: goal.accepted ? '#d4edda' : '#fff3cd'
                }}>
                  <h4>Goal {index + 1}:</h4>
                  <p style={{ margin: '0.5rem 0', fontStyle: 'italic' }}>
                    <strong>Your input:</strong> "{goal.original}"
                  </p>
                  <p style={{ margin: '0.5rem 0' }}>
                    <strong>AI Suggestion:</strong> {goal.suggested}
                  </p>
                  {!goal.accepted && (
                    <button
                      onClick={() => acceptGoal(goal.id)}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      ✅ Accept this goal
                    </button>
                  )}
                  {goal.accepted && (
                    <span style={{ color: '#155724', fontWeight: 'bold' }}>
                      ✅ Accepted
                    </span>
                  )}
                </div>
              ))}
            </section>
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

          {/* Continue Button */}
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={handleContinue}
              disabled={loading}
              style={{
                padding: '1rem 2rem',
                backgroundColor: loading ? '#ccc' : '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '1.1rem',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              Continue to Learning Preferences →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage1; 