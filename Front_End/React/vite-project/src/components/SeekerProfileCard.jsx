import React from 'react';
import { useNavigate } from 'react-router-dom';

const SeekerProfileCard = ({ seeker, loggedInUser }) => {
  const navigate = useNavigate();

  return (
    <div className="container-fluid" style={{ paddingLeft: 0 }}>
      <div className="row">
        {/* Sidebar - fixed and full height */}
        <div
          className="col-md-2 bg-light border-end vh-100 position-fixed"
          style={{ padding: "1.5rem" }}
        >
          {/* Profile Section */}
          <div className="text-center mb-4">
            <img
              src="https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg"
              alt="Profile"
              className="rounded-circle border border-2 border-white shadow mb-2"
              width="80"
              height="80"
            />
            <h6 className="fw-bold text-primary mb-1">{loggedInUser?.uname}</h6>
            <p className="text-muted mb-1 small">{seeker?.graduationDegree || "Degree not available"}</p>
            <p className="text-muted small">{seeker?.university || "University not available"}</p>
          </div>

          {/* Navigation Links */}
          <h6 className="fw-bold mb-3 text-secondary">Seeker Actions</h6>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <button
                className="nav-link text-dark btn btn-link p-0"
                onClick={() => navigate("/seeker/appliedjobs")}
              >
                Applied Jobs
              </button>
            </li>
            <li className="nav-item mb-2">
              <button className="nav-link text-dark btn btn-link p-0">
                Saved Jobs
              </button>
            </li>
            <li className="nav-item mb-2">
              <button
                className="nav-link text-dark btn btn-link p-0"
                onClick={() => navigate("/seeker/profile")}
              >
                Edit Profile
              </button>
            </li>
             <li className="nav-item mb-2">
              <button
                className="nav-link text-dark btn btn-link p-0"
                onClick={() => navigate("/seeker/file-complaint")}
              >
                File Complaint
              </button>
            </li>
            
          </ul>
        </div>

        {/* Main Content placeholder */}
        <div className="col-md-10 offset-md-2" style={{ padding: "2rem" }}>
          {/* Your main seeker dashboard content will render here */}
        </div>
      </div>
    </div>
  );
};

export default SeekerProfileCard;
