import React, { useState } from "react";

const RecruiterForm = ({ onChange }) => {
  const [companyForm, setCompanyForm] = useState({
    cname: "",
    caddress: "",
    licence: "",
    pancard: "",
    documents: null,
    company_phoneno: "",
    company_email: "",
    location: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = files ? files[0] : value;

    setCompanyForm((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    if (onChange) {
      onChange({ ...companyForm, [name]: newValue });
    }
  };

  const getFieldLabel = (name) => {
    switch (name) {
      case "cname":
        return "Company Name";
      case "caddress":
        return "Company Address";
      case "licence":
        return "License Number";
      case "pancard":
        return "PAN Card";
      case "company_phoneno":
        return "Company Phone Number";
      case "company_email":
        return "Company Email";
      case "location":
        return "Location";
      case "documents":
        return "Company Documents";
      default:
        return name;
    }
  };

  // Validate a single field on blur
  const validateField = (name, value) => {
    let error = "";

    if (!value || (typeof value === "string" && !value.trim())) {
      error = `${getFieldLabel(name)} is required`;
    } else {
      if (name === "company_email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) error = "Invalid email address";
      } else if (name === "company_phoneno") {
        if (!/^\d{10}$/.test(value))
          error = "Phone number must be exactly 10 digits";
      } else if (name === "documents") {
        if (!(value instanceof File)) {
          error = "Company Documents are required";
        } else {
          const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
          if (!allowedTypes.includes(value.type)) {
            error = "Only PDF, JPG, or PNG files are allowed";
          }
          const maxSizeMB = 2;
          if (value.size > maxSizeMB * 1024 * 1024) {
            error = `File size should not exceed ${maxSizeMB}MB`;
          }
        }
      }
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return error === "";
  };

  // Validate entire form on submit
  const validate = () => {
   
    let valid = true;

    Object.entries(companyForm).forEach(([key, val]) => {
      const isValid = validateField(key, val);
      if (!isValid) valid = false;
    });

    return valid;
  };

  const handleBlur = (e) => {
    const { name, value, files } = e.target;
    const val = files ? files[0] : value;
    validateField(name, val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Form is valid! You can submit now.");
      // Add submit logic here
    } else {
      alert("Please fix the errors before submitting.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <h5 className="text-primary mb-3">Company Registration</h5>
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Company Name</label>
          <input
            type="text"
            name="cname"
            className={`form-control rounded-3 ${errors.cname ? "is-invalid" : ""}`}
            value={companyForm.cname}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {errors.cname && <div className="invalid-feedback">{errors.cname}</div>}
        </div>

        <div className="col-md-6">
          <label className="form-label">Company Address</label>
          <input
            type="text"
            name="caddress"
            className={`form-control rounded-3 ${errors.caddress ? "is-invalid" : ""}`}
            value={companyForm.caddress}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {errors.caddress && <div className="invalid-feedback">{errors.caddress}</div>}
        </div>

        <div className="col-md-6">
          <label className="form-label">License Number</label>
          <input
            type="text"
            name="licence"
            className={`form-control rounded-3 ${errors.licence ? "is-invalid" : ""}`}
            value={companyForm.licence}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {errors.licence && <div className="invalid-feedback">{errors.licence}</div>}
        </div>

        <div className="col-md-6">
          <label className="form-label">PAN Card</label>
          <input
            type="text"
            name="pancard"
            className={`form-control rounded-3 ${errors.pancard ? "is-invalid" : ""}`}
            value={companyForm.pancard}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {errors.pancard && <div className="invalid-feedback">{errors.pancard}</div>}
        </div>

        <div className="col-md-6">
          <label className="form-label">Company Phone Number</label>
          <input
            type="text"
            name="company_phoneno"
            className={`form-control rounded-3 ${errors.company_phoneno ? "is-invalid" : ""}`}
            value={companyForm.company_phoneno}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {errors.company_phoneno && (
            <div className="invalid-feedback">{errors.company_phoneno}</div>
          )}
        </div>

        <div className="col-md-6">
          <label className="form-label">Company Email</label>
          <input
            type="email"
            name="company_email"
            className={`form-control rounded-3 ${errors.company_email ? "is-invalid" : ""}`}
            value={companyForm.company_email}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {errors.company_email && (
            <div className="invalid-feedback">{errors.company_email}</div>
          )}
        </div>

        <div className="col-md-6">
          <label className="form-label">Location</label>
          <input
            type="text"
            name="location"
            className={`form-control rounded-3 ${errors.location ? "is-invalid" : ""}`}
            value={companyForm.location}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {errors.location && <div className="invalid-feedback">{errors.location}</div>}
        </div>

        <div className="col-md-6">
          <label className="form-label">Upload Company Documents</label>
          <input
            type="file"
            name="documents"
            className={`form-control rounded-3 ${errors.documents ? "is-invalid" : ""}`}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {errors.documents && <div className="invalid-feedback">{errors.documents}</div>}
        </div>
      </div>

      
    </form>
  );
};

export default RecruiterForm;


// // // import React, { useState } from "react";

// // // const RecruiterForm = ({ onChange }) => {
// // //   const [companyForm, setCompanyForm] = useState({
// // //     cname: "",
// // //     caddress: "",
// // //     licence: "",
// // //     pancard: "",
// // //     documents: null,
// // //     company_phoneno: "",
// // //     company_email: "",
// // //     location: "",
// // //   });

// // //   const handleChange = (e) => {
// // //     const { name, value, files } = e.target;

// // //     const newValue = files ? files[0] : value;

// // //     setCompanyForm((prev) => ({
// // //       ...prev,
// // //       [name]: newValue,
// // //     }));

// // //     // Optional callback to parent
// // //     if (onChange) {
// // //       onChange({ ...companyForm, [name]: newValue });
// // //     }
// // //   };

// // //   return (
// // //     <div className="mt-4">
// // //       <h5 className="text-primary mb-3">Company Registration</h5>
// // //       <div className="row g-3">

// // //         <div className="col-md-6">
// // //           <label className="form-label">Company Name</label>
// // //           <input
// // //             type="text"
// // //             name="cname"
// // //             className="form-control rounded-3"
// // //             value={companyForm.cname}
// // //             onChange={handleChange}
// // //             required
// // //           />
// // //         </div>

// // //         <div className="col-md-6">
// // //           <label className="form-label">Company Address</label>
// // //           <input
// // //             type="text"
// // //             name="caddress"
// // //             className="form-control rounded-3"
// // //             value={companyForm.caddress}
// // //             onChange={handleChange}
// // //             required
// // //           />
// // //         </div>

// // //         <div className="col-md-6">
// // //           <label className="form-label">License Number</label>
// // //           <input
// // //             type="text"
// // //             name="licence"
// // //             className="form-control rounded-3"
// // //             value={companyForm.licence}
// // //             onChange={handleChange}
// // //             required
// // //           />
// // //         </div>

// // //         <div className="col-md-6">
// // //           <label className="form-label">PAN Card</label>
// // //           <input
// // //             type="text"
// // //             name="pancard"
// // //             className="form-control rounded-3"
// // //             value={companyForm.pancard}
// // //             onChange={handleChange}
// // //             required
// // //           />
// // //         </div>

// // //         <div className="col-md-6">
// // //           <label className="form-label">Company Phone Number</label>
// // //           <input
// // //             type="text"
// // //             name="company_phoneno"
// // //             className="form-control rounded-3"
// // //             value={companyForm.company_phoneno}
// // //             onChange={handleChange}
// // //             required
// // //           />
// // //         </div>

// // //         <div className="col-md-6">
// // //           <label className="form-label">Company Email</label>
// // //           <input
// // //             type="email"
// // //             name="company_email"
// // //             className="form-control rounded-3"
// // //             value={companyForm.company_email}
// // //             onChange={handleChange}
// // //             required
// // //           />
// // //         </div>

// // //         <div className="col-md-6">
// // //           <label className="form-label">Location</label>
// // //           <input
// // //             type="text"
// // //             name="location"
// // //             className="form-control rounded-3"
// // //             value={companyForm.location}
// // //             onChange={handleChange}
// // //             required
// // //           />
// // //         </div>

// // //         <div className="col-md-6">
// // //           <label className="form-label">Upload Company Documents</label>
// // //           <input
// // //             type="file"
// // //             name="documents"
// // //             className="form-control rounded-3"
// // //             onChange={handleChange}
// // //             required
// // //           />
// // //         </div>

// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default RecruiterForm;
