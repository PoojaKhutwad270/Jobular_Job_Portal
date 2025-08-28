import React from 'react';

const SeekerJobCard = ({ job, onViewMore }) => {
  return (
    <div className="p-3 mb-3 shadow-sm rounded-3" style={{ backgroundColor: "#f9fbfc" }}>
      <h5 className="text-primary fw-bold mb-1">{job.companyName}</h5>
      <p className="mb-1 text-muted"><strong>Role:</strong> {job.jobTitle}</p>
      <p className="mb-3 text-muted"><strong>Location:</strong> {job.location}</p>
      <button className="btn btn-outline-primary btn-sm" onClick={() => onViewMore(job.jobId)}>View More</button>
    </div>
  );
};

export default SeekerJobCard;
