import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SeekerNavbar from './SeekerNavbar';

const SeekerDashboard = () => {
  const loggedInUser = useSelector((store) => store.loggedInUser);
  const [seeker, setSeeker] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

 
  useEffect(() => {
    if (!loggedInUser?.uid) return;

    axios
      .get(`http://localhost:8081/seeker/getSeeker/${loggedInUser.uid}`)
      .then((response) => setSeeker(response.data))
      .catch((error) => console.error("Error fetching seeker profile:", error));
  }, [loggedInUser]);

  
  useEffect(() => {
    axios
      .get("http://localhost:8081/jobs/getAllJobs")
      .then((response) => {
        console.log("Jobs Fetched", response.data);
        setJobs(response.data);
      })
      .catch((error) => console.error("Error fetching jobs posted"));
  }, []);

  const handleViewMore = async (jobId) => {
    try {
      const res = await axios.get(`http://localhost:8081/jobs/getJob/${jobId}`);
      setSelectedJob(res.data);
      setShowModal(true);
    } catch (err) {
      console.error("Error fetching job details:", err);
    }
  };

const handleApply = async (jobId) => {
  const seekerId = seeker?.sid; 
  console.log(seekerId);
  if (!seekerId) {
    console.error("Seeker ID not found. Make sure seeker data is loaded.");
    return;
  }

  const applicationData = {
  seeker: { sid: parseInt(seekerId) },
  job: { reqid: parseInt(jobId) },
  date: new Date().toISOString(), 
  status: 0 
};


  console.log("Submitting application:", applicationData);

  try {
    await axios.post('http://localhost:8081/applications/save', applicationData);
    alert("Applied successfully!");
  } catch (error) {
    console.error("Error applying to job:", error);
  }
};






  return (
    <>
      <SeekerNavbar />
      <div className="container mt-5">
        {message && (
          <div className="alert alert-info alert-dismissible fade show" role="alert">
            {message}
            <button type="button" className="btn-close" onClick={() => setMessage("")}></button>
          </div>
        )}
        <div className="row">
          <div className="col-md-3">
            <div
              className="artdeco-card mb-3 overflow-hidden shadow-sm profile-card border rounded-4 p-3"
              style={{
                position: 'sticky',
                top: '50px',
                backgroundColor: '#fff',
                borderColor: '#ccc',
              }}
            >
              <div
                style={{
                  height: '80px',
                  backgroundColor: '#e8eef5',
                  borderRadius: '10px 10px 0 0',
                }}
              ></div>

              <div className="d-flex mt-n4">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg"
                  alt="Profile"
                  className="rounded-circle border border-2 border-white shadow me-3"
                  width="70"
                  height="70"
                />
                <div className="d-flex flex-column justify-content-center">
                  <h6 className="fw-bold text-primary mb-1">{loggedInUser?.uname}</h6>
                  <p className="text-muted mb-1 small">{seeker?.graduationDegree || "Degree not available"}</p>
                  <p className="text-muted small">{seeker?.university || "University not available"}</p>
                </div>
              </div>

              <hr />

              <nav className="nav flex-column">
                <button className="nav-link text-start btn btn-link px-0 py-1" onClick={()=>navigate("/seeker/appliedjobs")}>Applied Jobs</button>
                <button className="nav-link text-start btn btn-link px-0 py-1">Saved Jobs</button>
                <button
                  className="nav-link text-start btn btn-link px-0 py-1"
                  onClick={() => navigate("/seeker/profile")}
                >
                  Edit Profile
                </button>
                <button className="nav-link text-start btn btn-link px-0 py-1">Schedule</button>
              </nav>
            </div>
          </div>

          <div className="col-md-8">
            <div className="card shadow-sm p-3 rounded-4 border border-light-subtle mb-4 bg-white">
              {jobs.map((job) => (
                <div
                  key={job.jobId}
                  className="p-3 mb-3 shadow-sm rounded-3"
                  style={{ backgroundColor: "#f9fbfc" }}
                >
                  <h5 className="text-primary fw-bold mb-1">{job.companyName}</h5>
                  <p className="mb-1 text-muted">
                    <strong>Role:</strong> {job.jobTitle}
                  </p>
                  <p className="mb-3 text-muted">
                    <strong>Location:</strong> {job.location}
                  </p>
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => handleViewMore(job.jobId)}
                  >
                    View More
                  </button>
                </div>
              ))}
            </div>

            {/* MODAL */}
            {showModal && selectedJob && (
              <div
                className="modal fade show d-block"
                tabIndex="-1"
                style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
              >
                <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">{selectedJob.title}</h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => setShowModal(false)}
                      />
                    </div>
                    <div className="modal-body">
                      <p><strong>Company:</strong> {selectedJob.companyName}</p>
                      <p><strong>City:</strong> {selectedJob.companyCity}</p>
                      <p><strong>Description:</strong> {selectedJob.description}</p>
                      <p><strong>Salary:</strong> {selectedJob.salary}</p>
                      <hr />
                      <p><strong>HR Email:</strong> {selectedJob.hrEmail}</p>
                      <p><strong>HR Mobile:</strong> {selectedJob.hrMobile}</p>
                    </div>
                    <div className="modal-footer">
                      <button className="btn btn-primary" onClick={() => setShowModal(false)}>
                        Close
                      </button>
                      <button className="btn btn-primary" onClick={()=>handleApply(selectedJob.jobId)}>
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
           
          </div>
        </div>
      </div>
    </>
  );
};

export default SeekerDashboard;
