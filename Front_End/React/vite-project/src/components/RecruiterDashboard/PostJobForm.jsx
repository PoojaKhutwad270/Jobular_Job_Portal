import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const PostJobForm = () => {
  const user = useSelector((state) => state.user);
  const uid = user?.uid; // Safe access to uid

  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [cid, setCid] = useState(""); // to be sent in API

  const [formData, setFormData] = useState({
    job_title: "",
    salary: "",
    experience: "",
    deadline: "",
    role_description: "",
  });

  const salaryRanges = [
    "1-3 LPA", "4-6 LPA", "7-9 LPA", "10-12 LPA", "13-15 LPA", "16-18 LPA", "19-20 LPA",
  ];

  // 🔹 Fetch Skills
  useEffect(() => {
    axios
      .get("https://localhost:7269/api/SkillSet/GetSkillSets")
      .then((res) => setSkills(res.data))
      .catch((err) => console.error("Failed to load skills", err));
  }, []);

  // 🔹 Fetch Company using UID from Redux
  useEffect(() => {
    if (uid) {
      axios
        .get(`https://localhost:7269/api/Company/GetCompanyByRecruiterId/${uid}`)
        .then((res) => {
          setCompanyName(res.data.company_name);
          setCid(res.data.cid); // Store company ID
        })
        .catch((err) => console.error("Failed to fetch company", err));
    }
  }, [uid]);

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

    const jobPayload = {
      ...formData,
      cid: cid,
      experience: parseInt(formData.experience),
      skillIds: selectedSkills,
    };

    try {
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
              <option key={idx} value={range}>
                {range}
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





// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const PostJobForm = ({ rid }) => {
//   const [skills, setSkills] = useState([]);
//   const [selectedSkills, setSelectedSkills] = useState([]);
//   const [companyName, setCompanyName] = useState("");
//   const [cid, setCid] = useState(""); // to be sent in API
//   const [formData, setFormData] = useState({
//     job_title: "",
//     salary: "",
//     experience: "",
//     deadline: "",
//     role_description: "",
//   });

//   const salaryRanges = [
//     "1-3 LPA", "4-6 LPA", "7-9 LPA", "10-12 LPA", "13-15 LPA", "16-18 LPA", "19-20 LPA",
//   ];

//   // Fetch Skills
//   useEffect(() => {
//     axios
//       .get("https://localhost:7269/api/SkillSet/GetSkillSets")
//       .then((res) => {
//         setSkills(res.data);
//       })
//       .catch((err) => console.error("Failed to load skills", err));
//   }, []);

//   // Fetch Company based on recruiter ID
//   useEffect(() => {
//     if (rid) {
//       axios
//         .get(`https://localhost:7269/api/Company/GetCompanyByRecruiterId/${rid}`)
//         .then((res) => {
//           setCompanyName(res.data.company_name);
//           setCid(res.data.cid); // Store company ID for submission
//         })
//         .catch((err) => console.error("Failed to fetch company", err));
//     }
//   }, [rid]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSkillChange = (e) => {
//     const selectedId = Number(e.target.value);
//     if (selectedId && !selectedSkills.includes(selectedId)) {
//       setSelectedSkills((prev) => [...prev, selectedId]);
//     }
//     e.target.value = "";
//   };

//   const handleRemoveSkill = (id) => {
//     setSelectedSkills((prev) => prev.filter((skillId) => skillId !== id));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (selectedSkills.length === 0) {
//       alert("Please select at least one skill.");
//       return;
//     }

//     const jobPayload = {
//       ...formData,
//       cid: cid, // use retrieved company ID
//       experience: parseInt(formData.experience),
//       skillIds: selectedSkills,
//     };

//     try {
//       const response = await axios.post(
//         "https://localhost:7269/api/job_requirement/PostJob",
//         jobPayload
//       );
//       alert("Job posted successfully!");
//       console.log(response.data);
//     } catch (error) {
//       console.error("Error posting job:", error);
//       alert("Failed to post job.");
//     }
//   };

//   return (
//     <div className="container mt-2">
//       <h3 className="mb-4 text-center text-primary-emphasis bg-primary-subtle py-2 rounded shadow-sm">
//         <i className="bi bi-briefcase me-2"></i>
//         <span className="fw-semibold">Post a Job</span>
//       </h3>
//       <form className="p-4 border rounded shadow" onSubmit={handleSubmit}>
//         {/* Company Name (Non-editable) */}
//         <div className="mb-3">
//           <label className="form-label">Company Name</label>
//           <input
//             type="text"
//             value={companyName}
//             className="form-control bg-light"
//             readOnly
//           />
//         </div>

//         {/* Job Title */}
//         <div className="mb-3">
//           <label className="form-label">Job Title</label>
//           <input
//             type="text"
//             name="job_title"
//             className="form-control"
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Salary Range */}
//         <div className="mb-3">
//           <label className="form-label">Salary Range</label>
//           <select
//             name="salary"
//             className="form-select"
//             value={formData.salary}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select Salary Range</option>
//             {salaryRanges.map((range, idx) => (
//               <option key={idx} value={range}>
//                 {range}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Experience */}
//         <div className="mb-3">
//           <label className="form-label">Experience (Years)</label>
//           <input
//             type="number"
//             name="experience"
//             className="form-control"
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Deadline */}
//         <div className="mb-3">
//           <label className="form-label">Deadline</label>
//           <input
//             type="date"
//             name="deadline"
//             className="form-control"
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Role Description */}
//         <div className="mb-3">
//           <label className="form-label">Role Description</label>
//           <textarea
//             name="role_description"
//             className="form-control"
//             rows="3"
//             onChange={handleChange}
//             required
//           ></textarea>
//         </div>

//         {/* Skill Selection */}
//         <div className="mb-3">
//           <label className="form-label">Select Skills</label>
//           <select className="form-select" onChange={handleSkillChange}>
//             <option value="">-- Select a Skill --</option>
//             {skills.map((skill) => (
//               <option key={skill.ss_id} value={skill.ss_id}>
//                 {skill.ss_name}
//               </option>
//             ))}
//           </select>

//           {selectedSkills.length > 0 && (
//             <div className="mt-3">
//               <label className="form-label fw-bold">Required Skills:</label>
//               <div className="d-flex flex-wrap gap-2">
//                 {selectedSkills.map((id) => {
//                   const skill = skills.find((s) => s.ss_id === id);
//                   return (
//                     <span key={id} className="badge bg-primary p-2">
//                       {skill ? skill.ss_name : "Unknown"}{" "}
//                       <button
//                         type="button"
//                         className="btn btn-sm btn-close ms-2"
//                         onClick={() => handleRemoveSkill(id)}
//                         aria-label="Remove"
//                       ></button>
//                     </span>
//                   );
//                 })}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Submit Button */}
//         <button type="submit" className="btn btn-success mt-3">
//           Post Job
//         </button>
//       </form>
//     </div>
//   );
// };

// export default PostJobForm;
