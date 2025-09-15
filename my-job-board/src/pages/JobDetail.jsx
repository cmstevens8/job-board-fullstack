import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { getApplications } from '../services/applicationService.js';

const JobDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await API.get(`/jobs/${id}`);
        setJob(res.data.job); // matches backend response
      } catch (err) {
        console.error(err);
        alert('Failed to fetch job');
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  useEffect(() => {
    const checkApplication = async () => {
      if (!user || user.role !== 'job-seeker') return;
      try {
        const applications = await getApplications();
        const hasApplied = applications.some(app => app.job_id === Number(id));
        setApplied(hasApplied);
      } catch (err) {
        console.error(err);
      }
    };
    checkApplication();
  }, [id, user]);

  const formatSalary = (value) => {
    if (!value) return '';
    const num = Number(value);
    if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(0)}k`;
    return `$${num}`;
  };

  const handleApply = async () => {
    try {
      await API.post('/applications', { job_id: id });
      setApplied(true); // mark as applied
      alert('Application submitted!');
    } catch (err) {
      console.error(err);
      alert('Failed to apply for this job');
    }
  };

  if (loading) return <p className="mt-24 text-center">Loading job details...</p>;
  if (!job) return <p className="mt-24 text-center">Job not found.</p>;

  return (
    <div className="mt-24 max-w-6xl mx-auto p-4">
      {/* Back to Jobs button with arrow */}
      <Link
        to="/jobs"
        className="inline-block mb-6 px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
      >
        ← Back to Jobs
      </Link>

      {/* Job card styling like FindJobs / JobsPosted */}
      <div className="p-6 card flex flex-col justify-between w-full shadow hover:shadow-md">
        <div>
          <h2 className="font-bold text-lg text-green-700">{job.title}</h2>
          <p className="text-gray-700">{job.company} — {job.location}</p>
          <p className="text-sm text-gray-500">
            Salary: {formatSalary(job.salary_min)} - {formatSalary(job.salary_max)}
          </p>
          <p className="mt-4">{job.description}</p>
        </div>

        {/* Apply button only for job-seeker users */}
        {user?.role === 'job-seeker' && (
          applied ? (
            <p className="mt-4 text-gray-600 font-medium">Applied</p>
          ) : (
            <button
              className="mt-4 px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
              onClick={handleApply}
            >
              Apply
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default JobDetail;
