import React from 'react';
import { Link } from 'react-router-dom';

const PostJob = () => {
  return (
    <div className="p-3">
      {/* Clickable Bootstrap-styled strip */}
      <Link to="/RecruiterDashboard/PostJobForm" className="text-decoration-none">
        <div className="bg-primary bg-opacity-10 py-2 px-3 rounded" style={{ cursor: 'pointer' }}>
          <strong className="text-primary">Post a New Job</strong>
        </div>
      </Link>
    </div>
  );
};

export default PostJob;
