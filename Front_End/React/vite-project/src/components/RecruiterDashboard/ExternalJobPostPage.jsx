import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ExternalJobPostPage = () => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hardcoded skills for demonstration
  const skills = [
    "JavaScript",
    "React",
    "Node.js",
    "Express",
    "SQL",
    "REST APIs",
    "Git",
    "Docker",
  ];

    const { id } = useParams();
    
  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
          await axios.get(
              `https://localhost:7269/api/job_requirement/GetJobReqPost/${id}`
          ).then(res => {
              
               const jobData = Array.isArray(res.data) ? res.data[0] : res.data;
        setJob(jobData);
          })
        
      } catch (err) {
          setError(err.message);
          console.log("Failed to fetch job data",err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading)
    return (
      <div className="container text-center my-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3">Loading job details...</p>
      </div>
    );

  if (error)
    return (
      <div className="container text-center my-5">
        <p className="text-danger">Error: {error}</p>
      </div>
    );

  if (!job)
    return (
      <div className="container text-center my-5">
        <p>No job found.</p>
      </div>
    );

  // Format deadline nicely
  const deadlineFormatted = new Date(job.deadline).getDate();

  return (
    <div className="container my-5" style={{ maxWidth: "700px" }}>
      <div className="card shadow rounded-4 p-4">
        <h2 className="mb-3 text-primary">{job.job_title}</h2>
        <h5 className="text-muted mb-4">Company ID: {job.req_id}</h5>
 <h5 className="text-muted mb-4">Company ID: {job.cname}</h5>
        <div className="mb-3">
  <strong>Salary:</strong>{" "}
  <span>
    {job.salary != null
      ? `$${job.salary.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
      : "N/A"}
  </span>
</div>

        <div className="mb-3">
          <strong>Experience Required:</strong> {job.experience} years
        </div>

        <div className="mb-3">
          <strong>Application Deadline:</strong> {deadlineFormatted}
              </div>
              
                <div className="mb-3">
          <strong>Application Deadline:</strong> {job.salary}
        </div>

        <div className="mb-4">
          <strong>Role Description:</strong>
          <p className="mt-2">{job.role_description}</p>
        </div>

        <div>
          <strong>Skills Required:</strong>
          <ul className="list-inline mt-2">
            {skills.map((skill, idx) => (
              <li
                key={idx}
                className="list-inline-item badge bg-info text-dark me-2 mb-2"
                style={{ fontSize: "1rem", padding: "0.5em 1em" }}
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>

        {/* <button
          className="btn btn-primary mt-4"
          onClick={() => alert("Apply functionality coming soon!")}
        >
          Apply Now
        </button> */}
      </div>
    </div>
  );
};

export default ExternalJobPostPage;
