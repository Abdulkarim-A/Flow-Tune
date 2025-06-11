// src/pages/GoogleCalendarSyncPage.js
import React from 'react';
import '../styles/pages.css'; // Import page-specific styles

const GoogleCalendarSyncPage = () => {
  return (
    <section className="page-container">
      <div className="container">
        <h1 className="page-title">Google Calendar Sync</h1>
        <p className="intro-text">
          This page is dedicated to developing and testing the integration with Google Calendar.
          It will handle authentication, fetching events, and future functionalities like adding/modifying events.
        </p>

        {/* Placeholder for Google Auth/Sync UI */}
        <div className="page-section">
          <h2 className="section-heading">Authentication & Sync Status</h2>
          <div className="content-block">
            <p><strong>Current Status:</strong> Not connected</p>
            <button className="button button-primary">Connect Google Calendar</button>
            <p className="description">Once connected, Flow Tune will securely access your calendar events.</p>
          </div>
        </div>

        {/* Placeholder for displaying fetched events */}
        <div className="page-section">
          <h2 className="section-heading">Calendar Events Preview</h2>
          <div className="content-block empty-state">
            <p>No events to display yet. Connect your Google Calendar to see your upcoming schedule here.</p>
            {/* Future: A list or calendar view of events */}
          </div>
        </div>

        {/* Placeholder for notes/task tracking */}
        <div className="page-section notes-area">
          <h2 className="section-heading">Bart's Development Notes</h2>
          <textarea
            placeholder="Document API integration steps, challenges, and progress here..."
            rows="8"
          ></textarea>
          <button className="button button-secondary">Save Notes</button>
        </div>
      </div>
    </section>
  );
};

export default GoogleCalendarSyncPage;
