// src/pages/SimpleDashboardPage.js

import React from 'react';
import Card from '../components/Card'; // Import the Card component

// Import existing CSS for the page, and ensure it can incorporate dashboard-specific styles
import './SimpleDashboardPage.css'; // Make sure this file exists and is linked

const SimpleDashboardPage = () => {
  // Mock data for dashboard cards
  const tasks = [
    { id: 1, title: 'Complete Project Report', status: 'In Progress', dueDate: '2025-07-05' },
    { id: 2, title: 'Schedule Team Meeting', status: 'Pending', dueDate: '2025-06-28' },
    { id: 3, title: 'Review Q2 Budget', status: 'Completed', dueDate: '2025-06-20' },
  ];

  const upcomingEvents = [
    { id: 1, title: 'Client Demo', date: '2025-07-01', time: '10:00 AM' },
    { id: 2, title: 'Marketing Brainstorm', date: '2025-07-03', time: '02:00 PM' },
  ];

  const recentNotes = [
    { id: 1, title: 'Meeting Notes - 2025-06-21', content: 'Discussed Q3 strategy and resource allocation.' },
    { id: 2, title: 'Idea: New Feature Integration', content: 'Consider integrating real-time collaboration for tasks.' },
  ];

  return (
    <div
      className="dashboard-container"
      // Applying Figma dimensions directly for the main layout.
      // For responsiveness, these would typically be handled via CSS classes and media queries.
      style={{
        position: 'relative',
        width: '1728px',
        height: '1117px',
        overflowX: 'scroll',
        background: '#FFFFFF',
        padding: '20px',
        boxSizing: 'border-box', // Include padding in the total width/height
        display: 'flex',
        flexDirection: 'column',
        gap: '20px', // Spacing between sections
      }}
    >
      <h1>Your Flow Tune Dashboard</h1>

      {/* Section for Tasks */}
      <section className="dashboard-section tasks-section">
        <h2>My Tasks</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {tasks.map(task => (
            <Card key={task.id} title={task.title}>
              <p>Status: {task.status}</p>
              <p>Due: {task.dueDate}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Section for Upcoming Events */}
      <section className="dashboard-section events-section">
        <h2>Upcoming Events</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {upcomingEvents.map(event => (
            <Card key={event.id} title={event.title}>
              <p>Date: {event.date}</p>
              <p>Time: {event.time}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Section for Recent Notes or Quick Access */}
      <section className="dashboard-section notes-section">
        <h2>Recent Notes</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {recentNotes.map(note => (
            <Card key={note.id} title={note.title}>
              <p>{note.content.substring(0, 100)}...</p> {/* Displaying a snippet */}
            </Card>
          ))}
        </div>
      </section>

      {/* Add more sections as needed, e.g., Calendar Sync status, Quick Links etc. */}
    </div>
  );
};

export default SimpleDashboardPage;
