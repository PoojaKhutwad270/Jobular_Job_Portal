import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const SeekerEducationSection = () => {
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const [form, setForm] = useState({
    schoolNameSSC: "",
    marksSSC: "",
    schoolNameHSC: "",
    marksHSC: "",
    graduationDegree: "",
    university: "",
    graduationMarks: "",
    passout_year: "",
    experience: "",
    dob: "",
    gender: "",
    resume: ""
  });

  const [education, setEducation] = useState(null);
  const [showForm, setShowForm] = useState(false); // 🔹 Toggle state for form

  useEffect(() => {
    if (loggedInUser?.uid) {
      fetchEducation(loggedInUser.uid);
    }
  }, [loggedInUser]);

  const fetchEducation = async (uid) => {
    try {
      const res = await axios.get(`http://localhost:8081/seeker/getSeeker/${uid}`);
      setEducation(res.data);
      if (res.data) {
        setForm({
          schoolNameSSC: res.data.schoolNameSSC || "",
          marksSSC: res.data.marksSSC || "",
          schoolNameHSC: res.data.schoolNameHSC || "",
          marksHSC: res.data.marksHSC || "",
          graduationDegree: res.data.graduationDegree || "",
          university: res.data.university || "",
          graduationMarks: res.data.graduationMarks || "",
          passout_year: res.data.passout_year?.substring(0, 10) || "",
          experience: res.data.experience || "",
          dob: res.data.dob?.substring(0, 10) || "",
          gender: res.data.gender || "",
          resume: res.data.resume || ""
        });
      }
    } catch (err) {
      console.error("Failed to fetch education:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        user: { uid: loggedInUser.uid }
      };

      const res = await axios.post(`http://localhost:8081/seeker/save/${loggedInUser.uid}`, payload);
      alert("Saved successfully!");
      setEducation(res.data);
      setShowForm(false); // 🔹 Hide form after saving
    } catch (err) {
      console.error("Error saving:", err);
      alert("Failed to save education.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Education Information</h2>

    
      {education && (
        <div className="card p-3 mb-4">
         
          <p><strong>Class X </strong> <br/>{education.schoolNameSSC} - {education.marksSSC}%</p>
          <p><strong>Class XII/ Diploma </strong> {education.schoolNameHSC} - {education.marksHSC}%</p>
          <p><strong>Graduation <br/></strong> {education.graduationDegree} from {education.university} - {education.graduationMarks}%</p>
          <p><strong>Passout Year <br/></strong> {education.passout_year?.substring(0, 4)}</p>
          <p><strong>Experience <br/></strong> {education.experience} years</p>
          <p><strong>DOB <br/></strong> {education.dob?.substring(0, 10)}</p>
          <p><strong>Gender <br/></strong> {education.gender}</p>
        </div>
      )}

     
    {!showForm && (
  <button
    className="btn btn-primary"
    onClick={() => {
      setForm({
        schoolNameSSC: "",
        marksSSC: "",
        schoolNameHSC: "",
        marksHSC: "",
        graduationDegree: "",
        university: "",
        graduationMarks: "",
        passout_year: "",
        experience: "",
        dob: "",
        gender: "",
        resume: ""
      });
      setShowForm(true);
    }}
  >
    Add Education
  </button>
)}


      {/* Education Form */}
      {showForm && (
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="card p-4">
            <h5 className="mb-3">Add/Edit Education</h5>

            <div className="mb-3">
              <label>10th School Name</label>
              <input type="text" className="form-control" name="schoolNameSSC" value={form.schoolNameSSC} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label>10th Marks (%)</label>
              <input type="number" className="form-control" name="marksSSC" value={form.marksSSC} step="0.01" min="0" max="100" onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label>12th School Name</label>
              <input type="text" className="form-control" name="schoolNameHSC" value={form.schoolNameHSC} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label>12th Marks (%)</label>
              <input type="number" className="form-control" name="marksHSC" value={form.marksHSC} step="0.01" min="0" max="100" onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label>Graduation Degree</label>
              <input type="text" className="form-control" name="graduationDegree" value={form.graduationDegree} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label>University</label>
              <input type="text" className="form-control" name="university" value={form.university} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label>Graduation Marks (%)</label>
              <input type="number" className="form-control" name="graduationMarks" value={form.graduationMarks} step="0.01" min="0" max="100" onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label>Passout Year</label>
              <input type="date" className="form-control" name="passout_year" value={form.passout_year} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label>Experience (Years)</label>
              <input type="number" className="form-control" name="experience" value={form.experience} min="0" max="50" onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label>Date of Birth</label>
              <input type="date" className="form-control" name="dob" value={form.dob} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label>Gender</label>
              <select className="form-select" name="gender" value={form.gender} onChange={handleChange} required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mb-3">
              <label>Resume URL</label>
              <input type="text" className="form-control" name="resume" value={form.resume} onChange={handleChange} />
            </div>

            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-success">Save</button>
              <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default SeekerEducationSection;
