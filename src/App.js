// src/App.js (Example - adjust based on your actual App.js structure)
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import existing pages
import Homepage from './Homepage'; // Or './pages/Homepage' if you moved it
import LoginPage from './pages/LoginPage';
import OnboardingPage1 from './pages/OnboardingPage1';
import OnboardingPage2 from './pages/OnboardingPage2';
import SimpleDashboardPage from './pages/SimpleDashboardPage';
import ChatFunctionalityPage from './pages/ChatFunctionalityPage';
import GoogleCalendarSyncPage from './pages/GoogleCalendarSyncPage';
import OverviewPage from './pages/OverviewPage';
import TaskDatabasePage from './pages/TaskDatabasePage';

// Import the new ContactPage
import ContactPage from './pages/ContactPage';

// Import Header and Footer if they are part of the main layout
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="app-container"> {/* Assuming you have a container for overall layout */}
        <Header /> {/* Render Header on all pages if it's universal */}

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/onboarding/1" element={<OnboardingPage1 />} />
          <Route path="/onboarding/2" element={<OnboardingPage2 />} />
          <Route path="/dashboard" element={<SimpleDashboardPage />} />
          <Route path="/chat" element={<ChatFunctionalityPage />} />
          <Route path="/calendar-sync" element={<GoogleCalendarSyncPage />} />
          <Route path="/overview" element={<OverviewPage />} />
          <Route path="/tasks" element={<TaskDatabasePage />} />

          {/* Add the new route for the Contact Page */}
          <Route path="/contact" element={<ContactPage />} />

          {/* Add a catch-all route for 404 Not Found if you wish */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>

        <Footer /> {/* Render Footer on all pages if it's universal */}
      </div>
    </Router>
  );
}

export default App;
