import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import SeekerNavbar from "./SeekerNavbar";

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

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const res = await axios.get(`http://localhost:8081/seeker/getSeeker/${loggedInUser.uid}`);
        if (res.data) {
          setForm(res.data); // populate form with existing data
        }
      } catch (error) {
        console.log("No existing data or fetch failed", error);
      }
    };
    fetchEducation();
  }, [loggedInUser.uid]);

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
      console.log("res",res);
    } catch (err) {
      console.error("Error saving:", err);
      alert("Failed to save education.");
    }
  };

  return (
    <>
    <SeekerNavbar/>
    <div className="container mt-5">
      <form className="p-4 border rounded bg-light shadow-sm" onSubmit={handleSubmit}>
        <h4 className="mb-4 text-primary">Education Details</h4>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label>10th School Name</label>
            <input type="text" className="form-control" name="schoolNameSSC" value={form.schoolNameSSC} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label>10th Marks (%)</label>
            <input type="number" className="form-control" name="marksSSC" value={form.marksSSC} step="0.01" min="0" max="100" onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label>12th School Name</label>
            <input type="text" className="form-control" name="schoolNameHSC" value={form.schoolNameHSC} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label>12th / Diploma Marks (%)</label>
            <input type="number" className="form-control" name="marksHSC" value={form.marksHSC} step="0.01" min="0" max="100" onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label>Graduation Degree</label>
            <input type="text" className="form-control" name="graduationDegree" value={form.graduationDegree} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label>University</label>
            <input type="text" className="form-control" name="university" value={form.university} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label>Graduation Marks (%)</label>
            <input type="number" className="form-control" name="graduationMarks" value={form.graduationMarks} step="0.01" min="0" max="100" onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label>Passout Year</label>
            <input type="date" className="form-control" name="passout_year" value={form.passout_year} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label>Experience (Years)</label>
            <input type="number" className="form-control" name="experience" value={form.experience} min="0" max="50" onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label>Date of Birth</label>
            <input type="date" className="form-control" name="dob" value={form.dob} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label>Gender</label>
            <select className="form-select" name="gender" value={form.gender} onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="col-md-6 mb-3">
            <label>Resume URL</label>
            <input type="text" className="form-control" name="resume" value={form.resume} onChange={handleChange} />
          </div>
        </div>

        <div className="text-end">
          <button type="submit" className="btn btn-primary">Save</button>
        </div>
      </form>
    </div>
    </>
  );
};

export default SeekerEducationSection;
