import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    // Optional: can redirect to login or show a generic message
    return null;
  }

  return (
    <div className="mt-24 text-center px-4">
      {user.role === "job-seeker" ? (
        <>
          <h1 className="text-4xl font-mono text-green-700 dark:text-green-300 mb-4">
            Welcome, {user.name}! Your next opportunity awaits.
          </h1>
          <p className="text-gray-700 dark:text-gray-300 font-mono">
            Explore thousands of jobs tailored to your skills and interests. Apply today and advance your career.
          </p>
        </>
      ) : (
        <>
          <h1 className="text-4xl font-mono text-green-700 dark:text-green-300 mb-4">
            Welcome back, {user.name}! Manage your talent pipeline.
          </h1>
          <p className="text-gray-700 dark:text-gray-300 font-mono">
            Post new jobs, review applications, and find the right candidates for your company.
          </p>
        </>
      )}
    </div>
  );
};

export default Home;
