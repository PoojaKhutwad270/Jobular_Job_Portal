// src/components/RecruiterHome.js
import React from "react";
import PostJob from "./PostJob";
import PostedJobsList from "./PostedJobsList";
import JobsListHome from "./JobsListHome";

const RecruiterHome = () => {
  return (
    <div className="container">
      {/* Post a Job Section */}
      <div className="mb-2">
        {/* <h4 className="text-primary">Post a New Job</h4> */}
        <PostJob />
      </div>


      {/* Posted Jobs Section */}
      <div>
        <h4 className="fw-semibold pb-2 border-bottom border-2 border-primary text-primary">
          My Posted Jobs
        </h4>
        <JobsListHome />
      </div>
    </div>
  );
};

export default RecruiterHome;
