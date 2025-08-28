import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Select from "react-select";
import axios from "axios";

const SkillsModal = ({ show, onHide, availableSkills, selectedSkills, setSelectedSkills, existingSkills, seekerId, onSkillsAdded }) => {
  const skillOptions = availableSkills.map(skill => ({ value: skill.skillId, label: skill.skillName }));

  const handleSaveSkills = async () => {
    if (!seekerId || selectedSkills.length === 0) {
      alert("Please select at least one skill.");
      return;
    }

    const existingSkillIds = existingSkills.map(s => s.skill.skillId);
    const newSkillIds = selectedSkills.map(s => s.value).filter(id => !existingSkillIds.includes(id));

    if (newSkillIds.length === 0) {
      alert("All selected skills are already added.");
      return;
    }

    try {
      const response = await axios.post(`http://localhost:8081/save/${seekerId}`, newSkillIds);
      onSkillsAdded(response.data);
      alert("Skills added successfully!");
      onHide();
      setSelectedSkills([]);
    } catch (error) {
      alert("Failed to save skills.",error);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add Skills</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Select Skills</Form.Label>
          <Select
            isMulti
            options={skillOptions}
            value={selectedSkills}
            onChange={setSelectedSkills}
            closeMenuOnSelect={false}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button variant="primary" onClick={handleSaveSkills}>Save Skills</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SkillsModal;
