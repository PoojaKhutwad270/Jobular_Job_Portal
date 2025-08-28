import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SeekerNavbar from "./SeekerNavbar";

const FileComplaint = () => {
  const loggedInUser = useSelector((store) => store.loggedInUser);
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!loggedInUser || !loggedInUser.uid) {
      navigate("/login");
    }
  }, [loggedInUser, navigate]);

  
  // State variables
  const [companies, setCompanies] = useState([]);
  const [cid, setCid] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


// Fetch companies on mount
  useEffect(() => {
    axios
      .get("http://localhost:8081/company/getAll")
      .then((res) => setCompanies(res.data))
      .catch(() => setError("Failed to load companies"));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!cid) {
      setError("Please select a company");
      return;
    }
    if (!description.trim()) {
      setError("Please enter complaint description");
      return;
    }



  // Show nothing while redirecting / waiting for loggedInUser
  if (!loggedInUser || !loggedInUser.uid) {
    return null;
  }


  
    // Construct payload matching backend entity structure
    const complaintData = {
      company: { cid: parseInt(cid) },
      user: { uid: loggedInUser.uid },
      description: description.trim(),
      status: 0, // 0 = Pending
      date: new Date().toISOString(),
    };

    setLoading(true);

    axios
      .post("http://localhost:8081/complaint/add", complaintData)
      .then(() => {
        alert("Complaint submitted successfully");
        navigate("/seeker"); // Redirect after success
      })
      .catch((err) => {
        console.error("Error submitting complaint:", err);
        setError("Failed to submit complaint");
        setLoading(false);
      });
  };

  return (
    <> <SeekerNavbar />
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <h3>File a Complaint</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="companySelect" className="form-label">
            Select Company
          </label>
          <select
            id="companySelect"
            className="form-select"
            value={cid}
            onChange={(e) => setCid(e.target.value)}
          >
            <option value="">-- Select Company --</option>
            {companies.map((company) => (
              <option key={company.cid} value={company.cid}>
                {company.companyName}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Complaint Description
          </label>
          <textarea
            id="description"
            className="form-control"
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your complaint details here..."
          />
        </div>

        <button
          className="btn btn-primary"
          type="submit"
          disabled={loading}
          style={{ minWidth: "150px" }}
        >
          {loading ? "Submitting..." : "Submit Complaint"}
        </button>
      </form>
    </div>
    </>
  );
};

export default FileComplaint;
