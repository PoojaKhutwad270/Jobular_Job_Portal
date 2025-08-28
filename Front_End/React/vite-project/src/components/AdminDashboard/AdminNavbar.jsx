import React from 'react'
import { Link } from 'react-router-dom'

const AdminNavbar = () => {
  return (
      <div>
          

<div className="container"></div>
<nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container-fluid">
          <span className="navbar-brand fw-bold">Admin Panel</span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#adminNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="adminNavbar">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link className="nav-link" to="/admin">Dashboard</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/admin/allusers">Users</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/admin/alljobs">Jobs</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/admin/allrequests">Requests</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/admin/allreports">Reports</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/admin/adminProfile">Profile</Link></li>
            </ul>
           <Link to="/logout" ><button className="btn btn-outline-light">Logout</button></Link>
          </div>
        </div>
      </nav>

      <div className="container mt-5">
        <div className="row"></div>

</div>

    </div>
  )
}

export default AdminNavbar

