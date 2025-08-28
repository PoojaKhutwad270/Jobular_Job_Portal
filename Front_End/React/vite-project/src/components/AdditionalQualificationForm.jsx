// AdditionalQualificationForm.jsx
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const AdditionalQualificationForm = ({ seekerId, show, handleClose, onSave }) => {
  const [formData, setFormData] = useState({
    qname: "",
    marks: "",
    specialization: "",
    university: "",
    grade: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // For marks, allow only numeric values
    if (name === "marks") {
      // Allow empty or valid float number
      if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
  if (!formData.qname || !formData.university) {
    alert("Please fill qualification name and university.");
    return;
  }

  try {
     console.log("seeker id is:"+seekerId);
    await axios.post(`http://localhost:8081/additionalQualifications/seeker/${seekerId}`, {
  ...formData,
  marks: formData.marks === "" ? 0 : parseFloat(formData.marks),
  seeker: { sid: seekerId },
});

    alert("Additional Qualification added successfully!");
    onSave();
    handleClose();
    setFormData({
      qname: "",
      marks: "",
      specialization: "",
      university: "",
      grade: "",
    });
  } catch (err) {
    console.error(err);
    alert("Failed to add qualification.");
  }
};


  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Additional Qualification</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Qualification Name</Form.Label>
            <Form.Control
              type="text"
              name="qname"
              value={formData.qname}
              onChange={handleChange}
              placeholder="e.g. Diploma in Computer Science"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>University/Institution</Form.Label>
            <Form.Control
              type="text"
              name="university"
              value={formData.university}
              onChange={handleChange}
              placeholder="University or Institution name"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Marks</Form.Label>
            <Form.Control
              type="text"
              name="marks"
              value={formData.marks}
              onChange={handleChange}
              placeholder="Marks or Percentage"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Specialization</Form.Label>
            <Form.Control
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              placeholder="Specialization (optional)"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Grade</Form.Label>
            <Form.Control
              type="text"
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              placeholder="Grade (optional)"
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        <Button variant="primary" onClick={handleSubmit}>Save Qualification</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AdditionalQualificationForm;
