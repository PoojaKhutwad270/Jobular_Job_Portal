import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { FaHome, FaUser, FaSignOutAlt } from "react-icons/fa";
//import axios from "axios";

const SeekerNavbar = ({ onSearch, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [experience, setExperience] = useState("");

  // Emit search/filter values
  useEffect(() => {
    if (onSearch) onSearch(searchTerm);
    if (onFilterChange) onFilterChange({ experience });
  }, [searchTerm, experience]);

  return (
    <>
      <nav className="navbar navbar-expand-lg shadow-sm sticky-top" style={{ backgroundColor: "#f0f4f8" }}>
        <div className="container-fluid px-4">
          <span className="navbar-brand fw-bold fs-3 text-primary">Jobular</span>

          <div className="d-flex ms-auto align-items-center gap-3">
            <input
              className="form-control rounded-pill px-3 shadow-sm"
              type="search"
              placeholder="Search jobs or companies"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: "250px" }}
            />

            <select
              className="form-select shadow-sm"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              style={{ width: "140px" }}
            >
              <option value="">Apply Filter</option>
              <option value="0">0+ yrs</option>
              <option value="1">1+ yrs</option>
              <option value="2">2+ yrs</option>
              <option value="3">3+ yrs</option>
              <option value="5">5+ yrs</option>
            </select>

            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => {
                setSearchTerm("");
                setExperience("");
              }}
            >
              Clear
            </button>
          </div>

          <div className="navbar-nav d-flex align-items-center gap-3 ms-4">
            <Link className="nav-link fw-semibold text-dark d-flex align-items-center gap-1" to="/seeker">
              <FaHome /> Home
            </Link>
            <Link className="nav-link fw-semibold text-dark d-flex align-items-center gap-1" to="/seeker/profile">
              <FaUser /> Profile
            </Link>
            <Link className="nav-link fw-semibold text-danger d-flex align-items-center gap-1" to="/logout">
              <FaSignOutAlt /> Logout
            </Link>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  );
};

export default SeekerNavbar;
