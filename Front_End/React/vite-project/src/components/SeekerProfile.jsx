import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from "react-bootstrap";
import Select from "react-select";
import SeekerNavbar from "./SeekerNavbar";

const SeekerProfile = () => {
  const loggedInUser = useSelector((store) => store.loggedInUser);
  const navigate = useNavigate();

  const [seeker, setSeeker] = useState(null);
  const [seekerSkill, setSeekerSkill] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [availableSkills, setAvailableSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleNavigate = (section) => {
    setShowModal(false);
    if (section === "education") {
      navigate("/seeker/add-education");
    } else if (section === "skills") {
      setShowSkillModal(true);
    }
  };

  useEffect(() => {
    if (!loggedInUser?.uid) return;
    axios
      .get(`http://localhost:8081/seeker/getSeeker/${loggedInUser.uid}`)
      .then((response) => setSeeker(response.data))
      .catch((error) => console.error("Error fetching seeker profile:", error));
  }, [loggedInUser]);

  useEffect(() => {
    if (!seeker?.sid) return;
    axios
      .get(`http://localhost:8081/seekerskill/${seeker.sid}`)
      .then((response) => setSeekerSkill(response.data))
      .catch((error) => console.error("Error fetching skills:", error));
  }, [seeker]);

  useEffect(() => {
    if (showSkillModal) {
      axios
        .get("http://localhost:8081/skills/all")
        .then((response) => setAvailableSkills(response.data))
        .catch((error) => console.error("Error fetching skills list:", error));
    }
  }, [showSkillModal]);

  const handleSaveSkills = async () => {
    if (!seeker?.sid || selectedSkills.length === 0) {
      alert("Please select at least one skill.");
      return;
    }

    const existingSkillIds = seekerSkill.map(s => s.skill.skillId);
    const newSkillIds = selectedSkills
      .map(s => s.value)
      .filter(id => !existingSkillIds.includes(id));

    if (newSkillIds.length === 0) {
      alert("All selected skills are already added.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8081/save/${seeker.sid}`,
        newSkillIds
      );

      const newlySavedSkills = response.data;
      setSeekerSkill(prev => [...prev, ...newlySavedSkills]);
      alert("Skills added successfully!");
      setShowSkillModal(false);
      setSelectedSkills([]);
    } catch (error) {
      console.error("Error saving skills:", error);
      alert("Failed to save skills.");
    }
  };

  const handleRemoveSkill = async (seekerSkillId) => {
    try {
      await axios.delete(`http://localhost:8081/delete/${seeker.sid}/${seekerSkillId}`);
      setSeekerSkill(prev => prev.filter(skill => skill.seekerSkillId !== seekerSkillId));
      alert("deleted")

    } catch (error) {
      console.error("Error removing skill:", error);
      alert("Failed to remove skill.");
    }
  };

  const skillOptions = availableSkills.map(skill => ({
    value: skill.skillId,
    label: skill.skillName
  }));

  return (
    <>
    <SeekerNavbar/>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            <div className="artdeco-card mb-4 shadow-sm p-4 rounded-4 border border-light-subtle" style={{ position: "sticky", top: "50px", backgroundColor: "#fff" }}>
              <div style={{ height: "80px", backgroundColor: "#e8eef5", borderRadius: "10px 10px 0 0", margin: "-24px -24px 24px" }}></div>
              <div className="d-flex">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg"
                  alt="Profile"
                  className="rounded-circle border border-white shadow me-3"
                  width="70"
                  height="70"
                />
                <div>
                  <h5 className="fw-bold text-primary mb-1">
                    <strong>{loggedInUser?.uname}</strong>
                  </h5>
                  <p className="text-muted mb-1">
                    <strong>{seeker?.graduationDegree || "Degree not available"}</strong>
                  </p>
                  <p className="text-muted">{seeker?.university || "University not available"}</p>
                </div>
              </div>
              <button className="btn btn-primary w-100 mt-3" onClick={handleShow}>Add Profile Section</button>
            </div>
          </div>

          <div className="col-md-8">
            <div className="card shadow-sm p-4 rounded-4 border-0 mb-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fs-4 fw-bold text-dark m-0">Education</h2>
                <button className="btn btn-primary" onClick={() => navigate("/seeker/add-education")}>Add +</button>
              </div>
              {seeker ? (
                <ul className="list-unstyled">
                  <li className="mb-3">
                    <h5>{seeker.graduationDegree}</h5>
                    <p className="text-muted mb-1">{seeker.university} – {seeker.graduationMarks}</p>
                    <p><strong>Class X </strong><br />{seeker.schoolNameSSC} <br />{seeker.marksSSC}%</p>
                    <p><strong>Class XII/ Diploma </strong><br />{seeker.schoolNameHSC} <br />{seeker.marksHSC}%</p>
                    <p><strong>Experience </strong><br />{seeker.experience} years</p>
                    <p><strong>DOB</strong> <br />{seeker.dob?.substring(0, 10)}</p>
                    <p><strong>Gender</strong> <br />{seeker.gender}</p>
                  </li>
                </ul>
              ) : (
                <p className="text-muted">Loading education details...</p>
              )}
            </div>

            <div className="card shadow-sm p-4 rounded-4 border-0">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fs-4 fw-bold text-dark m-0">Skills</h2>
                <button className="btn btn-primary" onClick={() => setShowSkillModal(true)}>Add +</button>
              </div>
              <ul className="list-unstyled d-flex flex-wrap gap-3">
                {seekerSkill.map((skill) => (
                  <li key={skill.seekerSkillId}>
                    <div className="d-flex align-items-center bg-light border rounded px-2 py-1 shadow-sm">
                      <span className="text-primary fw-semibold me-2">{skill.skill?.skillName}</span>
                      <button
                        className="btn btn-sm btn-close py-1 px-1"
                        aria-label="Remove"
                        onClick={() => handleRemoveSkill(skill.seekerSkillId)}
                      ></button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Section Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select Profile Section</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button className="w-100 mb-2" variant="outline-primary" onClick={() => handleNavigate("education")}>Add Education</Button>
          <Button className="w-100" variant="outline-success" onClick={() => handleNavigate("skills")}>Add Skills</Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        </Modal.Footer>
      </Modal>

      {/* Skill Modal */}
      <Modal show={showSkillModal} onHide={() => setShowSkillModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Skills</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Select Skills</Form.Label>
            <Select
              isMulti
              options={skillOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              value={selectedSkills}
              onChange={setSelectedSkills}
              closeMenuOnSelect={false} // ✅ Keeps dropdown open
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSkillModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSaveSkills}>Save Skills</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SeekerProfile;
