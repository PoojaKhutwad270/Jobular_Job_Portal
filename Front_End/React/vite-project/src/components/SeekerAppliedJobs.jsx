import { useEffect, useState } from "react";
import SeekerNavbar from "./SeekerNavbar";
import axios from "axios";
import { useSelector } from "react-redux";

const SeekerAppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [seeker, setSeeker] = useState(null);
  const loggedInUser = useSelector((state) => state.loggedInUser);

  useEffect(() => {
    if (!loggedInUser?.uid) return;
    axios
      .get(`http://localhost:8081/seeker/getSeeker/${loggedInUser.uid}`)
      .then((response) => setSeeker(response.data))
      .catch((error) => console.error("Error fetching seeker:", error));
  }, [loggedInUser]);

  useEffect(() => {
    if (!seeker?.sid) return;
    axios
      .get(`http://localhost:8081/applications/getAllAppliedJobs/${seeker.sid}`)
      .then((res) => {
        if (res.data) setAppliedJobs(res.data);
      })
      .catch((error) => console.error("Error fetching jobs:", error));
  }, [seeker]);

  const getStatusBadge = (status) => {
    if (status === 1)
      return <span className="badge bg-success">Reviewing</span>;
    if (status === 2)
      return <span className="badge bg-danger">Rejected</span>;
    return <span className="badge bg-warning text-dark">Pending</span>;
  };

  return (
    <>
      <SeekerNavbar />
      <div className="container mt-4">
        <h2 className="fw-bold mb-4">My Applied Jobs</h2>

        {appliedJobs.length === 0 ? (
          <div className="alert alert-info">You haven’t applied to any jobs yet.</div>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {appliedJobs.map((app, index) => {
              const job = app.job;
              const company = job?.company;

              return (
                <div className="col" key={index}>
                  <div className="card h-100 shadow-sm border-0" style={{ backgroundColor: "#f0f4f8"  }}>
                    <div className="card-body">
                      <h5 className="card-title text-primary">{job?.jobTitle}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">{company?.companyName}</h6>

                      <p className="mb-1 text-secondary">
                        <strong>Location:</strong> {company?.location || "Not specified"}
                      </p>

                      <p className="mb-1 text-muted">
                        <strong>Posted:</strong> {new Date(job?.deadline).toLocaleDateString()}
                      </p>

                      <p className="mb-2 text-muted">
                        <strong>Applied:</strong> {new Date(app?.date).toLocaleDateString()}
                      </p>

                      {getStatusBadge(app.status)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style jsx>{`
        .card:hover {
          transform: scale(1.02);
          transition: transform 0.2s ease-in-out;
        }
      `}</style>
    </>
  );
};

export default SeekerAppliedJobs;
