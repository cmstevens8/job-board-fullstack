import React from "react";

function ApplicationRow({ application }) {
  return (
    <tr>
      <td>{application.jobTitle}</td>
      <td>{application.applicantName}</td>
      <td>{application.status}</td>
    </tr>
  );
}

export default ApplicationRow;
