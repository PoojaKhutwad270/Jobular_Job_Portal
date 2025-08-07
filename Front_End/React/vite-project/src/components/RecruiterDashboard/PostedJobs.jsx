import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const PostedJobsList = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://localhost:7269/api/job_requirement/GetJobRequirements")
      .then((res) => {
        console.log("Job API response:", res.data);
        setJobs(res.data);
      })
      .catch((err) => console.error("Failed to fetch jobs:", err));
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleJobClick = (id) => {
    navigate(`/job/${id}`);
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4 text-primary-emphasis text-center bg-primary-subtle py-2 rounded shadow-sm">
        Posted Jobs
      </h3>

      {jobs.map((job) => (
        <div
          key={job.req_id}
          className="card mb-3 border-primary shadow-sm"
          style={{ cursor: "pointer" }}
          onClick={() => handleJobClick(job.req_id)}
        >
          <div className="card-body">
            <h5 className="card-title text-primary">{job.job_title}</h5>
            <p className="card-text text-muted">
              {job.role_description || "No description provided."}
            </p>
            <p className="card-text mb-1">
              <strong>Deadline:</strong> {formatDate(job.deadline)}
            </p>
            <p className="card-text">
              <strong>Posted On:</strong>{" "}
              {formatDate(job.created_at || job.postedDate)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostedJobsList;
