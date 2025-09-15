import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';

const FindJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await API.get('/jobs');
        setJobs(res.data?.jobs || []); // <-- safety check added
      } catch (err) {
        console.error(err);
        alert('Failed to fetch jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const formatSalary = (value) => {
    if (!value) return '';
    const num = Number(value);
    if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(0)}k`;
    return `$${num}`;
  };

  if (loading) return <p className="mt-24 text-center">Loading jobs...</p>;
  if (jobs.length === 0) return <p className="mt-24 text-center">No jobs available at the moment.</p>;

  return (
    <div className="mt-24 max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-mono text-green-700 mb-6 text-center">Available Jobs</h1>
      <div className="flex flex-col items-start gap-6">
        {jobs.map(job => (
          <div key={job.id} className="p-6 card flex flex-col justify-between w-full shadow hover:shadow-md">
            <div>
              <h2 className="font-bold text-lg text-green-700">{job.title}</h2>
              <p className="text-gray-700">{job.company} — {job.location}</p>
              <p className="text-sm text-gray-500">
                Salary: {formatSalary(job.salary_min)} - {formatSalary(job.salary_max)}
              </p>
            </div>
            <Link to={`/jobs/${job.id}`} className="mt-4 px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindJobs;
