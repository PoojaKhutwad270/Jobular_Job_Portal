import { useEffect, useState } from 'react';
import axios from 'axios';

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
     //   const response = await axios.get('/api/jobs'); 
        setJobs(response.data);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const handleViewMore = async (jobId) => {
    try {
     // const res = await axios.get(`/api/jobs/${jobId}`); 
      setSelectedJob(res.data);
      setShowModal(true);
    } catch (err) {
      console.error("Error fetching job details:", err);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8">
          {jobs.map((job) => (
            <div key={job.id} className="card shadow-sm p-4 rounded-4 mb-4">
              <h4 className="text-muted mb-1">
                <strong>{job.companyName}</strong>
              </h4>
              <h6 className="mb-2">{job.title}</h6>
              <p className="text-muted mb-1">
                <strong>Location:</strong>{job.companyCity}
              </p>

              <div className="d-flex justify-content-between">
                <span className="badge bg-light text-dark">
                  Posted: {job.postedAgo || "recently"}
                </span>
                <button
                  className="btn btn-primary me-2"
                  onClick={() => handleViewMore(job.id)}
                >
                  View More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

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
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllJobs;
