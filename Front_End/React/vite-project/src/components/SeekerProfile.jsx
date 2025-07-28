import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

const SeekerProfile = () => {
  const loggedInUser = useSelector((store) => store.loggedInUser);
  const [seeker, setSeeker] = useState(null); // Single seeker

  useEffect(() => {
    if (!loggedInUser?.uid) return;

    axios.get(`http://localhost:8081/seeker/getSeeker/${loggedInUser.uid}`)
      .then(response => {
        setSeeker(response.data);
      })
      .catch(error => {
        console.error("Error fetching seeker profile:", error);
      });
  }, [loggedInUser]);

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#8baed2" }}>
        <div className="container-fluid">
          <span className="navbar-brand fw-bold fs-4">Jobular</span>
          <form className="d-flex ms-auto me-3">
            <input className="form-control" type="search" placeholder="Search" aria-label="Search" style={{ width: '250px' }} />
          </form>
          <div className="navbar-nav">
            <Link className="nav-link mx-2 fw-semibold text-dark" to="/seeker">Home</Link>
            <Link className="nav-link mx-2 fw-semibold text-dark" to="/SeekerProfile">Profile</Link>
            <Link className="nav-link mx-2 fw-semibold text-dark" to="/jobs">Jobs</Link>
            <Link className="nav-link mx-2 fw-semibold text-dark" to="/logout">Log Out</Link>
          </div>
        </div>
      </nav>

      {/* Profile Section */}
      <div className="container mt-4 d-flex align-items-start gap-4 card shadow-sm p-4 rounded-4">
        <div>
          <img
            src=""
            alt="Profile"
            width="300"
            height="500"
            className="rounded-circle border"
          />
        </div>

        <div>
          <h2>{loggedInUser?.uname}</h2>
          <p className="text-muted">{seeker?.graduationDegree}</p>
          <p className="text-muted"> {seeker?.university}</p>
          <div className="d-flex gap-2 mt-3">
            <button className="btn btn-outline-secondary">Add Profile Section</button>
            <button className="btn btn-outline-secondary">Enhance Profile</button>
          </div>
        </div>
      </div>

      {/* Education Section */}
      <div className="container mt-4 card shadow-sm p-4 rounded-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fs-4 fw-bold text-dark m-0">Education</h2>
          <span className="text-primary">Add</span>
          
        </div>

        <ul className="list-unstyled">
          <li className="mb-3">
            <h5>{seeker?.graduationDegree}</h5>
            <p className="text-muted mb-1">{seeker?.university} – {seeker?.graduationMarks}</p>
            <small className="text-muted">
              {seeker?.passout_year ? new Date(seeker.passout_year).getFullYear() : ""}
            </small>

          </li>

        </ul>
      </div>
        <div className="container mt-4 card shadow-sm p-4 rounded-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fs-4 fw-bold text-dark m-0">Skills</h2>
          <span className="text-primary" >Add   Edit</span>
          
        </div>

        <ul className="list-unstyled">
          <li className="mb-3">
            

          </li>

        </ul>
      </div>

    </>
  );
};

export default SeekerProfile;
