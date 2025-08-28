import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form } from "react-bootstrap";
import Select from "react-select";
import SeekerNavbar from "./SeekerNavbar";
import SeekerProfileCard from "./SeekerProfileCard";
import AdditionalQualificationForm from "./AdditionalQualificationForm";
import AdditionalQualificationsList from "./AdditionalQualificationList";

const SeekerProfile = () => {
  const loggedInUser = useSelector((store) => store.loggedInUser);
  const navigate = useNavigate();

  const [seeker, setSeeker] = useState();
  const [seekerSkill, setSeekerSkill] = useState([]);
  const [additionalQualifications, setAdditionalQualifications] = useState([]);

  const [showSkillModal, setShowSkillModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddQualModal, setShowAddQualModal] = useState(false);

  const [availableSkills, setAvailableSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const [editEducation, setEditEducation] = useState({
    graduationDegree: "",
    university: "",
    graduationMarks: "",
    schoolNameSSC: "",
    marksSSC: "",
    schoolNameHSC: "",
    marksHSC: "",
    experience: "",
    dob: "",
    gender: "",
  });

  useEffect(() => {
    if (!loggedInUser?.uid) return;

    axios
      .get(`http://localhost:8081/seeker/getSeeker/${loggedInUser.uid}`)
      .then((res) => setSeeker(res.data))
      .catch((err) => console.error("Error fetching seeker profile:", err));
  }, [loggedInUser]);

  useEffect(() => {
    if (!seeker?.sid) return;

    axios
      .get(`http://localhost:8081/seekerskill/${seeker.sid}`)
      .then((res) => setSeekerSkill(res.data))
      .catch((err) => console.error("Error fetching skills:", err));
  }, [seeker?.sid]);

  useEffect(() => {
    refreshQualifications();
  }, [seeker?.sid]);

  useEffect(() => {
    if (showSkillModal) {
      axios
        .get("http://localhost:8081/skills/all")
        .then((res) => setAvailableSkills(res.data))
        .catch((err) => console.error("Error fetching skills list:", err));
    }
  }, [showSkillModal]);

  const refreshQualifications = () => {
    if (!seeker?.sid) return;

    axios
      .get(`http://localhost:8081/additionalQualifications/seeker/${seeker.sid}`)
      .then((res) => setAdditionalQualifications(res.data))
      .catch((err) =>
        console.error("Error fetching additional qualifications:", err)
      );
  };

  const handleSaveSkills = async () => {
    if (!seeker?.sid || selectedSkills.length === 0) {
      alert("Please select at least one skill.");
      return;
    }

    const existingSkillIds = seekerSkill.map((s) => s.skill.skillId);
    const newSkillIds = selectedSkills
      .map((s) => s.value)
      .filter((id) => !existingSkillIds.includes(id));

    if (newSkillIds.length === 0) {
      alert("All selected skills are already added.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8081/save/${seeker.sid}`,
        newSkillIds
      );

      setSeekerSkill((prev) => [...prev, ...response.data]);
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
      await axios.delete(
        `http://localhost:8081/delete/${seeker.sid}/${seekerSkillId}`
      );
      setSeekerSkill((prev) =>
        prev.filter((skill) => skill.seekerSkillId !== seekerSkillId)
      );
      alert("Skill removed successfully.");
    } catch (error) {
      console.error("Error removing skill:", error);
      alert("Failed to remove skill.");
    }
  };

  const openEditModal = () => {
    setEditEducation({
      graduationDegree: seeker?.graduationDegree ?? "",
      university: seeker?.university ?? "",
      graduationMarks: seeker?.graduationMarks ?? "",
      schoolNameSSC: seeker?.schoolNameSSC ?? "",
      marksSSC: seeker?.marksSSC ?? "",
      schoolNameHSC: seeker?.schoolNameHSC ?? "",
      marksHSC: seeker?.marksHSC ?? "",
      experience: seeker?.experience ?? "",
      dob: seeker?.dob?.substring(0, 10) ?? "",
      gender: seeker?.gender ?? "",
    });
    setShowEditModal(true);
  };

  const handleUpdateEducation = async () => {
    try {
      const updatedData = { ...seeker, ...editEducation };
      const res = await axios.put(
        `http://localhost:8081/seeker/update/${seeker.sid}`,
        updatedData
      );
      setSeeker(res.data);
      setShowEditModal(false);
      alert("Education details updated successfully.");
    } catch (error) {
      console.error("Error updating education:", error);
      alert("Failed to update education.");
    }
  };

  const skillOptions = availableSkills.map((skill) => ({
    value: skill.skillId,
    label: skill.skillName,
  }));

  return (
    <>
      <SeekerNavbar />

      <div className="container-fluid" style={{ paddingLeft: 0 }}>
        <div className="row">
          {/* Sidebar */}
          <aside
            className="col-md-3 bg-light border-end vh-100 position-fixed p-4 pt-5"
            style={{ top: "70px", overflowY: "auto" }}
          >
            <SeekerProfileCard seeker={seeker} loggedInUser={loggedInUser} />
          </aside>

          {/* Main content */}
          <main
            className="col-md-9 offset-md-3 px-4 pt-5"
            style={{
              height: "calc(100vh - 70px)",
              overflowY: "auto",
            }}
          >
            {/* Education Card */}
            <section className="card shadow-sm rounded-4 border-0 mb-5 p-4">
              <header className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fs-4 fw-bold text-dark m-0">Education</h2>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={openEditModal}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => navigate("/seeker/add-education")}
                  >
                    Add +
                  </button>
                </div>
              </header>

              {seeker ? (
                <ul className="list-unstyled mb-0">
                  <li className="mb-3">
                    <h5 className="fw-semibold">{seeker.graduationDegree}</h5>
                    <p className="text-muted mb-1">
                      {seeker.university} – {seeker.graduationMarks}
                    </p>
                    <p className="mb-1">
                      <strong>Class X</strong> <br />
                      {seeker.schoolNameSSC} <br />
                      {seeker.marksSSC}%
                    </p>
                    <p className="mb-1">
                      <strong>Class XII / Diploma</strong> <br />
                      {seeker.schoolNameHSC} <br />
                      {seeker.marksHSC}%
                    </p>
                    <p className="mb-1">
                      <strong>Experience</strong> <br />
                      {seeker.experience} years
                    </p>
                    <p className="mb-1">
                      <strong>Date of birth</strong> <br />
                      {seeker.dob?.substring(0, 10)}
                    </p>
                    <p className="mb-0">
                      <strong>Gender</strong> <br />
                      {seeker.gender}
                    </p>
                  </li>
                </ul>
              ) : (
                <p className="text-muted">Loading education details...</p>
              )}
            </section>

            {/* Additional Qualifications Card */}
            <section className="card shadow-sm rounded-4 border-0 mb-5 p-4">
              <header className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fs-4 fw-bold text-dark m-0">
                  Additional Qualifications
                </h2>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => setShowAddQualModal(true)}
                >
                  Add +
                </button>
              </header>

              <AdditionalQualificationsList qualifications={additionalQualifications} />
            </section>

            {/* Skills Card */}
            <section className="card shadow-sm rounded-4 border-0 p-4">
              <header className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fs-4 fw-bold text-dark m-0">Skills</h2>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => setShowSkillModal(true)}
                >
                  Add +
                </button>
              </header>
              <ul className="list-unstyled d-flex flex-wrap gap-3 mb-0">
                {seekerSkill.map((skill) => (
                  <li key={skill.seekerSkillId}>
                    <div className="d-flex align-items-center bg-light border rounded px-3 py-1 shadow-sm">
                      <span className="text-primary fw-semibold me-2">
                        {skill.skill?.skillName}
                      </span>
                      <button
                        className="btn btn-sm btn-close p-1"
                        aria-label="Remove"
                        onClick={() => handleRemoveSkill(skill.seekerSkillId)}
                      ></button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </main>
        </div>
      </div>

      {/* Additional Qualification Modal */}
      <AdditionalQualificationForm
        seekerId={seeker?.sid}
        show={showAddQualModal}
        handleClose={() => setShowAddQualModal(false)}
        onSave={() => {
          setShowAddQualModal(false);
          refreshQualifications();
        }}
      />

      {/* Skill Modal */}
      <Modal show={showSkillModal} onHide={() => setShowSkillModal(false)} centered>
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
              closeMenuOnSelect={false}
              placeholder="Choose one or more skills"
              styles={{
                control: (base) => ({ ...base, minHeight: 40 }),
              }}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowSkillModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveSkills}>
            Save Skills
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Education Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Education</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {[
              { label: "Graduation Degree", key: "graduationDegree" },
              { label: "University", key: "university" },
              { label: "Graduation Marks", key: "graduationMarks" },
              { label: "Class X School Name", key: "schoolNameSSC" },
              { label: "Class X Marks", key: "marksSSC" },
              { label: "Class XII / Diploma School", key: "schoolNameHSC" },
              { label: "Class XII / Diploma Marks", key: "marksHSC" },
              { label: "Experience (years)", key: "experience" },
            ].map((field) => (
              <Form.Group className="mb-3" key={field.key}>
                <Form.Label>{field.label}</Form.Label>
                <Form.Control
                  type="text"
                  value={editEducation[field.key] ?? ""}
                  onChange={(e) =>
                    setEditEducation({
                      ...editEducation,
                      [field.key]: e.target.value,
                    })
                  }
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                />
              </Form.Group>
            ))}

            <Form.Group className="mb-3">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                value={editEducation.dob ?? ""}
                onChange={(e) =>
                  setEditEducation({ ...editEducation, dob: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Select
                value={editEducation.gender ?? ""}
                onChange={(e) =>
                  setEditEducation({ ...editEducation, gender: e.target.value })
                }
              >
                <option value="">Select gender</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdateEducation}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SeekerProfile;
