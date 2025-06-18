import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardPage.css'; // You'll create this CSS file

const DashboardPage = () => {
  const [stats, setStats] = useState(null);
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

    const fetchStats = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8000/api/tasks/stats/?user_id=${userId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStats(data);
        console.log('Fetched dashboard stats:', data);
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
        alert('Failed to load dashboard data. Please ensure you have a program generated.');
        setStats(null); // Clear stats on error
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [userId, navigate]);

  if (loading) {
    return <div className="loading-message">Loading your dashboard...</div>;
  }

  if (!stats) {
      return (
          <div className="dashboard-container no-data">
              <h2>Hello, {username || 'Learner'}!</h2>
              <p>No learning statistics available yet. Have you generated your learning program and completed some tasks?</p>
              <button onClick={() => navigate('/overview')} className="go-to-overview-button">
                  Go to My Learning Program
              </button>
              <p className="note">Complete tasks to see your progress here!</p>
          </div>
      );
  }

  // Calculate overall progress percentage
  const overallProgress = stats.total_tasks > 0 ? (stats.completed_tasks / stats.total_tasks) * 100 : 0;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>Welcome Back, {username || 'Learner'}! Your Learning Dashboard</h2>
        <p>Track your progress, analyze your learning habits, and see your achievements.</p>
        <button onClick={() => navigate('/overview')} className="go-to-overview-button">Go to My Learning Program</button>
      </header>

      <section className="overall-progress-section">
        <h3>Overall Learning Progress</h3>
        <div className="progress-circle-container">
            <div className="progress-circle" style={{
                background: `conic-gradient(#4CAF50 ${overallProgress}%, #e0e0e0 ${overallProgress}%)`
            }}>
                <span className="progress-text">{overallProgress.toFixed(0)}%</span>
            </div>
        </div>
        <div className="stats-summary">
            <p>Completed Tasks: <strong>{stats.completed_tasks}</strong> / {stats.total_tasks}</p>
            <p>Remaining Tasks: <strong>{stats.total_tasks - stats.completed_tasks}</strong></p>
            <p>Total Learning Goals: <strong>{stats.total_goals}</strong></p>
        </div>
      </section>

      <section className="content-type-breakdown">
        <h3>Content Type Analysis</h3>
        {stats.content_type_breakdown && Object.keys(stats.content_type_breakdown).length > 0 ? (
          <div className="breakdown-grid">
            {Object.entries(stats.content_type_breakdown).map(([type, count]) => (
              <div key={type} className="breakdown-item">
                <span className="type-name">{type.replace('_', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
                <span className="type-count">{count} Tasks</span>
              </div>
            ))}
          </div>
        ) : (
          <p>No content type data yet. Start completing tasks!</p>
        )}
      </section>

      <section className="recent-activity">
        <h3>Recent Activity</h3>
        {stats.recent_tasks && stats.recent_tasks.length > 0 ? (
          <ul className="activity-list">
            {stats.recent_tasks.map((task) => (
              <li key={task.id} className="activity-item">
                <strong>{task.title}</strong> - Marked as {task.is_completed ? 'Completed' : 'Pending'} on {new Date(task.last_modified).toLocaleDateString()}
              </li>
            ))}
          </ul>
        ) : (
          <p>No recent task activity. Complete some tasks!</p>
        )}
      </section>

      {/* Add more sections like Achievement progress or Learning style insights if data is available in `stats` */}
      {/* Example for Learning Style Insights (if your API provides it) */}
      {/* <section className="learning-style-insights">
        <h3>Learning Style Insights</h3>
        {stats.learning_style_insights ? (
            <p>{stats.learning_style_insights}</p>
        ) : (
            <p>Insights will appear after you complete more tasks.</p>
        )}
      </section> */}

    </div>
  );
};

export default DashboardPage;
