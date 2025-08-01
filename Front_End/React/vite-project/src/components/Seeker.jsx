import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AllJobs from './AllJobs'; 

const Seeker = () => {
  const loggedInUser = useSelector((store) => store.loggedInUser);
  const [seeker, setSeeker] = useState(null);
  const navigate = useNavigate();
  const [ jobs, setJobs ] = useState([]);

  useEffect(() => {
    if (!loggedInUser?.uid) return;

    axios
      .get(`http://localhost:8081/seeker/getSeeker/${loggedInUser.uid}`)
      .then((response) => setSeeker(response.data))
      .catch((error) => console.error("Error fetching seeker profile:", error));
  }, [loggedInUser]);

  useEffect(()=>{
    axios
      .get("http://localhost:8081/jobs/getAllJobs")
      .then((response) => { 
        console.log("Jobs Fetched", response.data);
        setJobs(response.data); })
      .catch((error) => console.error("Error fetching jobs posted"))
  }, []);
  return (
    <div className="container mt-5">
      <div className="row">
      
        <div className="col-md-4">
          <div
            className="card shadow-lg p-4 rounded-4 border-0 mb-4"
            style={{ position: 'sticky', top: '50px' }}
          >
             <div>
          <img
            src="https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg"
            alt="Profile"
            className="rounded-circle border shadow-sm"
            width="200"
            height="200"
          />
        </div>

            <h2 className="fw-bold text-primary mb-2">{loggedInUser?.uname}</h2>
            <p className="text-muted">{seeker?.graduationDegree || "Degree not available"}</p>
            <p className="text-muted">{seeker?.university || "University not available"}</p>

            <hr />

          
            <nav className="nav flex-column mt-3">
              <button className="nav-link text-start btn btn-link ">Applied Jobs</button>
              <button className="nav-link text-start btn btn-link">Saved Jobs</button>
              <button className="nav-link text-start btn btn-link"  onClick={() => navigate("/seeker/profile")} >Edit Profile</button>
              <button className="nav-link text-start btn btn-link">Schedule</button>
            </nav>
          </div>
        </div>

       
        <div className="col-md-8">
          <div className="card shadow-lg p-4 rounded-4 border-0 mb-4">
           {jobs.map( job => (
            <div key ={job.jobId} className='mb-4'>
              <h2 className="fw-bold text-primary mb-2">{job.companyName}</h2>
              <p className="text-muted"> {job.jobTitle}</p>
              <p className="text-muted"> {job.location}</p>
            </div>
           ))}

          </div>
          

  
        </div>
      </div>
    </div>
  );
};

export default Seeker;
