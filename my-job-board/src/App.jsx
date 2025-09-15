import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import JobDetail from './pages/JobDetail';
import FindJobs from './pages/FindJobs';
import JobsPosted from './pages/JobsPosted';
import MyApplications from './pages/MyApplications';
import ApplicationsReceived from './pages/ApplicationsReceived';
import AdminDashboard from './pages/AdminDashboard';
import { ThemeContext } from './context/ThemeContext';
import { AuthContext } from './context/AuthContext';

function App() {
  const [theme, setTheme] = useState('light');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove(theme === 'light' ? 'dark' : 'light');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Router>
        <Navbar />
        <div className="p-4 bg-gray-100 dark:bg-gray-900 min-h-screen mt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/jobs" element={<FindJobs />} />
            <Route path="/jobs-posted" element={<JobsPosted />} />
            <Route path="/jobs/:id" element={<JobDetail />} />
            <Route path="/admin" element={<AdminDashboard />} />
            
            {/* New application routes */}
            <Route path="/applications" element={user?.role === 'job-seeker' ? <MyApplications /> : <ApplicationsReceived />} />
          </Routes>
        </div>
      </Router>
    </ThemeContext.Provider>
  );
}

export default App;
