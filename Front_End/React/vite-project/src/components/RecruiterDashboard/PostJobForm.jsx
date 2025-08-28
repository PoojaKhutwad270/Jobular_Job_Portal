import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
//import { useSelector } from "react-redux";

const PostJobForm = () => {
  const user = useSelector((state) => state.user);
  const uid = user?.uid;

  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [companyName, setCompanyName] = useState("");
  

  const [formData, setFormData] = useState({
   cid:"",
    job_title: "",
    salary: "",        // will hold salary range key, e.g. "30000"
    experience: "",
    deadline: "",
    role_description: "",
  });

  // Salary options as objects with value as number
  const salaryRanges = [
    { label: "1-3 LPA", value: 10000 },
    { label: "4-6 LPA", value: 30000 },
    { label: "7-9 LPA", value: 60000 },
    { label: "10-12 LPA", value: 90000 },
    { label: "13-15 LPA", value: 120000 },
    { label: "16-18 LPA", value: 150000 },
    { label: "19-20 LPA", value: 180000 },
  ];

  useEffect(() => {
    axios
      .get("https://localhost:7269/api/SkillSet/GetSkillSets")
      .then((res) => setSkills(res.data))
      .catch((err) => console.error("Failed to load skills", err));
  }, [])
  
  useEffect(() => {
    fetch(`https://localhost:7269/api/Company/GetCompanyById/${uid}`).then(data => data.json()).then(res => {
      setCompanyName(res.cname);
    })
})

  // useEffect(() => {
         
  //   if (uid) {
  //     // axios
  //     //   .get(`https://localhost:7269/api/Company/GetCompanyById/${uid}`)
      
  //     axios
  //       .get(`https://localhost:7269/api/Company/GetCompanyById/6`).then((res) => {
        
  //         setCompanyName(res.data.cname);
  //      console.log(res);
  //         setFormData((prev) => ({
  //     ...prev,
  //     cid: res.data.cid,
  //   }),);
          
  //       })
  //       .catch((err) => console.error("Failed to fetch company", err));
  //   }
  // }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillChange = (e) => {
    const selectedId = Number(e.target.value);
    if (selectedId && !selectedSkills.includes(selectedId)) {
      setSelectedSkills((prev) => [...prev, selectedId]);
    }
    e.target.value = "";
  };

  const handleRemoveSkill = (id) => {
    setSelectedSkills((prev) => prev.filter((skillId) => skillId !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedSkills.length === 0) {
      alert("Please select at least one skill.");
      return;
    }

    // Convert salary string to number from salaryRanges array
    const salaryNumber =
      salaryRanges.find((range) => range.label === formData.salary)?.value || 0;

    const jobPayload = {
      cid: formData.cid,
      job_title: formData.job_title,
      salary: salaryNumber,       // number format
      experience: parseInt(formData.experience),
      deadline: formData.deadline,
      role_description: formData.role_description,
      skillIds: selectedSkills,
    };

    try {
      console.log(jobPayload);
      const response = await axios.post(
        "https://localhost:7269/api/job_requirement/PostJob",
        jobPayload
      );
      
      alert("Job posted successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Failed to post job.");
    }
  };

  return (
    <div className="container mt-2">
      <h3 className="mb-4 text-center text-primary-emphasis bg-primary-subtle py-2 rounded shadow-sm">
        <i className="bi bi-briefcase me-2"></i>
        <span className="fw-semibold">Post a Job</span>
      </h3>
      <form className="p-4 border rounded shadow" onSubmit={handleSubmit}>
        {/* Company Name (Non-editable) */}
        <div className="mb-3">
          <label className="form-label">Company Name</label>
          <input
            type="text"
            value={companyName}
            className="form-control bg-light"
            readOnly
          />
        </div>

        {/* Job Title */}
        <div className="mb-3">
          <label className="form-label">Job Title</label>
          <input
            type="text"
            name="job_title"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>

        {/* Salary Range */}
        <div className="mb-3">
          <label className="form-label">Salary Range</label>
          <select
            name="salary"
            className="form-select"
            value={formData.salary}
            onChange={handleChange}
            required
          >
            <option value="">Select Salary Range</option>
            {salaryRanges.map((range, idx) => (
              <option key={idx} value={range.label}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        {/* Experience */}
        <div className="mb-3">
          <label className="form-label">Experience (Years)</label>
          <input
            type="number"
            name="experience"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>

        {/* Deadline */}
        <div className="mb-3">
          <label className="form-label">Deadline</label>
          <input
            type="date"
            name="deadline"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>

        {/* Role Description */}
        <div className="mb-3">
          <label className="form-label">Role Description</label>
          <textarea
            name="role_description"
            className="form-control"
            rows="3"
            onChange={handleChange}
            required
          ></textarea>
        </div>

        {/* Skill Selection */}
        <div className="mb-3">
          <label className="form-label">Select Skills</label>
          <select className="form-select" onChange={handleSkillChange}>
            <option value="">-- Select a Skill --</option>
            {skills.map((skill) => (
              <option key={skill.ss_id} value={skill.ss_id}>
                {skill.ss_name}
              </option>
            ))}
          </select>

          {selectedSkills.length > 0 && (
            <div className="mt-3">
              <label className="form-label fw-bold">Required Skills:</label>
              <div className="d-flex flex-wrap gap-2">
                {selectedSkills.map((id) => {
                  const skill = skills.find((s) => s.ss_id === id);
                  return (
                    <span key={id} className="badge bg-primary p-2">
                      {skill ? skill.ss_name : "Unknown"}{" "}
                      <button
                        type="button"
                        className="btn btn-sm btn-close ms-2"
                        onClick={() => handleRemoveSkill(id)}
                        aria-label="Remove"
                      ></button>
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-success mt-3">
          Post Job
        </button>
      </form>
    </div>
  );
};

export default PostJobForm;
