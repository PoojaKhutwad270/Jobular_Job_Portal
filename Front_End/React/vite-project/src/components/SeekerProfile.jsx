import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

const SeekerProfile = () => {
  const loggedInUser = useSelector((store) => store.loggedInUser);
  const [seeker, setSeeker] = useState(null);

  useEffect(() => {
    if (!loggedInUser?.uid) return;

    axios.get(`http://localhost:8081/seeker/getSeeker/${loggedInUser.uid}`)
      .then(response => setSeeker(response.data))
      .catch(error => console.error("Error fetching seeker profile:", error));
  }, [loggedInUser]);

  return (
    <>
      {/* Navbar */}
     {/* <nav className="navbar navbar-expand-lg shadow-sm" style={{ backgroundColor: "#f0f4f8" }}>
        <div className="container-fluid px-4">
          <span className="navbar-brand fw-bold fs-3 text-primary">Jobular</span>
          <form className="d-flex ms-auto me-4">
            <input
              className="form-control rounded-pill px-3 shadow-sm"
              type="search"
              placeholder="Search jobs or companies"
              aria-label="Search"
              style={{ width: '250px' }}
            />
          </form>
          <div className="navbar-nav d-flex align-items-center gap-3">
            <Link className="nav-link fw-semibold text-dark" to="/seeker">Home</Link>
            <Link className="nav-link fw-semibold text-dark" to="/SeekerProfile">Profile</Link>
            <Link className="nav-link fw-semibold text-dark" to="/jobs">Jobs</Link>
            <Link className="nav-link fw-semibold text-danger" to="/logout">Logout</Link>
          </div>
        </div>
      </nav> */}

      {/* Profile Section */}
      <div className="container mt-5 d-flex gap-5 card shadow-lg p-5 rounded-4 border-0">
        <div>
          <img
            src="https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg"
            alt="Profile"
            className="rounded-circle border shadow-sm"
            width="200"
            height="200"
          />
        </div>

        <div>
          <h2 className="fw-bold">{loggedInUser?.uname}</h2>
          <p className="text-muted">{seeker?.graduationDegree || "Degree not available"}</p>
          <p className="text-muted">{seeker?.university || "University not available"}</p>
          <div className="d-flex gap-3 mt-3">
           <button className="btn btn-primary me-2">Add Profile Section</button>

</div>
        </div>
      </div>

      {/* Education Section */}
      <div className="container mt-4 card shadow-lg p-5 rounded-4 border-0">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fs-4 fw-bold text-dark m-0">Education</h2>
          <button className="btn btn-primary me-2">Add +</button>
        </div>

        {seeker ? (
          <ul className="list-unstyled">
            <li className="mb-3">
              <h5>{seeker.graduationDegree}</h5>
              <p className="text-muted mb-1">{seeker.university} – {seeker.graduationMarks}</p>
              <small className="text-muted">
                {seeker.passout_year ? new Date(seeker.passout_year).getFullYear() : ""}
              </small>
            </li>
          </ul>
        ) : (
          <p className="text-muted">Loading education details...</p>
        )}
      </div>

      {/* Skills Section */}
      <div className="container mt-4 card shadow-lg p-5 rounded-4 border-0">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fs-4 fw-bold text-dark m-0">Skills</h2>
          <button className="btn btn-primary me-2">Add +</button>
        </div>

        {/* Placeholder */}
        <ul className="list-unstyled">
          <li className="text-muted">Skills data coming soon...</li>
        </ul>
      </div>
    </>
  );
};

export default SeekerProfile;
