import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OnboardingPage1.css'; // You'll create this CSS file

const OnboardingPage1 = () => {
  const [occupation, setOccupation] = useState('');
  const [age, setAge] = useState('');
  const [learningInterest, setLearningInterest] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [loadingAI, setLoadingAI] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem('user_id'); // Get user ID from local storage

  const handleSaveProfile = async () => {
    if (!userId) {
      alert('User not logged in. Please go back to login.');
      navigate('/login');
      return;
    }
    try {
      const response = await fetch(`http://localhost:8000/api/users/${userId}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ occupation, age: parseInt(age) }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log('User profile updated successfully.');
      // Do not navigate yet, wait for AI goal setting
    } catch (error) {
      console.error('Failed to update user profile:', error);
      alert('Failed to save profile. Please try again.');
    }
  };

  const handleSuggestGoal = async () => {
    if (!userId || !learningInterest) {
      alert('Please enter your learning interests.');
      return;
    }
    setLoadingAI(true);
    try {
      // First, save profile details before suggesting goal
      await handleSaveProfile();

      const response = await fetch('http://localhost:8000/api/learning-goals/suggest_goal/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId, user_input: learningInterest }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setAiSuggestions(data.suggestions || []); // Assuming suggestions key
      console.log('AI Goal Suggestions:', data);

      // Save chat message
      await fetch('http://localhost:8000/api/chat-messages/chat/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, message: learningInterest, is_user_message: true }),
      });
      await fetch('http://localhost:8000/api/chat-messages/chat/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, message: data.suggestions.join('\n'), is_user_message: false }),
      });


    } catch (error) {
      console.error('Failed to get AI suggestions:', error);
      alert('Failed to get AI suggestions. Please try again.');
      setAiSuggestions([{ goal_description: "Failed to load suggestions. Example: Learn Python basics for data analysis." }]);
    } finally {
      setLoadingAI(false);
    }
  };

  const handleAcceptGoal = async (goalDescription) => {
    try {
      const response = await fetch('http://localhost:8000/api/learning-goals/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: userId, goal_description: goalDescription, is_active: true }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      alert('Goal accepted!');
      navigate('/onboarding-2'); // Move to next onboarding step
    } catch (error) {
      console.error('Failed to accept goal:', error);
      alert('Failed to accept goal. Please try again.');
    }
  };

  return (
    <div className="onboarding-container">
      <div className="onboarding-box">
        <h2>Step 1: Tell Us About Yourself & Your Goals</h2>
        <p className="instruction">Help FlowTune personalize your learning journey by providing some basic information and your initial learning interests.</p>

        <section className="profile-setup">
          <h3>1. Your Profile</h3>
          <div className="form-group">
            <label htmlFor="occupation">Occupation:</label>
            <input
              type="text"
              id="occupation"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              placeholder="e.g., Software Developer, Student"
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="e.g., 25"
            />
          </div>
          <button onClick={handleSaveProfile} className="onboarding-button save-profile-button">Save Profile</button>
        </section>

        <section className="ai-goal-assistant">
          <h3>2. AI Learning Goal Assistant</h3>
          <p className="instruction">Describe what you want to learn in natural language, and our AI will suggest SMART goals for you.</p>
          <div className="form-group">
            <label htmlFor="learningInterest">What do you want to learn?</label>
            <textarea
              id="learningInterest"
              value={learningInterest}
              onChange={(e) => setLearningInterest(e.target.value)}
              placeholder="e.g., I want to learn web development to build interactive websites."
              rows="4"
            ></textarea>
          </div>
          <button onClick={handleSuggestGoal} className="onboarding-button ai-suggest-button" disabled={loadingAI}>
            {loadingAI ? 'Generating...' : 'Suggest Goals with AI'}
          </button>

          {aiSuggestions.length > 0 && (
            <div className="ai-suggestions">
              <h4>AI Suggested SMART Goals:</h4>
              <p className="instruction">Review the suggestions. You can accept one or refine your input.</p>
              <ul>
                {aiSuggestions.map((goal, index) => (
                  <li key={index}>
                    <p>{goal.goal_description || goal}</p> {/* Handle both object and string */}
                    <button onClick={() => handleAcceptGoal(goal.goal_description || goal)} className="accept-button">Accept This Goal</button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
        <button onClick={() => navigate('/onboarding-2')} className="onboarding-button skip-button">Skip for now & Go to Step 2</button>
      </div>
    </div>
  );
};

export default OnboardingPage1;
