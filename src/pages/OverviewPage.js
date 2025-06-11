import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OverviewPage = () => {
  const [weeklyPrograms, setWeeklyPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('username');

  useEffect(() => {
    if (!userId) {
      navigate('/login');
      return;
    }
    loadWeeklyPrograms();
  }, [userId, navigate]);

  const loadWeeklyPrograms = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/tasks/by_week/?user_id=${userId}`);
      if (response.ok) {
        const data = await response.json();
        setWeeklyPrograms(data);
      } else {
        setError('Failed to load learning program');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const completeTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/tasks/${taskId}/complete/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Reload the programs to update the UI
        loadWeeklyPrograms();
      }
    } catch (err) {
      console.error('Error completing task:', err);
    }
  };

  const getContentTypeIcon = (contentType) => {
    const icons = {
      video: '📹',
      books: '📚',
      podcasts: '🎧',
      blogs: '📝',
      buddy: '👥'
    };
    return icons[contentType] || '📋';
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#ffc107',
      in_progress: '#17a2b8',
      completed: '#28a745',
      cancelled: '#dc3545'
    };
    return colors[status] || '#6c757d';
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#f5f5f5'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h2>Loading your learning program...</h2>
          <p>🤖 Preparing your personalized content</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f5f5f5',
      padding: '2rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h1 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>
            🎯 Your Learning Journey, {username}
          </h1>
          <p style={{ margin: 0, color: '#666', fontSize: '1.1rem' }}>
            3-week personalized program • AI-generated tasks • Track your progress
          </p>
        </div>

        {error && (
          <div style={{
            color: 'red',
            marginBottom: '2rem',
            padding: '1rem',
            backgroundColor: '#fee',
            borderRadius: '8px',
            border: '1px solid #fcc'
          }}>
            {error}
          </div>
        )}

        {/* Navigation */}
        <div style={{ 
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <button
            onClick={() => navigate('/dashboard')}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            📊 Go to Dashboard
          </button>
          
          <div style={{ color: '#666' }}>
            {weeklyPrograms.length} weeks • {weeklyPrograms.reduce((total, week) => total + week.tasks.length, 0)} total tasks
          </div>
        </div>

        {/* Weekly Programs */}
        <div style={{
          display: 'grid',
          gap: '2rem'
        }}>
          {weeklyPrograms.map((weekData, index) => {
            const week = weekData.week;
            const tasks = weekData.tasks;
            const completedTasks = tasks.filter(task => task.status === 'completed').length;
            const progressPercentage = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;

            return (
              <div key={week.id} style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                border: week.is_active ? '3px solid #007bff' : '1px solid #ddd'
              }}>
                {/* Week Header */}
                <div style={{
                  backgroundColor: week.is_active ? '#007bff' : '#6c757d',
                  color: 'white',
                  padding: '1.5rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h2 style={{ margin: '0 0 0.5rem 0' }}>
                        Week {week.week_number}: {week.title}
                        {week.is_active && <span style={{ marginLeft: '0.5rem' }}>🔥</span>}
                      </h2>
                      <p style={{ margin: 0, opacity: 0.9 }}>{week.description}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                        {completedTasks}/{tasks.length}
                      </div>
                      <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                        {Math.round(progressPercentage)}% complete
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div style={{
                    backgroundColor: 'rgba(255,255,255,0.3)',
                    borderRadius: '10px',
                    height: '8px',
                    marginTop: '1rem',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      backgroundColor: 'white',
                      height: '100%',
                      width: `${progressPercentage}%`,
                      borderRadius: '10px',
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                </div>

                {/* Tasks */}
                <div style={{ padding: '1.5rem' }}>
                  <div style={{
                    display: 'grid',
                    gap: '1rem'
                  }}>
                    {tasks.map((task, taskIndex) => (
                      <div key={task.id} style={{
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        padding: '1.5rem',
                        backgroundColor: task.status === 'completed' ? '#f8f9fa' : 'white',
                        position: 'relative'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                          <div style={{
                            fontSize: '2rem',
                            minWidth: '40px'
                          }}>
                            {getContentTypeIcon(task.content_type)}
                          </div>
                          
                          <div style={{ flex: 1 }}>
                            <h4 style={{ 
                              margin: '0 0 0.5rem 0',
                              color: task.status === 'completed' ? '#6c757d' : '#333',
                              textDecoration: task.status === 'completed' ? 'line-through' : 'none'
                            }}>
                              Task {taskIndex + 1}: {task.title}
                            </h4>
                            
                            <p style={{ 
                              margin: '0 0 1rem 0',
                              color: '#666',
                              lineHeight: '1.5'
                            }}>
                              {task.description}
                            </p>
                            
                            {task.source_url && (
                              <p style={{ 
                                margin: '0 0 1rem 0',
                                fontSize: '0.9rem',
                                color: '#888'
                              }}>
                                <strong>Source:</strong> {task.source_url}
                              </p>
                            )}
                            
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                              <span style={{
                                backgroundColor: getStatusColor(task.status),
                                color: 'white',
                                padding: '0.25rem 0.75rem',
                                borderRadius: '20px',
                                fontSize: '0.8rem',
                                fontWeight: 'bold'
                              }}>
                                {task.status.replace('_', ' ').toUpperCase()}
                              </span>
                              
                              <span style={{
                                backgroundColor: '#e9ecef',
                                color: '#6c757d',
                                padding: '0.25rem 0.75rem',
                                borderRadius: '20px',
                                fontSize: '0.8rem'
                              }}>
                                {task.content_type}
                              </span>
                            </div>
                          </div>
                          
                          <div>
                            {task.status !== 'completed' ? (
                              <button
                                onClick={() => completeTask(task.id)}
                                style={{
                                  padding: '0.5rem 1rem',
                                  backgroundColor: '#28a745',
                                  color: 'white',
                                  border: 'none',
                                  borderRadius: '4px',
                                  cursor: 'pointer',
                                  fontSize: '0.9rem'
                                }}
                              >
                                ✅ Complete
                              </button>
                            ) : (
                              <div style={{
                                padding: '0.5rem 1rem',
                                backgroundColor: '#d4edda',
                                color: '#155724',
                                borderRadius: '4px',
                                fontSize: '0.9rem',
                                fontWeight: 'bold'
                              }}>
                                ✅ Done
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {weeklyPrograms.length === 0 && !loading && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '3rem',
            textAlign: 'center',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <h2>No learning program found</h2>
            <p style={{ color: '#666', marginBottom: '2rem' }}>
              It looks like you haven't completed the onboarding process yet.
            </p>
            <button
              onClick={() => navigate('/onboarding-1')}
              style={{
                padding: '1rem 2rem',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '1.1rem',
                cursor: 'pointer'
              }}
            >
              Complete Onboarding
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OverviewPage; 