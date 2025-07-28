import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Seeker = () => {
  const loggedInUser = useSelector((store) => store.loggedInUser);

  return (
    <div>
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

      {/* Welcome Card */}
      <div className="container mt-5">
        <div className="card shadow-lg p-5 rounded-4 border-0">
          <h2 className="text-primary mb-3">Welcome, {loggedInUser?.uname || 'User'}!</h2>
          <p className="fs-5 text-muted" style={{ lineHeight: '1.8' }}>
            Explore job opportunities tailored for you. Stay updated with the latest openings that match your skills.
            Apply with a single click and grow your career today!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Seeker;
