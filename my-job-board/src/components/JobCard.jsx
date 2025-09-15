import React from "react";
import { Link } from "react-router-dom";

function JobCard({ job }) {
  return (
    <div className="border p-4 rounded mb-2">
      <h2 className="text-xl font-bold">{job.title}</h2>
      <p>{job.company}</p>
      <Link to={`/jobs/${job.id}`} className="text-blue-500">View Details</Link>
    </div>
  );
}

export default JobCard;
