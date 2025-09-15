import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({
    title: '',
    company: '',
    location: '',
    employment_type: '',
    salary_min: '',
    salary_max: '',
    description: ''
  });
  const [showForm, setShowForm] = useState(false);
  const [editingJobId, setEditingJobId] = useState(null);

  const actionBtnClass =
    'px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition';

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await API.get('/jobs');
        setJobs(res.data.jobs || []);
      } catch (err) {
        console.error(err);
        alert('Failed to fetch jobs');
      }
    };

    fetchJobs();
  }, []);

  const formatSalary = (value) => {
    if (!value) return '';
    let num = value.toString().replace(/\D/g, '');
    if (num === '') return '';
    num = Number(num);
    if (num >= 1000) {
      return `$${(num / 1000).toFixed(0)}k`;
    }
    return `$${num}`;
  };

  const parseSalary = (value) => {
    if (!value) return 0;
    const cleaned = value.replace(/\$/g, '').replace(/k/gi, '000');
    return Number(cleaned);
  };

  const displaySalary = (num) => {
    if (!num) return '';
    if (num >= 1000) return `$${(num / 1000).toFixed(0)}k`;
    return `$${num}`;
  };

  const handleAddJob = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...newJob,
        salary_min: parseSalary(newJob.salary_min),
        salary_max: parseSalary(newJob.salary_max)
      };

      if (editingJobId) {
        await API.put(`/jobs/${editingJobId}`, payload);
      } else {
        await API.post('/jobs', payload);
      }

      const res = await API.get('/jobs');
      setJobs(res.data.jobs || []);
      setNewJob({
        title: '',
        company: '',
        location: '',
        employment_type: '',
        salary_min: '',
        salary_max: '',
        description: ''
      });
      setShowForm(false);
      setEditingJobId(null);
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.message ||
        err.response?.data ||
        err.message;
      alert(
        'Failed to save job: ' +
          (typeof msg === 'string' ? msg : JSON.stringify(msg))
      );
    }
  };

  const deleteJob = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    try {
      await API.delete(`/jobs/${id}`);
      setJobs(jobs.filter((job) => job.id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete job');
    }
  };

  const startEdit = (job) => {
    setEditingJobId(job.id);
    setNewJob({
      title: job.title ?? '',
      company: job.company ?? '',
      location: job.location ?? '',
      employment_type: job.employment_type ?? '',
      salary_min: job.salary_min ?? '',
      salary_max: job.salary_max ?? '',
      description: job.description ?? ''
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingJobId(null);
    setNewJob({
      title: '',
      company: '',
      location: '',
      employment_type: '',
      salary_min: '',
      salary_max: '',
      description: ''
    });
  };

  return (
    <div className="mt-24 max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-mono text-green-700 dark:text-green-300 mb-6 text-center">
        Manage Jobs
      </h1>

      {!showForm ? (
        <>
          <div className="mb-4">
            <button
              onClick={() => {
                setShowForm(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Add New Job
            </button>
          </div>

          <div style={{ height: '3rem' }}></div>

          <div className="flex flex-col items-start gap-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="p-6 card flex flex-col justify-between w-[450px] shadow hover:shadow-md"
              >
                <div>
                  <h2 className="font-bold text-lg text-green-700 dark:text-green-300">
                    {job.title}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300">
                    {job.company}
                  </p>
                  <p className="text-sm text-gray-500">
                    Salary: {displaySalary(job.salary_min)} - {displaySalary(job.salary_max)}
                  </p>
                </div>

                <div className="mt-4 flex action-buttons">
                  <Link to={`/jobs/${job.id}`} className={actionBtnClass}>
                    View
                  </Link>
                  <Link
                    to="#"
                    onClick={(e) => { e.preventDefault(); startEdit(job); }}
                    className={actionBtnClass}
                  >
                    Edit
                  </Link>
                  <Link
                    to="#"
                    onClick={(e) => { e.preventDefault(); deleteJob(job.id); }}
                    className={actionBtnClass}
                  >
                    Delete
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div
          style={{ width: '500px', margin: '0 auto' }}
          className="p-6 card mb-8"
        >
          <h2 className="text-xl font-bold mb-4 text-center">
            {editingJobId ? 'Edit Job' : 'Add Job'}
          </h2>
          <form onSubmit={handleAddJob} className="space-y-4">
            <input
              type="text"
              placeholder="Job Title"
              value={newJob.title}
              onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Company"
              value={newJob.company}
              onChange={(e) =>
                setNewJob({ ...newJob, company: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Location"
              value={newJob.location}
              onChange={(e) =>
                setNewJob({ ...newJob, location: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Employment Type (Full-time, Part-time, etc.)"
              value={newJob.employment_type}
              onChange={(e) =>
                setNewJob({ ...newJob, employment_type: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />

            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Min Salary"
                value={newJob.salary_min}
                onChange={(e) =>
                  setNewJob({ ...newJob, salary_min: e.target.value })
                }
                className="w-1/2 p-2 border rounded"
                required
              />
              <input
                type="number"
                placeholder="Max Salary"
                value={newJob.salary_max}
                onChange={(e) =>
                  setNewJob({ ...newJob, salary_max: e.target.value })
                }
                className="w-1/2 p-2 border rounded"
                required
              />
            </div>

            <textarea
              placeholder="Job Description"
              value={newJob.description}
              onChange={(e) =>
                setNewJob({ ...newJob, description: e.target.value })
              }
              className="w-full p-2 border rounded"
              rows="5"
              required
            />

            <div className="flex justify-between">
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                {editingJobId ? 'Update Job' : 'Save Job'}
              </button>
              <button
                type="button"
                onClick={cancelForm}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
