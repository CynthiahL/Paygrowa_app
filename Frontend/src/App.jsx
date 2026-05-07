import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Public Pages
import LandingPage from './pages/Landing/LandingPage';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';

// Authenticated Pages
import DashboardPage from './pages/Dashboard/DashboardPage';
import ProfilePage from './pages/Profile/ProfilePage';
import TaskDetailPage from './pages/TaskDetail/TaskDetailPage';
import SurveyQuestion1Page from './pages/Survey/SurveyQuestion1Page';
import SurveyQuestion2Page from './pages/Survey/SurveyQuestion2Page';
import SurveyQuestion3Page from './pages/Survey/SurveyQuestion3Page';
import SurveyQuestion4Page from './pages/Survey/SurveyQuestion4Page';
import SurveyQuestion5Page from './pages/Survey/SurveyQuestion5Page';
import SurveyAttentionCheckPage from './pages/Survey/SurveyAttentionCheckPage';
import TaskSuccessPage from './pages/TaskSuccess/TaskSuccessPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* AUTHENTICATED ROUTES (In a real app, these would be protected) */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/task/:id" element={<TaskDetailPage />} />
        
        <Route path="/survey/1" element={<SurveyQuestion1Page />} />
        <Route path="/survey/2" element={<SurveyQuestion2Page />} />
        <Route path="/survey/3" element={<SurveyQuestion3Page />} />
        <Route path="/survey/4" element={<SurveyQuestion4Page />} />
        <Route path="/survey/5" element={<SurveyQuestion5Page />} />
        <Route path="/survey/attention-check" element={<SurveyAttentionCheckPage />} />
        
        <Route path="/task-success" element={<TaskSuccessPage />} />
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;