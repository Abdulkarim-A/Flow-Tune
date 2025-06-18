import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OverviewPage.css'; // You'll create this CSS file

const OverviewPage = () => {
  const [weeklyProgram, setWeeklyProgram] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userId = localStorage.getItem('user_id');
  const username = localStorage.getItem('username');

  useEffect(() => {
    if (!userId) {
      alert('User not logged in. Redirecting to login.');
      navigate('/login');
      return;
    }

    const fetchProgram = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8000/api/tasks/by_week/?user_id=${userId}`);
        if (!response.ok) {
          if (response.status === 404) {
             // No program yet, possibly navigate back to onboarding 2 or show a message
             console.warn("No learning program found for this user. Please generate one.");
             setWeeklyProgram({}); // Clear any previous state
             alert("It looks like you don't have a learning program yet. Please complete the onboarding to generate one.");
             navigate('/onboarding-2'); // Redirect to program generation
             return;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setWeeklyProgram(data);
        console.log('Fetched weekly program:', data);
      } catch (error) {
        console.error('Failed to fetch weekly program:', error);
        alert('Failed to load your learning program. Please try again or generate a new one.');
      } finally {
        setLoading(false);
      }
    };

    fetchProgram();
  }, [userId, navigate]);

  const handleMarkComplete = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/tasks/${taskId}/complete/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ is_completed: true }), // Assuming the API expects this
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedTask = await response.json();
      console.log('Task marked complete:', updatedTask);

      // Update the local state to reflect the change
      setWeeklyProgram((prevProgram) => {
        const newProgram = { ...prevProgram };
        for (const weekKey in newProgram) {
          newProgram[weekKey] = newProgram[weekKey].map((task) =>
            task.id === taskId ? { ...task, is_completed: true } : task
          );
        }
        return newProgram;
      });
      alert('Task marked as completed!');
    } catch (error) {
      console.error('Failed to mark task complete:', error);
      alert('Failed to mark task complete. Please try again.');
    }
  };

  if (loading) {
    return <div className="loading-message">Loading your learning program...</div>;
  }

  if (Object.keys(weeklyProgram).length === 0 && !loading) {
      return (
          <div className="overview-container no-program">
              <h2>Hello, {username || 'Learner'}!</h2>
              <p>It looks like you haven't generated a learning program yet.</p>
              <button onClick={() => navigate('/onboarding-2')} className="generate-program-button">
                  Generate My 3-Week Learning Program
              </button>
              <p className="note">This will use AI to create a personalized plan based on your goals and preferences.</p>
              <button onClick={() => navigate('/dashboard')} className="view-dashboard-button">View Dashboard</button>
          </div>
      );
  }

  const calculateWeekProgress = (tasks) => {
    if (!tasks || tasks.length === 0) return 0;
    const completedTasks = tasks.filter(task => task.is_completed).length;
    return (completedTasks / tasks.length) * 100;
  };

  const renderProgram = () => {
    return Object.keys(weeklyProgram).map((weekKey) => {
      const tasks = weeklyProgram[weekKey];
      const progress = calculateWeekProgress(tasks);
      return (
        <div key={weekKey} className="week-card">
          <h3>{weekKey.replace('_', ' ').charAt(0).toUpperCase() + weekKey.replace('_', ' ').slice(1)} ({progress.toFixed(0)}% Complete)</h3>
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task.id} className={`task-item ${task.is_completed ? 'completed' : ''}`}>
                <div className="task-header">
                    <h4>{task.title}</h4>
                    <span className="content-type-tag">{task.content_type}</span>
                </div>
                <p className="task-description">{task.description}</p>
                {task.source_recommendation && <p className="source-rec">Source: <a href={task.source_recommendation} target="_blank" rel="noopener noreferrer">{task.source_recommendation}</a></p>}
                {!task.is_completed && (
                  <button onClick={() => handleMarkComplete(task.id)} className="mark-complete-button">
                    Mark as Completed
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      );
    });
  };

  return (
    <div className="overview-container">
      <header className="overview-header">
        <h2>Hello, {username || 'Learner'}! Your Personalized Learning Program</h2>
        <p>Here's your 3-week AI-generated learning journey. Mark tasks complete as you go!</p>
        <button onClick={() => navigate('/dashboard')} className="view-dashboard-button">View My Dashboard</button>
      </header>

      <section className="program-display">
        {renderProgram()}
      </section>
    </div>
  );
};

export default OverviewPage;
