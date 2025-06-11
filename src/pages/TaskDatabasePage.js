// src/pages/TaskDatabasePage.js
import React from 'react';
import '../styles/pages.css'; // Import page-specific styles

const TaskDatabasePage = () => {
  return (
    <section className="page-container">
      <div className="container">
        <h1 className="page-title">Task Database & Management</h1>
        <p className="intro-text">
          This page will outline the structure and functionality of Flow Tune's task database,
          including how tasks are stored, managed, and linked to calendar events.
        </p>

        {/* Placeholder for Database Schema/Structure */}
        <div className="page-section">
          <h2 className="section-heading">Task Data Model</h2>
          <div className="content-block empty-state">
            <p>Define task properties: title, description, due date, priority, status, linked event ID, etc.</p>
            {/* Future: Display schema or database ERD */}
          </div>
        </div>

        {/* Placeholder for Task Management Logic */}
        <div className="page-section">
          <h2 className="section-heading">Backend Logic & APIs</h2>
          <div className="content-block">
            <p>Consider CRUD operations for tasks (Create, Read, Update, Delete).</p>
            <p>How do tasks relate to calendar events? Are they standalone or embedded?</p>
            {/* Future: Code snippets or API endpoint documentation */}
          </div>
        </div>

        {/* Placeholder for notes/task tracking */}
        <div className="page-section notes-area">
          <h2 className="section-heading">Bart's Task Database Notes</h2>
          <textarea
            placeholder="Jot down database design, API considerations, and backend implementation notes here..."
            rows="8"
          ></textarea>
          <button className="button button-secondary">Save Notes</button>
        </div>
      </div>
    </section>
  );
};

export default TaskDatabasePage;
