import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SimpleDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [recentTasks, setRecentTasks] = useState([]);
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
    loadDashboardData();
  }, [userId, navigate]);

  const loadDashboardData = async () => {
    try {
      // Load task statistics
      const statsResponse = await fetch(`http://localhost:8000/api/tasks/stats/?user_id=${userId}`);
      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData);
      }

      // Load recent tasks
      const tasksResponse = await fetch(`http://localhost:8000/api/tasks/?user_id=${userId}&ordering=-created_at`);
      if (tasksResponse.ok) {
        const tasksData = await tasksResponse.json();
        setRecentTasks(tasksData.results?.slice(0, 10) || tasksData.slice(0, 10) || []);
      }
    } catch (err) {
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
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
          <h2>Loading dashboard...</h2>
          <p>📊 Preparing your progress data</p>
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
            📊 Learning Dashboard
          </h1>
          <p style={{ margin: 0, color: '#666', fontSize: '1.1rem' }}>
            Welcome back, {username}! Here's your progress overview.
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
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => navigate('/overview')}
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
            🎯 View Learning Program
          </button>
          
          <button
            onClick={() => navigate('/')}
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
            🏠 Home
          </button>
        </div>

        {/* Statistics Cards */}
        {stats && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '1.5rem',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📈</div>
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>Total Tasks</h3>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#007bff' }}>
                {stats.total_tasks}
              </div>
            </div>

            <div style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '1.5rem',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>✅</div>
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>Completed</h3>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#28a745' }}>
                {stats.completed}
              </div>
            </div>

            <div style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '1.5rem',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>⏳</div>
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>In Progress</h3>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#17a2b8' }}>
                {stats.in_progress}
              </div>
            </div>

            <div style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '1.5rem',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📋</div>
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>Pending</h3>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ffc107' }}>
                {stats.pending}
              </div>
            </div>
          </div>
        )}

        {/* Progress Overview */}
        {stats && stats.total_tasks > 0 && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '2rem',
            marginBottom: '2rem',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ margin: '0 0 1.5rem 0' }}>📊 Overall Progress</h2>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <div style={{
                flex: 1,
                backgroundColor: '#e9ecef',
                borderRadius: '10px',
                height: '20px',
                overflow: 'hidden'
              }}>
                <div style={{
                  backgroundColor: '#28a745',
                  height: '100%',
                  width: `${(stats.completed / stats.total_tasks) * 100}%`,
                  borderRadius: '10px',
                  transition: 'width 0.3s ease'
                }} />
              </div>
              <div style={{ fontWeight: 'bold', minWidth: '60px' }}>
                {Math.round((stats.completed / stats.total_tasks) * 100)}%
              </div>
            </div>
            
            <p style={{ margin: 0, color: '#666' }}>
              You've completed {stats.completed} out of {stats.total_tasks} tasks. Keep going! 🚀
            </p>
          </div>
        )}

        {/* Content Type Breakdown */}
        {stats && stats.completed_by_content_type && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '2rem',
            marginBottom: '2rem',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ margin: '0 0 1.5rem 0' }}>🎯 Learning Style Analysis</h2>
            <p style={{ margin: '0 0 1.5rem 0', color: '#666' }}>
              Tasks completed by content type:
            </p>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem'
            }}>
              {Object.entries(stats.completed_by_content_type).map(([type, count]) => (
                <div key={type} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '1rem',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px'
                }}>
                  <div style={{ fontSize: '1.5rem' }}>
                    {getContentTypeIcon(type)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>
                      {type}
                    </div>
                    <div style={{ color: '#666' }}>
                      {count} completed
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Tasks */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '2rem',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ margin: '0 0 1.5rem 0' }}>🕒 Recent Tasks</h2>
          
          {recentTasks.length > 0 ? (
            <div style={{ display: 'grid', gap: '1rem' }}>
              {recentTasks.map((task) => (
                <div key={task.id} style={{
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  backgroundColor: task.status === 'completed' ? '#f8f9fa' : 'white'
                }}>
                  <div style={{ fontSize: '1.5rem' }}>
                    {getContentTypeIcon(task.content_type)}
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <h4 style={{ 
                      margin: '0 0 0.25rem 0',
                      color: task.status === 'completed' ? '#6c757d' : '#333',
                      textDecoration: task.status === 'completed' ? 'line-through' : 'none'
                    }}>
                      {task.title}
                    </h4>
                    <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                      {task.description?.substring(0, 100)}...
                    </p>
                  </div>
                  
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
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
              <p>No tasks found. Complete your onboarding to get started!</p>
              <button
                onClick={() => navigate('/onboarding-1')}
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
                Start Onboarding
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimpleDashboardPage; 