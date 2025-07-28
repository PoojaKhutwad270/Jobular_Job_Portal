import React from "react";
import { Link, Outlet } from "react-router-dom";

const SeekerLayout = () => {
  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#8baed2" }}>
        <div className="container-fluid">
          <span className="navbar-brand fw-bold fs-4">Job Portal</span>
          <form className="d-flex ms-auto me-3">
            <input className="form-control" type="search" placeholder="Search" aria-label="Search" style={{ width: '250px' }} />
          </form>
          <div className="navbar-nav">
            <Link className="nav-link mx-2 fw-semibold text-dark" to="/seeker">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24" className="me-1">
                <path d="M23 9v2h-2v7a3 3 0 01-3 3h-4v-6h-4v6H6a3 3 0 01-3-3v-7H1V9l11-7 5 3.18V2h3v5.09z" />
              </svg> 
              Home
            </Link>
            <Link className="nav-link mx-2 fw-semibold text-dark" to="/SeekerProfile">Profile</Link>
            <Link className="nav-link mx-2 fw-semibold text-dark" to="/jobs">Jobs</Link>
            <Link className="nav-link mx-2 fw-semibold text-dark" to="/logout">Log Out</Link>
          </div>
        </div>
      </nav>

      {/* Outlet renders nested route content */}
      <Outlet />
    </>
  );
};

export default SeekerLayout;
