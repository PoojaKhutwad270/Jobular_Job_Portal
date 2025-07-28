// NO Routes or Route import needed now
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Seeker = () => {
  const loggedInUser = useSelector((store) => store.loggedInUser);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#8baed2" }}>
        <div className="container-fluid">
          <span className="navbar-brand fw-bold fs-4">Job Portal</span>

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

      <div className="container mt-4">
        <div className="card shadow-sm p-4 rounded-4" style={{ maxHeight: '300px', overflowY: 'auto' }}>
          <h2 className="text-primary">Welcome, {loggedInUser?.uname || 'User'}!</h2>
          <p className="fs-5 text-muted">
            Explore job opportunities tailored for you...
            Explore job opportunities tailored for you...
            Explore job opportunities tailored for you...
            Explore job opportunities tailored for you...
            Explore job opportunities tailored for you...
            Explore job opportunities tailored for you...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Seeker;
