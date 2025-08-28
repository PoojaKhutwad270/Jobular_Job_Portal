import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import SeekerNavbar from './SeekerNavbar';
import SeekerProfileCard from './SeekerProfileCard';
import SeekerJobCard from './SeekerJobCard';
import SeekerJobDetailsModal from './SeekerJobDetailsModal';

const SeekerDashboard = () => {
  const loggedInUser = useSelector((store) => store.loggedInUser);
  const [seeker, setSeeker] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  //const [message, setMessage] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.search) setSearchTerm(location.state.search);
    if (location.state?.experience) setExperienceFilter(location.state.experience);
    if (location.state?.location) setLocationFilter(location.state.location);
  }, [location.state]);

  useEffect(() => {
    if (!loggedInUser?.uid) return;
    axios.get(`http://localhost:8081/seeker/getSeeker/${loggedInUser.uid}`)
      .then(res => setSeeker(res.data))
      .catch(err => console.error("Seeker fetch error:", err));
  }, [loggedInUser]);

  useEffect(() => {
    axios.get("http://localhost:8081/jobs/getAllJobs")
      .then(res => {
        setJobs(res.data);
        setFilteredJobs(res.data);
      })
      .catch(err => console.error("Jobs fetch error:", err));
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase().trim();
    const filtered = jobs.filter((job) => {
      const matchesSearch =
        job.jobTitle?.toLowerCase().includes(term) ||
        job.company?.companyName?.toLowerCase().includes(term);
      const matchesExperience =
        experienceFilter === "" || job.experience >= parseInt(experienceFilter);
      const matchesLocation =
        locationFilter === "" || job.company?.location === locationFilter;
      return matchesSearch && matchesExperience && matchesLocation;
    });
    setFilteredJobs(filtered);
  }, [searchTerm, experienceFilter, locationFilter, jobs]);

  const handleViewMore = async (jobId) => {
    try {
      const res = await axios.get(`http://localhost:8081/jobs/getJob/${jobId}`);
      setSelectedJob(res.data);
      setShowModal(true);
    } catch (err) {
      console.error("Job details fetch error:", err);
    }
  };

  const handleApply = async (jobId) => {
    const seekerId = seeker?.sid;
    if (!seekerId) return;
    const appData = {
      seeker: { sid: parseInt(seekerId) },
      job: { reqid: parseInt(jobId) },
      date: new Date().toISOString(),
      status: 0,
    };
    try {
      await axios.post("http://localhost:8081/applications/save", appData);
      alert("Applied successfully!");
    } catch (err) {
      console.error("Application error:", err);
    }
  };

  const handleEditClick = () => setShowEditModal(true);
  const handleNavigateToSection = (section) => {
    setShowEditModal(false);
    navigate(`/seeker/${section}`);
  };

  return (
    <>
      <SeekerNavbar
  onSearch={(term) => setSearchTerm(term)}
  onFilterChange={({ experience, location }) => {
    setExperienceFilter(experience);
    setLocationFilter(location);
  }}
/>


        <div className="row">
          <div className="col-md-3">
            <SeekerProfileCard seeker={seeker} loggedInUser={loggedInUser} onEditClick={handleEditClick} />
          </div>

          <div className="col-md-8">
            <div className="card shadow-sm p-3 rounded-4 border border-light-subtle mb-4 bg-white">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <SeekerJobCard key={job.jobId} job={job} onViewMore={handleViewMore} />
                ))
              ) : (
                <p className="text-muted">No jobs found.</p>
              )}
            </div>
          </div>
        </div>

        {showModal && selectedJob && (
          <SeekerJobDetailsModal
            job={selectedJob}
            onClose={() => setShowModal(false)}
            onApply={handleApply}
          />
        )}

        {showEditModal && (
          <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>Select Profile Section</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Button className="w-100 mb-2" variant="outline-primary" onClick={() => handleNavigateToSection("education")}>
                Add Education
              </Button>
              <Button className="w-100" variant="outline-success" onClick={() => handleNavigateToSection("skills")}>Add Skills</Button>
            </Modal.Body>
          </Modal>
        )}
     
    </>
  );
};

export default SeekerDashboard;
