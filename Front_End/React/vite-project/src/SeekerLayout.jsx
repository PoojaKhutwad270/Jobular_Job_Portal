import React from "react";
import { Link, Outlet } from "react-router-dom"; // ✅ Include Outlet

const SeekerNavbarLayout = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg shadow-sm" style={{ backgroundColor: "#f0f4f8" }}>
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
            <Link className="nav-link fw-semibold text-dark" to="/seeker/profile">Profile</Link>
            <Link className="nav-link fw-semibold text-dark" to="/seeker/jobs">Jobs</Link>
            <Link className="nav-link fw-semibold text-danger" to="/seeker/logout">Logout</Link>
          </div>
        </div>
      </nav>

      {/* 👇 This renders nested routes like <Seeker /> */}
      <Outlet />
    </>
  );
};

export default SeekerNavbarLayout;
