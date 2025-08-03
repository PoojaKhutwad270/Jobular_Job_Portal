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

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    const newValue = files ? files[0] : value;

    setCompanyForm((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // Optional callback to parent
    if (onChange) {
      onChange({ ...companyForm, [name]: newValue });
    }
  };

  return (
    <div className="mt-4">
      <h5 className="text-primary mb-3">Company Registration</h5>
      <div className="row g-3">

        <div className="col-md-6">
          <label className="form-label">Company Name</label>
          <input
            type="text"
            name="cname"
            className="form-control rounded-3"
            value={companyForm.cname}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Company Address</label>
          <input
            type="text"
            name="caddress"
            className="form-control rounded-3"
            value={companyForm.caddress}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">License Number</label>
          <input
            type="text"
            name="licence"
            className="form-control rounded-3"
            value={companyForm.licence}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">PAN Card</label>
          <input
            type="text"
            name="pancard"
            className="form-control rounded-3"
            value={companyForm.pancard}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Company Phone Number</label>
          <input
            type="text"
            name="company_phoneno"
            className="form-control rounded-3"
            value={companyForm.company_phoneno}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Company Email</label>
          <input
            type="email"
            name="company_email"
            className="form-control rounded-3"
            value={companyForm.company_email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Location</label>
          <input
            type="text"
            name="location"
            className="form-control rounded-3"
            value={companyForm.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Upload Company Documents</label>
          <input
            type="file"
            name="documents"
            className="form-control rounded-3"
            onChange={handleChange}
            required
          />
        </div>

      </div>
    </div>
  );
};

export default RecruiterForm;
