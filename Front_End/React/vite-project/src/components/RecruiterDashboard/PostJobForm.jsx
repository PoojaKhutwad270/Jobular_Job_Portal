import React, { useState, useEffect } from "react";

const JobPostForm = ({ company }) => {
  // company = { cid: number, cname: string }

  const [formData, setFormData] = useState({
    cid: "",
    job_title: "",
    salary: "",
    experience: "",
    deadline: "",
  });

  // Salary ranges to choose from
  const salaryRanges = [
    "1-3 LPA",
    "4-6 LPA",
    "7-9 LPA",
    "10-12 LPA",
    "13-15 LPA",
    "16-18 LPA",
    "19-20 LPA",
  ];

  useEffect(() => {
    // Set company id automatically when component loads
    if (company && company.cid) {
      setFormData((prev) => ({ ...prev, cid: company.cid }));
    }
  }, [company]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Job Posted Successfully!");
    setFormData({
      cid: company.cid,
      job_title: "",
      salary: "",
      experience: "",
      deadline: "",
    });
  };

  return (
    <div className="container" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4">Post a New Job</h2>
      <form onSubmit={handleSubmit}>
        {/* Company Name (read-only) */}
        <div className="mb-3">
          <label htmlFor="cname" className="form-label">
            Company Name
          </label>
          <input
            type="text"
            className="form-control"
            id="cname"
            name="cname"
            value={company?.cname || ""}
            disabled
          />
        </div>

        {/* Job Title */}
        <div className="mb-3">
          <label htmlFor="job_title" className="form-label">
            Job Title
          </label>
          <input
            type="text"
            className="form-control"
            id="job_title"
            name="job_title"
            maxLength="150"
            value={formData.job_title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Salary Range Dropdown */}
        <div className="mb-3">
          <label htmlFor="salary" className="form-label">
            Salary Range
          </label>
          <select
            className="form-select"
            id="salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            required
          >
            <option value="">Select Salary Range</option>
            {salaryRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>

        {/* Experience */}
        <div className="mb-3">
          <label htmlFor="experience" className="form-label">
            Experience Required (years)
          </label>
          <input
            type="number"
            className="form-control"
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            required
          />
        </div>

        {/* Deadline */}
        <div className="mb-3">
          <label htmlFor="deadline" className="form-label">
            Application Deadline
          </label>
          <input
            type="date"
            className="form-control"
            id="deadline"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Post Job
        </button>
      </form>
    </div>
  );
};

export default JobPostForm;
