import React, { useState } from "react";

const RecruiterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Simple Form</h2>

      <div style={{ marginBottom: "15px" }}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "8px", borderRadius: "5px" }}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "8px", borderRadius: "5px" }}
        />
      </div>
    </div>
  );
};

export default RecruiterForm;
