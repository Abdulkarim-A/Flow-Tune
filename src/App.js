import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/main.css'; // Your main application styles

// Import homepage components
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import HowItWorksSection from './components/HowItWorksSection';
import TestimonialsSection from './components/TestimonialsSection';
import CallToActionSection from './components/CallToActionSection';
import Footer from './components/Footer';

// Import learning workflow pages
import LoginPage from './pages/LoginPage';
import OnboardingPage1 from './pages/OnboardingPage1';
import OnboardingPage2 from './pages/OnboardingPage2';
import OverviewPage from './pages/OverviewPage';
import SimpleDashboardPage from './pages/SimpleDashboardPage';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public-facing Homepage */}
          <Route path="/" element={
            <>
              <Header />
              <main>
                <HeroSection />
                <div id="features">
                  <FeaturesSection />
                </div>
                <HowItWorksSection />
                <TestimonialsSection />
                <CallToActionSection />
              </main>
              <Footer />
            </>
          } />

          {/* Learning Workflow Pages */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/onboarding-1" element={<OnboardingPage1 />} />
          <Route path="/onboarding-2" element={<OnboardingPage2 />} />
          <Route path="/overview" element={<OverviewPage />} />
          <Route path="/dashboard" element={<SimpleDashboardPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
