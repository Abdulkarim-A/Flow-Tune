 import React from 'react from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/main.css';

// Import homepage components
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import HowItWorksSection from './components/HowItWorksSection';
import TestimonialsSection from './components/TestimonialsSection';
import CallToActionSection from './components/CallToActionSection';
import Footer from './components/Footer';

// Import the new page component
import DataBehaviorModelsPage from './pages/DataBehaviorModelsPage'; // New import

function App() {
  return (
    <Router>
      <div className="App">
        <Header /> {/* Header might be common across pages, or specific to public/internal */}
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <HeroSection />
                <FeaturesSection />
                <HowItWorksSection />
                <TestimonialsSection />
                <CallToActionSection />
              </>
            } />
            <Route path="/data-behavior" element={<DataBehaviorModelsPage />} /> {/* New Route */}
            {/* Add more routes for other internal pages (e.g., /google-calendar-sync) */}
          </Routes>
        </main>
        <Footer /> {/* Footer might also be common */}
      </div>
    </Router>
  );
}

export default App;