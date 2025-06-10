import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/main.css'; // Your main application styles

// Import homepage components (assuming these are already set up)
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import HowItWorksSection from './components/HowItWorksSection';
import TestimonialsSection from './components/TestimonialsSection';
import CallToActionSection from './components/CallToActionSection';
import Footer from './components/Footer';

// Import your new internal page components
import DataBehaviorModelsPage from './pages/DataBehaviorModelsPage'; // Already done
import GoogleCalendarSyncPage from './pages/GoogleCalendarSyncPage'; // New!
import CustomerJourneyPage from './pages/CustomerJourneyPage';     // New!
import TaskDatabasePage from './pages/TaskDatabasePage';           // New!
import ChatFunctionalityPage from './pages/ChatFunctionalityPage'; // New!
import DashboardPage from './pages/DashboardPage';                 // New!


function App() {
  return (
    <Router>
      <div className="App">
        {/* Header and Footer might be common across all pages, or you might have different ones for internal vs public */}
        <Header />
        <main>
          <Routes>
            {/* Public-facing Homepage */}
            <Route path="/" element={
              <>
                <HeroSection />
                <FeaturesSection />
                <HowItWorksSection />
                <TestimonialsSection />
                <CallToActionSection />
              </>
            } />

            {/* Internal Pages - for team collaboration / specific functionalities */}
            <Route path="/data-behavior" element={<DataBehaviorModelsPage />} />
            <Route path="/google-calendar-sync" element={<GoogleCalendarSyncPage />} />
            <Route path="/customer-journey" element={<CustomerJourneyPage />} />
            <Route path="/task-database" element={<TaskDatabasePage />} />
            <Route path="/chat-functionality" element={<ChatFunctionalityPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />

            {/* Add more routes as your application grows */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
