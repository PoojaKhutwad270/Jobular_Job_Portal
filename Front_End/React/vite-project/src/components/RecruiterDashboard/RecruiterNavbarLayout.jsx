// import React from "react";
// import { Link, Outlet } from "react-router-dom";

// const RecruiterNavbarLayout = () => {
//   return (
//     <>
//       <nav
//         className="navbar navbar-expand-lg shadow-sm sticky-top"
//         style={{ backgroundColor: "#f0f4f8" }}
//       >
//         <div className="container-fluid px-4 d-flex align-items-center">
//           {/* Brand on the far left */}
//           <span className="navbar-brand fw-bold fs-3 text-primary">Jobular</span>

//           {/* Spacer pushes next content to right */}
//           <div className="flex-grow-1"></div>

//           {/* Search bar - placed just before Home */}
//           <form className="d-flex me-3">
//             <input
//               className="form-control rounded-pill px-3 shadow-sm"
//               type="search"
//               placeholder="Search candidates"
//               aria-label="Search"
//               style={{ width: "250px" }}
//             />
//           </form>

//           {/* Nav links */}
//           <div className="navbar-nav d-flex align-items-center gap-4">
//             <Link className="nav-link fw-semibold text-dark" to="/RecruiterDashboard">
//               Home
//             </Link>
//             <Link className="nav-link fw-semibold text-dark" to="/recruiter/profile">
//               Profile
//             </Link>
//             <Link className="nav-link fw-semibold text-danger" to="/logout">
//               Logout
//             </Link>
//           </div>
//         </div>
//       </nav>

//       {/* Sidebar + Routed content */}
//       <div style={{ display: "flex", minHeight: "100vh" }}>
//         <div
//           style={{ width: "220px", backgroundColor: "#f0f4f8", padding: "1.5rem" }}
//         >
//           <h6 className="fw-bold mb-3 text-secondary">Recruiter Actions</h6>
//           <ul className="nav flex-column">
//             <li className="nav-item mb-2">
//               <Link
//                 to="/RecruiterDashboard/PostJobForm"
//                 className="nav-link text-dark"
//               >
//                 Post Job
//               </Link>
//             </li>
//             <li className="nav-item mb-2">
//               <Link
//                 to="/RecruiterDashboard/PostedJobsList"
//                 className="nav-link text-dark"
//               >
//                 My Posted Jobs
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link
//                 to="/RecruiterDashboard/JobApplications"
//                 className="nav-link text-dark"
//               >
//                 Job Applications
//               </Link>
//             </li>
//           </ul>
//         </div>

//         <div style={{ flex: 1, padding: "2rem" }}>
//           <Outlet />
//         </div>
//       </div>
//     </>
//   );
// };

// export default RecruiterNavbarLayout;

import React from "react";
import { Link, Outlet } from "react-router-dom";

const RecruiterNavbarLayout = () => {
  return (
    <>
      {/* Top Navbar */}
      <nav
        className="navbar navbar-expand-lg shadow-sm sticky-top"
        style={{ backgroundColor: "#f0f4f8", zIndex: 1000 }}
      >
        <div className="container-fluid px-4 d-flex align-items-center">
          <span className="navbar-brand fw-bold fs-3 text-primary">Jobular</span>

          <div className="flex-grow-1"></div>

          <form className="d-flex me-3">
            <input
              className="form-control rounded-pill px-3 shadow-sm"
              type="search"
              placeholder="Search candidates"
              aria-label="Search"
              style={{ width: "250px" }}
            />
          </form>

          <div className="navbar-nav d-flex align-items-center gap-4">
            <Link className="nav-link fw-semibold text-dark" to="/RecruiterDashboard">
              Home
            </Link>
            <Link className="nav-link fw-semibold text-dark" to="/RecruiterDashboard/profile">
              Profile
            </Link>
            <Link className="nav-link fw-semibold text-danger" to="/logout">
              Logout
            </Link>
          </div>
        </div>
      </nav>

      {/* Sidebar and Main Content */}
      <div className="container-fluid" style={{ paddingLeft: 0 }}>
        <div className="row">
          {/* Sidebar - fixed and full height */}
          <div
            className="col-md-2 bg-light border-end vh-100 position-fixed"
            style={{ padding: "1.5rem" }}
          >
            <h6 className="fw-bold mb-3 text-secondary">Recruiter Actions</h6>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <Link
                  to="/RecruiterDashboard/PostJobForm"
                  className="nav-link text-dark"
                >
                  Post Job
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link
                  to="/RecruiterDashboard/PostedJobsList"
                  className="nav-link text-dark"
                >
                  My Posted Jobs
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/RecruiterDashboard/JobApplications"
                  className="nav-link text-dark"
                >
                  Job Applications
                </Link>
              </li>
            </ul>
          </div>

          {/* Main Content - offset by sidebar width */}
          <div
            className="col-md-10 offset-md-2"
            style={{
              padding: "2rem",
              height: "calc(100vh - 70px)",
              overflowY: "auto",
            }}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default RecruiterNavbarLayout;



// import React from "react";
// import { Link, Outlet } from "react-router-dom";

// const RecruiterNavbarLayout = () => {
//   return (
//     <>
//       <nav
//         className="navbar navbar-expand-lg shadow-sm sticky-top"
//         style={{ backgroundColor: "#f0f4f8" }}
//       >
//         <div className="container-fluid px-4 d-flex align-items-center">
//           {/* Brand on the far left */}
//           <span className="navbar-brand fw-bold fs-3 text-primary">Jobular</span>

//           {/* Spacer pushes next content to right */}
//           <div className="flex-grow-1"></div>

//           {/* Search bar - placed just before Home */}
//           <form className="d-flex me-3">
//             <input
//               className="form-control rounded-pill px-3 shadow-sm"
//               type="search"
//               placeholder="Search candidates"
//               aria-label="Search"
//               style={{ width: "250px" }}
//             />
//           </form>

//           {/* Nav links */}
//           <div className="navbar-nav d-flex align-items-center gap-4">
//             <Link className="nav-link fw-semibold text-dark" to="/RecruiterDashboard">
//               Home
//             </Link>
//             <Link className="nav-link fw-semibold text-dark" to="/recruiter/profile">
//               Profile
//             </Link>
//             <Link className="nav-link fw-semibold text-danger" to="/logout">
//               Logout
//             </Link>
//           </div>
//         </div>
//       </nav>

//       {/* Sidebar + Routed content */}
//       <div style={{ display: "flex", minHeight: "100vh" }}>
//         <div
//           style={{ width: "220px", backgroundColor: "#f0f4f8", padding: "1.5rem" }}
//         >
//           <h6 className="fw-bold mb-3 text-secondary">Recruiter Actions</h6>
//           <ul className="nav flex-column">
//             <li className="nav-item mb-2">
//               <Link
//                 to="/RecruiterDashboard/PostJobForm"
//                 className="nav-link text-dark"
//               >
//                 Post Job
//               </Link>
//             </li>
//             <li className="nav-item mb-2">
//               <Link
//                 to="/RecruiterDashboard/PostedJobs"
//                 className="nav-link text-dark"
//               >
//                 My Posted Jobs
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link
//                 to="/RecruiterDashboard/JobApplications"
//                 className="nav-link text-dark"
//               >
//                 Job Applications
//               </Link>
//             </li>
//           </ul>
//         </div>

//         <div style={{ flex: 1, padding: "2rem" }}>
//           <Outlet />
//         </div>
//       </div>
//     </>
//   );
// };

// export default RecruiterNavbarLayout;
