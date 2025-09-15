// src/pages/Jobs.jsx
import React, { useState, useEffect, useContext } from 'react';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await API.get('/jobs');
        setJobs(res.data.jobs || []);
      } catch (err) {
        console.error('Failed to fetch jobs:', err);
      }
    };
    fetchJobs();
  }, []);

  const handleApply = async (jobId) => {
    if (!user) return alert('You must be logged in to apply.');
    try {
      await API.post('/applications', { job_id: jobId });
      alert('Application submitted!');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || 'Failed to apply');
    }
  };

  return (
    <div className="mt-24 max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-mono text-green-700 dark:text-green-300 mb-6">Available Jobs</h1>
      {jobs.length === 0 ? (
        <p className="text-gray-700 dark:text-gray-200">No jobs available.</p>
      ) : (
        <div className="grid gap-4">
          {jobs.map(job => (
            <div key={job.id} className="p-4 bg-white dark:bg-gray-800 rounded shadow">
              <h2 className="text-xl font-bold">{job.title}</h2>
              <p className="text-gray-700 dark:text-gray-300">{job.company} – {job.location}</p>
              <p className="text-gray-600 dark:text-gray-400">{job.employment_type} | ${job.salary_min} - ${job.salary_max}</p>
              <p className="mt-2">{job.description}</p>
              {user && (
                <button
                  onClick={() => handleApply(job.id)}
                  className="mt-3 px-3 py-1 rounded bg-green-500 text-white"
                >
                  Apply
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Jobs;
