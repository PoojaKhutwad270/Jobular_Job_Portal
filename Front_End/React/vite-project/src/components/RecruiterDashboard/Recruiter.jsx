import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Recruiter = () => {
  const loggedInUser = useSelector((store) => store.loggedInUser);

  return (
    <div>
        {/* Welcome Card */}
      <div className="container mt-5">
        <div className="card shadow-lg p-5 rounded-4 border-0">
          <h2 className="text-primary mb-3">Welcome, {loggedInUser?.uname || 'User'}!</h2>
          <p className="fs-5 text-muted" style={{ lineHeight: '1.8' }}>
            hellooo
          </p>
        </div>
      </div>
    </div>
    );
};

export default Recruiter;