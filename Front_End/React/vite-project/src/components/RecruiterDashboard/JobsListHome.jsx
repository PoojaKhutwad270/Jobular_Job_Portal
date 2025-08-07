import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const JobsListHome = () => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;
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

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mt-3">
      

      {currentJobs.map((job) => (
        <div
          key={job.req_id}
          className="card mb-3 shadow-sm border-0"
          onClick={() => navigate(`/RecruiterDashboard/JobDetail/${job.req_id}`)}
          style={{ cursor: "pointer" }}
        >
          <div className="card-body">
            <h5 className="card-title">{job.job_title}</h5>
            <p className="card-text text-muted">
              {job.role_description || "No description provided."}
            </p>
            <p className="card-text">
              <strong>Deadline:</strong> {formatDate(job.deadline)}
            </p>
            <p className="card-text">
              <strong>Posted On:</strong>{" "}
              {formatDate(job.created_at || job.postedDate)}
            </p>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <nav>
        <ul className="pagination justify-content-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index + 1}
              className={`page-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default JobsListHome;
