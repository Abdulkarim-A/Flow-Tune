import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './Homepage';
import LoginRegistration from './LoginRegistration';
import OnboardingPage1 from './OnboardingPage1';
import OnboardingPage2 from './OnboardingPage2';
import OverviewPage from './OverviewPage'; // Import the new component
// ... (other imports)

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginRegistration />} />
          <Route path="/onboarding-1" element={<OnboardingPage1 />} />
          <Route path="/onboarding-2" element={<OnboardingPage2 />} />
          <Route path="/overview" element={<OverviewPage />} /> {/* Add this line */}
          {/* ... (other routes) */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
