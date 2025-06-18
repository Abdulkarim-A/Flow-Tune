import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OnboardingPage2.css'; // You'll create this CSS file

const OnboardingPage2 = () => {
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [loadingProgram, setLoadingProgram] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem('user_id'); // Get user ID from local storage

  const contentTypes = [
    { id: 'video', name: 'Video', icon: 'fas fa-video' },
    { id: 'books', name: 'Books', icon: 'fas fa-book' },
    { id: 'podcasts', name: 'Podcasts', icon: 'fas fa-microphone-alt' },
    { id: 'blogs', name: 'Blogs', icon: 'fas fa-blog' },
    { id: 'learning_buddy', name: 'Learning Buddy', icon: 'fas fa-users' },
  ];

  const handlePreferenceToggle = (typeId) => {
    setSelectedPreferences((prev) =>
      prev.includes(typeId) ? prev.filter((id) => id !== typeId) : [...prev, typeId]
    );
  };

  const handleGenerateProgram = async () => {
    if (!userId) {
      alert('User not logged in. Please go back to login.');
      navigate('/login');
      return;
    }
    if (selectedPreferences.length === 0) {
      alert('Please select at least one learning preference.');
      return;
    }

    setLoadingProgram(true);
    try {
      // First, save preferences
      const prefResponse = await fetch('http://localhost:8000/api/learning-preferences/set_preferences/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId, preferences: selectedPreferences }),
      });

      if (!prefResponse.ok) {
        throw new Error(`HTTP error! status: ${prefResponse.status}`);
      }
      console.log('Learning preferences saved.');

      // Then, generate program
      const programResponse = await fetch('http://localhost:8000/api/weekly-programs/generate_program/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId }),
      });

      if (!programResponse.ok) {
        throw new Error(`HTTP error! status: ${programResponse.status}`);
      }
      console.log('Learning program generated successfully.');

      // Mark onboarding complete
      const onboardingCompleteResponse = await fetch(`http://localhost:8000/api/users/${userId}/complete_onboarding/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!onboardingCompleteResponse.ok) {
        throw new Error(`HTTP error! status: ${onboardingCompleteResponse.status}`);
      }
      console.log('Onboarding marked as complete.');

      navigate('/overview'); // Navigate to overview page after program generation
    } catch (error) {
      console.error('Failed to generate program or set preferences:', error);
      alert('Failed to generate program. Please ensure your goal is set and try again.');
    } finally {
      setLoadingProgram(false);
    }
  };

  return (
    <div className="onboarding-container">
      <div className="onboarding-box">
        <h2>Step 2: Your Learning Preferences & Program</h2>
        <p className="instruction">Choose how you prefer to learn. This will help our AI generate a program tailored to your style.</p>

        <section className="learning-preferences">
          <h3>1. Choose Your Preferred Content Types</h3>
          <p className="instruction">Select all that apply. Our AI will prioritize these resources.</p>
          <div className="preference-grid">
            {contentTypes.map((type) => (
              <div
                key={type.id}
                className={`preference-card ${selectedPreferences.includes(type.id) ? 'selected' : ''}`}
                onClick={() => handlePreferenceToggle(type.id)}
              >
                <i className={type.icon}></i> {/* Placeholder for icons */}
                <span>{type.name}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="program-generation">
          <h3>2. Generate Your Personalized 3-Week Program</h3>
          <p className="instruction">Click below to let our AI create a structured learning plan based on your goal and preferences.</p>
          <button onClick={handleGenerateProgram} className="onboarding-button generate-program-button" disabled={loadingProgram}>
            {loadingProgram ? 'Generating Program...' : 'Generate My Learning Program'}
          </button>
        </section>
        <button onClick={() => navigate('/overview')} className="onboarding-button skip-button">Skip Program & Go to Overview</button>
      </div>
    </div>
  );
};

export default OnboardingPage2;
