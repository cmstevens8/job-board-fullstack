import React from 'react';

const Applications = () => {
  // Placeholder applications data for now
  const applications = [
    { id: 1, jobTitle: 'Frontend Developer', status: 'Pending' },
    { id: 2, jobTitle: 'Backend Developer', status: 'Approved' },
  ];

  return (
    <div className="mt-24 max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-mono text-green-800 dark:text-green-300 mb-6">My Applications</h1>
      <div className="grid gap-6">
        {applications.map(app => (
          <div key={app.id} className="application-card p-4 bg-white dark:bg-gray-800 rounded shadow hover:shadow-md transition-shadow flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-green-700 dark:text-green-300">{app.jobTitle}</h2>
              <p className="text-gray-700 dark:text-gray-200">Status: {app.status}</p>
            </div>
            <button className="px-4 py-2 rounded bg-green-700 dark:bg-green-600 text-white font-mono hover:bg-green-600 dark:hover:bg-green-500 transition-colors">
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Applications;
