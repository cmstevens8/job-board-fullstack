import React, { useEffect, useState, useContext } from 'react';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const MyApplications = () => {
  const { user } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        // 1. Fetch applications
        const res = await API.get('/applications', { params: { role: 'job-seeker' } });
        const apps = res.data;

        // 2. Fetch jobs
        const jobsRes = await API.get('/jobs');
        const jobs = jobsRes.data.jobs;

        // 3. Map jobs into applications
        const appsWithJob = apps.map(app => ({
          ...app,
          job: jobs.find(j => j.id === app.job_id)
        }));

        setApplications(appsWithJob);
      } catch (err) {
        console.error(err);
        alert('Failed to fetch your applications');
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === 'job-seeker') {
      fetchApplications();
    }
  }, [user]);

  if (loading) return <p className="mt-24 text-center">Loading your applications...</p>;
  if (applications.length === 0) return <p className="mt-24 text-center">You have not applied to any jobs yet.</p>;

  const formatSalary = (value) => {
    if (!value) return '';
    const num = Number(value);
    if (num >= 1000) return `$${(num / 1000).toFixed(0)}k`;
    return `$${num}`;
  };

  return (
    <div className="mt-24 max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-mono text-green-700 mb-6 text-center">My Applications</h1>
      <div className="flex flex-col items-start gap-6">
        {applications.map((app) => (
          <div key={app.id} className="p-6 card flex flex-col justify-between w-full shadow hover:shadow-md">
            <div>
              <h2 className="font-bold text-lg text-green-700">{app.job?.title}</h2>
              <p className="text-gray-700">{app.job?.company} — {app.job?.location}</p>
              <p className="text-sm text-gray-500">
                Salary: {formatSalary(app.job?.salary_min)} - {formatSalary(app.job?.salary_max)}
              </p>
              <p className="text-sm text-gray-500">Status: {app.status}</p>
            </div>
            <Link to={`/jobs/${app.job_id}`} className="mt-4 px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyApplications;
