import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const phases = [
  "All Applications",
  "Aptitude Round",
  "Coding Round",
  "Technical Interview",
  "HR Interview",
  "Selected"
];

// Colors for phases
const phaseColors = {
  0: "#cfe2ff",
  1: "#d1e7dd",
  2: "#f8d7da",
  3: "#fff3cd",
  4: "#fff9db"
};

export default function AllJobApplications() {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchApplicants = async () => {
    setLoading(true);
    try {
      const url =
        currentPhase === 0
          ? `https://localhost:7269/api/application` // <-- all applications
          : `https://localhost:7269/api/application?phase=${currentPhase}`;
      const res = await axios.get(url);
      setApplicants(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch applicants:", err);
      setApplicants([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, [currentPhase]);

  const handleSeeProfile = (id) => {
    navigate(`/applicant/${id}`);
  };

 
  return (
    <div className="container mt-4">
      {/* Phase Tabs */}
      <ul className="nav nav-tabs mb-4">
        {phases.map((phase, idx) => (
          <li className="nav-item" key={idx}>
            <button
              className={`nav-link ${currentPhase === idx ? "active fw-bold" : "text-muted"}`}
              onClick={() => setCurrentPhase(idx)}
              style={{ cursor: "pointer" }}
            >
              {phase}
            </button>
          </li>
        ))}
      </ul>

      {/* Applicants Table */}
      <div
        className="shadow-sm rounded overflow-auto"
        style={{ maxHeight: "65vh", backgroundColor: "#fff" }}
      >
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status" />
          </div>
        ) : applicants.length === 0 ? (
          <div className="text-center text-secondary py-4 fst-italic">
            No applicants found.
          </div>
        ) : (
          <table className="table table-hover mb-0">
            <thead className="table-light sticky-top" style={{ top: 0 }}>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Qualification</th>
                <th scope="col">Experience (yrs)</th>
                <th scope="col">Phase</th>
                
                <th scope="col">Profile</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((app) => (
                <tr
                  key={app.appid}
                  style={{
                    backgroundColor: phaseColors[app.phase] || "#fff",
                    cursor: "pointer"
                  }}
                >
                  <td>{app.name}</td>
                  <td>{app.email}</td>
                  <td>{app.qualification || "N/A"}</td>
                  <td>{app.experience}</td>
                  <td>{phases[app.phase] || app.phase}</td>

                  
                  <td>
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => handleSeeProfile(app.appid)}
                    >
                      See Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}



